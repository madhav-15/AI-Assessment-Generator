import Anthropic from '@anthropic-ai/sdk';
import { buildPrompt, parseResponse } from './promptBuilder';
import { AssignmentDocument } from '../models/Assignment';
import dotenv from 'dotenv';
dotenv.config();

type LLMProvider = 'auto' | 'anthropic' | 'groq' | 'openai-compatible';

const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim() || '';
const hasAnthropicKey = Boolean(anthropicKey) && !['your_anthropic_key_here', 'dummy_key'].includes(anthropicKey);
const openAICompatibleBaseUrl = process.env.LLM_BASE_URL?.trim() || process.env.OPENAI_BASE_URL?.trim() || '';
const openAICompatibleKey = process.env.LLM_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim() || '';
const groqKey = process.env.GROQ_API_KEY?.trim() || '';
const groqBaseUrl = process.env.GROQ_BASE_URL?.trim() || 'https://api.groq.com/openai/v1';
const groqModel = process.env.GROQ_MODEL?.trim() || 'llama-3.3-70b-versatile';
const selectedProvider = (process.env.AI_PROVIDER?.trim() || 'auto').toLowerCase() as LLMProvider;
const allowMockFallback = ['true', '1', 'yes'].includes((process.env.AI_ALLOW_MOCK || '').toLowerCase());

const anthropic = hasAnthropicKey
  ? new Anthropic({ apiKey: anthropicKey })
  : null;

function createMockQuestionPaper(assignment: AssignmentDocument) {
  if (!allowMockFallback) {
    throw new Error(
      'No LLM provider is configured. Set ANTHROPIC_API_KEY for Claude, GROQ_API_KEY for Groq, or LLM_BASE_URL/LLM_API_KEY/LLM_MODEL for an OpenAI-compatible provider.'
    );
  }

  console.log('Using mock AI generation because AI_ALLOW_MOCK is enabled');

  return {
    metadata: {
      title: assignment.title,
      subject: assignment.subject,
      totalMarks: 100,
      duration: '2 hours',
      gradeLevel: assignment.gradeLevel,
    },
    sections: [
      {
        name: 'Section A',
        instruction: 'Attempt all questions',
        totalMarks: 10,
        questions: [
          {
            questionNumber: 1,
            text: 'This is a mock question?',
            type: 'MCQ',
            difficulty: 'easy',
            marks: 5,
            options: ['A. Yes', 'B. No'],
          },
        ],
      },
    ],
  };
}

function normalizeOpenAICompatibleUrl(baseUrl: string) {
  const trimmed = baseUrl.replace(/\/$/, '');
  return trimmed.endsWith('/v1') ? `${trimmed}/chat/completions` : `${trimmed}/v1/chat/completions`;
}

async function generateWithOpenAICompatibleLLM(prompt: string, baseUrl: string, apiKey: string, model: string, providerName: string) {
  if (!baseUrl) {
    return null;
  }

  const response = await fetch(normalizeOpenAICompatibleUrl(baseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      ...(providerName === 'groq' ? { 'X-Title': 'VedaAI' } : {}),
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 4000,
      messages: [
        {
          role: 'system',
          content: 'You are an AI that strictly outputs valid JSON. Never output markdown outside of the JSON string, and never include explanations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${providerName} request failed: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
  }

  const data: any = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content === 'string' && content.trim()) {
    return parseResponse(content);
  }

  if (Array.isArray(content)) {
    const rawText = content.map((part: any) => part?.text || '').join('').trim();
    if (rawText) {
      return parseResponse(rawText);
    }
  }

  throw new Error(`${providerName} response did not include usable content`);
}

export async function generateQuestionPaperData(assignment: AssignmentDocument) {
  const prompt = buildPrompt(assignment);

  if ((selectedProvider === 'anthropic' || selectedProvider === 'auto') && anthropic) {
    const response = await anthropic.messages.create({
      model: process.env.AI_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.2,
      system: "You are an AI that strictly outputs valid JSON. Never output markdown outside of the JSON string, and never include explanations.",
      messages: [
        {
          role: 'user',
          content: prompt,
        }
      ]
    });

    const rawText = (response.content[0] as any).text;
    return parseResponse(rawText);
  }

  if ((selectedProvider === 'groq' || selectedProvider === 'auto') && groqKey) {
    return generateWithOpenAICompatibleLLM(prompt, groqBaseUrl, groqKey, groqModel, 'groq');
  }

  if ((selectedProvider === 'openai-compatible' || selectedProvider === 'auto') && openAICompatibleBaseUrl) {
    const openAICompatibleResponse = await generateWithOpenAICompatibleLLM(
      prompt,
      openAICompatibleBaseUrl,
      openAICompatibleKey,
      process.env.LLM_MODEL || process.env.AI_MODEL || 'gpt-4o-mini',
      'openai-compatible'
    );
    if (openAICompatibleResponse) {
      return openAICompatibleResponse;
    }
  }

  if ((selectedProvider === 'anthropic' || selectedProvider === 'groq' || selectedProvider === 'openai-compatible') && !allowMockFallback) {
    throw new Error(
      'Requested LLM provider is not configured. Check AI_PROVIDER, ANTHROPIC_API_KEY, GROQ_API_KEY, or LLM_BASE_URL/LLM_API_KEY.'
    );
  }

  if (allowMockFallback) {
    return createMockQuestionPaper(assignment);
  }

  const configuredProviderMessage = selectedProvider === 'anthropic'
    ? 'Anthropic'
    : selectedProvider === 'groq'
      ? 'Groq'
    : selectedProvider === 'openai-compatible'
      ? 'OpenAI-compatible'
      : 'Anthropic, Groq, or OpenAI-compatible';

  throw new Error(
    `No real LLM provider is configured. Set ${configuredProviderMessage} credentials or enable AI_ALLOW_MOCK for development.`
  );
}
