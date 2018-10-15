import {expect} from "chai";
import "mocha";
import Card from "./card";
import Hand, {Result} from "./hand";

describe("Hand", () => {
    describe("compares", () => {
        it("wins against high card (as flush)", () => {
            const flush = new Hand([
                new Card("3d"),
                new Card("4d"),
                new Card("7d"),
                new Card("Td"),
                new Card("Kd"),
            ]);
            const noFlush = new Hand([
                new Card("3s"),
                new Card("4s"),
                new Card("7h"),
                new Card("Ts"),
                new Card("Ks"),
            ]);
            expect(flush.compareTo(noFlush)).to.equal(Result.WIN);
        });
    });
});
