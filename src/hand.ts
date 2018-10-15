import Card from "./card";

export default class Hand {
    private type: Score;

    constructor(private cards: [Card, Card, Card, Card, Card]) {
        this.type = Score.HIGH_CARD;
        if (this.sameSuits(cards)) {
            this.type = Score.FLUSH;
        }
    }

    public compareTo(other: Hand): Result {
        if (this.type > other.type) {
            return Result.WIN;
        }

        return Result.LOSE;
    }

    private sameSuits(cards: [Card, Card, Card, Card, Card]): boolean {
        return cards.filter((card: Card) => card.suits(cards[0])).length === 5;
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
