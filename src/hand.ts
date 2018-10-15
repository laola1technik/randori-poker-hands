import Card from "./card";

export default class Hand {
    constructor(private cards: [Card, Card, Card, Card, Card]) {

    }

    public compareTo() {
        return Result.WIN;
    }
}

enum Score {
    HIGH_CARD = 1,
    ONE_PAIR,
    TWO_PAIR,
    THREE_OF_A_KIND,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR_OF_A_KIND,
    STRAIGHT_FLUSH,
    ROYAL_FLUSH,
}

export enum Result {
    LOSE = -1,
    SPLIT,
    WIN,
}
