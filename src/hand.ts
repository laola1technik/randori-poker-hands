import Card from "./card";

type FiveCards = [Card, Card, Card, Card, Card];

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

interface IRule {
    score: Score;

    condition(): boolean;
}

export default class Hand {
    private readonly cards: FiveCards;
    private readonly type: Score;

    constructor(cards: FiveCards) {
        this.cards = cards;
        this.type = Score.HIGH_CARD;
        this.sortCardsByValue();
        const rules: IRule[] = [
            {
                condition: () => {
                    return this.sameSuits() && this.isStraight();
                },
                score: Score.STRAIGHT_FLUSH,
            },
            {
                condition: () => {
                    return this.isStraight();
                },
                score: Score.STRAIGHT,
            },
            {
                condition: () => {
                    return this.sameSuits();
                },
                score: Score.FLUSH,
            },
        ];
        for (const rule of rules) {
            if (rule.condition()) {
                this.type = rule.score;
                break;
            }
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

    private isStraight(): boolean {
        let current = this.cards[0].value;
        for (const card of this.cards.slice(1)) {
            if (card.value !== current + 1) {
                return false;
            }
            current = card.value;
        }
        return true;
    }
}

export enum Result {
    LOSE = -1,
    SPLIT,
    WIN,
}
