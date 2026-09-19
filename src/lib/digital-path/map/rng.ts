/**
 * Centralized deterministic Pseudo-Random Number Generator (PRNG) for runs.
 * Uses Mulberry32 algorithm for fast, high-quality 32-bit PRNG with seed reproducibility.
 */
export class RunRNG {
  private state: number;
  readonly seed: number;

  constructor(seed?: number) {
    this.seed = typeof seed === "number" && !Number.isNaN(seed)
      ? seed >>> 0
      : (Math.random() * 0xffffffff) >>> 0;
    this.state = this.seed;
  }

  /**
   * Returns a pseudo-random float in range [0, 1).
   */
  next(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Returns a random integer between min and max (inclusive).
   */
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Returns true with given probability [0, 1].
   */
  chance(probability: number): boolean {
    return this.next() < probability;
  }

  /**
   * Picks a random element from an array.
   */
  pick<T>(items: readonly T[]): T {
    if (items.length === 0) throw new Error("Cannot pick from empty array");
    return items[Math.floor(this.next() * items.length)];
  }

  /**
   * Shuffles an array in place or returns a shuffled copy.
   */
  shuffle<T>(array: readonly T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
