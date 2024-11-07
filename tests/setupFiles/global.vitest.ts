import { afterAll, beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  // @ts-expect-error type
  global.it = it;
  // @ts-expect-error type
  global.expect = expect;
  // @ts-expect-error type
  global.describe = describe;
});

afterAll(() => {
  // @ts-expect-error type
  delete global.it;
  // @ts-expect-error type
  delete global.expect;
  // @ts-expect-error type
  delete global.describe;
});
