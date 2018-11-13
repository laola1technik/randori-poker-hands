import {expect} from "chai";
import "mocha";
import Hand from "./hand";
import Score from "./score";

describe("Rules", () => {
    const testCases: Array<[string, [string, string, string, string, string], Score]> = [
        ["high card", ["3s", "4s", "7h", "Ts", "Ks"], Score.HIGH_CARD],
    ];
    testCases.forEach(([name, cards, score]) => {
        it(`finds score of ${name}`, () => {
            const hand = Hand.createFromCards(...cards);
            expect(hand.score).to.equal(score);
        });
    });
});
