import { format, isValid, parse, parseISO } from "date-fns";

const DISPLAY_FORMAT = "dd-MM-yyyy";

function toValidDate(value: string | Date): Date | null {
  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const candidates = [
    parseISO(trimmed),
    parse(trimmed, DISPLAY_FORMAT, new Date()),
    parse(trimmed, "yyyy-MM-dd", new Date()),
  ];

  for (const candidate of candidates) {
    if (isValid(candidate)) {
      return candidate;
    }
  }

  const nativeDate = new Date(trimmed);
  return isValid(nativeDate) ? nativeDate : null;
}

export function formatDisplayDate(value: string | Date | undefined, fallback = "-") {
  if (!value) {
    return fallback;
  }

  const parsed = toValidDate(value);
  return parsed ? format(parsed, DISPLAY_FORMAT) : fallback;
}