import { expect } from "chai";
import "mocha";
import Card from "./card";
import Hand, { Result } from "./hand";

const flush = new Hand([
    new Card("3d"),
    new Card("4d"),
    new Card("7d"),
    new Card("Td"),
    new Card("Kd"),
]);

const highCard = new Hand([
    new Card("3s"),
    new Card("4s"),
    new Card("7h"),
    new Card("Ts"),
    new Card("Ks"),
]);

describe("Hand", () => {
    it("sort cards on creation", () => {
        const sorted = Hand.createFromCards("3s", "7h", "4s", "Ks", "Ts");
        expect(sorted).to.deep.equal(highCard);
    });
    describe("of Flush", () => {
        it("wins against high card", () => {
            expect(flush.compareTo(highCard)).to.equal(Result.WIN);
        });
    });
    describe("of High Card", () => {
        it("loses against flush", () => {
            expect(highCard.compareTo(flush)).to.equal(Result.LOSE);
        });
    });
    describe("of Straight", () => {
        it("wins against high card", () => {
            // todo createFromCards
            const straight = new Hand([
                new Card("3s"),
                new Card("4s"),
                new Card("5h"),
                new Card("6s"),
                new Card("7s"),
            ]);
            expect(straight.compareTo(highCard)).to.equal(Result.WIN);
        });
    });
    describe("of Straight Flush", () => {
        it("wins against flush", () => {
            // todo createFromCards
            const straightFlush = new Hand([
                new Card("3s"),
                new Card("4s"),
                new Card("5s"),
                new Card("6s"),
                new Card("7s"),
            ]);
            expect(straightFlush.compareTo(flush)).to.equal(Result.WIN);
        });
    });
});
