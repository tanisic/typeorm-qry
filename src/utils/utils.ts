export const rand = () => {
  return Math.random().toString(36).substring(2);
};
/**
 * Used to generate random alias for filter
 */
export const token = () => {
  return rand() + rand();
};

export function isObject(item: any): item is Record<string, unknown> {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge(target: unknown, ...sources: unknown[]): unknown {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return deepMerge(target, ...sources);
}

export function isInteger(value: number | string): boolean {
  if (typeof value === "string") {
    return /^\d+$/.test(value.trim());
  }

  if (typeof value === "number") {
    return Number.isInteger(value);
  }

  return false;
}
