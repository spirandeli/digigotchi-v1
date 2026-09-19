import test from "node:test";
import assert from "node:assert/strict";
import { RunRNG } from "./rng";

test("RunRNG produces identical sequence for identical seeds", () => {
  const rng1 = new RunRNG(123456);
  const rng2 = new RunRNG(123456);

  const seq1 = Array.from({ length: 10 }, () => rng1.next());
  const seq2 = Array.from({ length: 10 }, () => rng2.next());

  assert.deepEqual(seq1, seq2);
});

test("RunRNG produces different sequences for different seeds", () => {
  const rng1 = new RunRNG(123456);
  const rng2 = new RunRNG(654321);

  assert.notEqual(rng1.next(), rng2.next());
});

test("RunRNG integer generates values within inclusive bounds", () => {
  const rng = new RunRNG(9999);
  for (let i = 0; i < 50; i++) {
    const val = rng.int(5, 12);
    assert.ok(val >= 5 && val <= 12, `Value ${val} out of bounds`);
  }
});
