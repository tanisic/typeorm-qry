import { expect, test, describe } from "vitest";
import { deepMerge, isInteger, isObject } from "./utils";

describe("utils/isObject", () => {
  test("check if {} is object", () => {
    expect(isObject({})).toBe(true);
  });
  test("check if function is not object", () => {
    expect(isObject(function abc() {})).toBeFalsy();
  });
  test("check if string is not object", () => {
    expect(isObject("test string")).toBeFalsy();
  });
});

describe("utils/deepMerge", () => {
  test("simple check ", () => {
    const start = {
      a: 1,
      c: 4,
    };

    const from = {
      a: 2,
      b: 3,
    };

    expect(deepMerge(start, from)).toStrictEqual({ a: 2, b: 3, c: 4 });
  });
  test("2 level nested merge", () => {
    const start = {
      a: 1,
      c: 4,
      d: {
        a: 1,
      },
    };

    const from = {
      a: 2,
      b: 3,
      d: {
        a: 3,
        b: 2,
      },
    };

    expect(deepMerge(start, from)).toStrictEqual({
      a: 2,
      b: 3,
      c: 4,
      d: { a: 3, b: 2 },
    });
  });
  test("3 level nested merge", () => {
    const start = {
      a: 1,
      c: 4,
      d: {
        a: 1,
        b: {
          a: 3,
        },
      },
    };

    const from = {
      a: 2,
      b: 3,
      d: {
        a: 3,
        b: 2,
      },
    };

    expect(deepMerge(start, from)).toStrictEqual({
      a: 2,
      b: 3,
      c: 4,
      d: { a: 3, b: 2 },
    });
  });
});

describe("utils/isInteger", () => {
  test("check if number is integer", () => {
    expect(isInteger(2.12)).toBe(false);
    expect(isInteger(2)).toBe(true);
  });
  test("check if numeric string is integer", () => {
    expect(isInteger("")).toBeFalsy();
    expect(isInteger("2")).toBeTruthy();
    expect(isInteger("2.12")).toBeFalsy();
  });
  test("check if string is not object", () => {
    expect(isObject("test string")).toBeFalsy();
  });
});
