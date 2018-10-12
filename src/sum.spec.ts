import { expect } from "chai";
import "mocha";
import { sum } from "./sum";

describe("sum", () => {
  it("sums two numbers", () => {
    expect(sum(1, 2)).to.equal(3);
  });
});
