import { expect } from "chai";
import "mocha";
import Card from "../src/card";

describe("Card", () => {

    describe("has a Value", () => {
        it("is 14 if Ace", () => {
            const card = new Card("Ad");
            expect(card.value).to.equal(14);
        });

        it("is 12 if Queen", () => {
            const card = new Card("Qc");
            expect(card.value).to.equal(12);
        });

        it("is 2 if Two", () => {
            const card = new Card("2h");
            expect(card.value).to.equal(2);
        });
    });

    describe("has a Suit", () => {
        it("knows if it is same", () => {
            const card1 = new Card("Ad");
            const card2 = new Card("9d");
            expect(card1.hasSameSuiteAs(card2)).to.be.true;
        });
        it("knows if it is different", () => {
            const card1 = new Card("Ad");
            const card2 = new Card("9c");
            expect(card1.hasSameSuiteAs(card2)).to.be.false;
        });
    });

});
