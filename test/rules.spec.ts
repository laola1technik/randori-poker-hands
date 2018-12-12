import { expect } from "chai";
import "mocha";
import Hand from "../src/hand";
import Score from "../src/score";

describe("Rules", () => {

    const testCases: Array<[string, [string, string, string, string, string], Score]> = [
        ["high card", ["3s", "4s", "7h", "Ts", "Ks"], Score.HIGH_CARD],
        ["one pair", ["3s", "3d", "7h", "Ts", "Ks"], Score.ONE_PAIR],
        ["two pair", ["3s", "3d", "7h", "7s", "Ks"], Score.TWO_PAIR],
        // Todo: ["three of a kind", ["3s", "3d", "3h", "7s", "Ks"], Score.THREE_OF_A_KIND],
        ["straight", ["3s", "4d", "5h", "6s", "7s"], Score.STRAIGHT],
        ["flush", ["3d", "4d", "5d", "6d", "8d"], Score.FLUSH],
        // Todo: ["full house", ["5h", "5s", "5d", "8d", "8s"], Score.FULL_HOUSE],
        ["four of a kind", ["5h", "5s", "5d", "5c", "8s"], Score.FOUR_OF_A_KIND],
        ["straight flush", ["3d", "4d", "5d", "6d", "7d"], Score.STRAIGHT_FLUSH],
        ["royal flush", ["Ad", "Kd", "Qd", "Jd", "Td"], Score.ROYAL_FLUSH],
    ];
    testCases.forEach(([name, cards, score]) => {
        it(`find score of ${name}`, () => {
            const hand = Hand.createFromCards(...cards);
            expect(hand.score).to.equal(score);
        });
    });

});
