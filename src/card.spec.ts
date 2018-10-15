import {expect} from "chai";
import "mocha";
import Card from "./card";

describe("Card", () => {
    it("has value 14 if Ace", () => {
        const card = new Card("Ad");
        expect(card.value).to.equal(14);
    });

    it("has value 12 if Queen", () => {
        const card = new Card("Qc");
        expect(card.value).to.equal(12);
    });

    it("has value 2 if Two", () => {
        const card = new Card("2h");
        expect(card.value).to.equal(2);
    });
});
