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

    condition(cards: FiveCards): boolean;
}

namespace Rules {
    export const rules: IRule[] = [
        {
            condition: (cards) => {
                return sameSuits(cards) && isStraight(cards);
            },
            score: Score.STRAIGHT_FLUSH,
        },
        {
            condition: (cards) => {
                return isStraight(cards);
            },
            score: Score.STRAIGHT,
        },
        {
            condition: (cards) => {
                return sameSuits(cards);
            },
            score: Score.FLUSH,
        },
    ];

    function isStraight(cards: FiveCards): boolean {
        let current = cards[0].value;
        for (const card of cards.slice(1)) {
            if (card.value !== current + 1) {
                return false;
            }
            current = card.value;
        }
        return true;
    }

    function sameSuits(cards: FiveCards): boolean {
        return cards.filter((card: Card) => card.suits(cards[0])).length === 5;
    }
}

export default class Hand {
    private readonly cards: FiveCards;
    private readonly type: Score;

    constructor(cards: FiveCards) {
        this.cards = cards;
        this.type = Score.HIGH_CARD;
        this.sortCardsByValue();

        for (const rule of Rules.rules) {
            if (rule.condition(this.cards)) {
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

    private sortCardsByValue() {
        this.cards.sort((cardA: Card, cardB: Card) => {
            return cardA.value - cardB.value;
        });
    }
}

export enum Result {
    LOSE = -1,
    SPLIT,
    WIN,
}
