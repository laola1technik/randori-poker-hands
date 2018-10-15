import { expect } from "chai";
import "mocha";
import Card from "./card";

describe("Card", () => {
  it("has value 14 if Ace", () => {
    const card = new Card("Ad");
    expect(card.value).to.equal(14);
  });
});
