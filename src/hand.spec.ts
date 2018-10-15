import {expect} from "chai";
import "mocha";
import Card from "./card";
import Hand, {Result} from "./hand";

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
    describe("compares", () => {
        it("wins against high card (as flush)", () => {
            expect(flush.compareTo(highCard)).to.equal(Result.WIN);
        });
        it("loses against flush (as high card)", () => {
            expect(highCard.compareTo(flush)).to.equal(Result.LOSE);
        });
    });
});
