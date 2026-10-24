/**
 * @Cache – method decorator for synchronous per-instance caching.
 *
 * Pattern: Decorator + Flyweight (caching)
 * WHY: Avoids recomputing expensive pure functions; cross-cutting concern.
 * HOW: Uses a WeakMap<object, Map<string, unknown>> so each instance has
 *      its own cache that is garbage-collected when the instance is GC'd.
 *      Key = bigint-safe JSON.stringify of arguments.
 *
 * BIGINT SAFETY: JSON.stringify throws on bigint. We use a custom replacer
 * that converts bigint to a tagged string "$$bigint:123n". This means
 * @Cache can safely be applied to methods receiving bigint arguments.
 */

const instanceCaches = new WeakMap<object, Map<string, unknown>>();

function bigintSafeStringify(args: unknown[]): string {
  return JSON.stringify(args, (_key, value) =>
    typeof value === "bigint" ? `$$bigint:${value.toString()}n` : value
  );
}

export function Cache(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as Function;

  descriptor.value = function (...args: unknown[]) {
    if (!instanceCaches.has(this)) {
      instanceCaches.set(this, new Map());
    }
    const cache = instanceCaches.get(this)!;
    const key = bigintSafeStringify(args);

    if (cache.has(key)) {
      console.log(`[CACHE HIT] ${String(propertyKey)}(${key})`);
      return cache.get(key);
    }

    console.log(`[CACHE MISS] ${String(propertyKey)}(${key})`);
    const result: unknown = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
