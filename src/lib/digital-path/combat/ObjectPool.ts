/**
 * ObjectPool — BLOCK 12
 *
 * Generic high-performance object pool.
 * Prevents GC spikes during intense projectile and damage number activity.
 */

export class ObjectPool<T> {
  private available: T[] = [];
  private factory: () => T;
  private resetFn?: (item: T) => void;

  constructor(factory: () => T, initialSize = 30, resetFn?: (item: T) => void) {
    this.factory = factory;
    this.resetFn = resetFn;

    for (let i = 0; i < initialSize; i++) {
      this.available.push(this.factory());
    }
  }

  acquire(): T {
    if (this.available.length > 0) {
      const item = this.available.pop()!;
      this.resetFn?.(item);
      return item;
    }
    return this.factory();
  }

  release(item: T): void {
    this.resetFn?.(item);
    this.available.push(item);
  }

  get availableCount(): number {
    return this.available.length;
  }
}
