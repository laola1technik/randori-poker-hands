import {expect} from "chai";
import "mocha";
import Hand, {Result} from "./hand";

const flush = Hand.createFromCards("3d", "4d", "7d", "Td", "Kd");

const highCard = Hand.createFromCards("3s", "4s", "7h", "Ts", "Ks");

describe("Hand", () => {

    it("sorts cards on creation", () => {
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
            const straight = Hand.createFromCards("3s", "4s", "5h", "6s", "7s");
            expect(straight.compareTo(highCard)).to.equal(Result.WIN);
        });
    });
    describe("of Straight Flush", () => {
        it("wins against flush", () => {
            const straightFlush = Hand.createFromCards("3s", "4s", "5s", "6s", "7s");
            expect(straightFlush.compareTo(flush)).to.equal(Result.WIN);
        });
    });

});
