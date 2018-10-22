import Card from "./card";

type FiveCards = [Card, Card, Card, Card, Card];

export default class Hand {
    private readonly type: Score;
    private readonly cards: FiveCards;

    constructor(cards: FiveCards) {
        this.cards = cards;
        this.sortCardsByValue();
        this.type = Score.HIGH_CARD;
        if (this.sameSuits()) {
            this.type = Score.FLUSH;
        }
    }

    public compareTo(other: Hand): Result {
        if (this.type > other.type) {
            return Result.WIN;
        }

        return Result.LOSE;
    }

    private sameSuits(): boolean {
        return this.cards.filter((card: Card) => card.suits(this.cards[0])).length === 5;
    }

    private sortCardsByValue() {
        this.cards.sort((cardA: Card, cardB: Card) => {
            return cardA.value - cardB.value;
        });
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
