"use client";

import { ArrowRight, BarChart3, BrainCircuit, FileQuestion } from "lucide-react";
import { SectionPage } from "@/components/layout/SectionPage";

const tools = [
  { title: "Question generator", description: "Draft MCQs, short answer, and long-form prompts from source material.", icon: FileQuestion },
  { title: "Rubric builder", description: "Create marking criteria with weighting and performance bands.", icon: BrainCircuit },
  { title: "Difficulty analyzer", description: "Estimate distribution across easy, medium, and hard items.", icon: BarChart3 },
];

export default function ToolkitPage() {
  return (
    <SectionPage
      eyebrow="AI tools"
      title="AI Teacher's Toolkit"
      description="Quick-access helpers for building assessments and checking quality before you generate."
      action={{ href: "/create", label: "Open generator" }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <article key={tool.title} className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white">
                <Icon className="h-5 w-5 text-[#1E1E1E]" />
              </div>
              <h2 className="mt-4 text-[20px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>{tool.title}</h2>
              <p className="mt-2 text-[14px] leading-[1.4] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>{tool.description}</p>
              <button className="mt-5 flex items-center gap-2 text-[14px] font-medium text-[#E56820]" style={{ fontFamily: 'var(--font-bricolage)' }}>
                Launch <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          );
        })}
      </div>
    </SectionPage>
  );
}