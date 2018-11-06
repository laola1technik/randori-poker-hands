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

// TODO: make module
namespace Rules {
    export const rules: IRule[] = [
        {
            condition: isStraightFlush,
            score: Score.STRAIGHT_FLUSH,
        },
        {
            condition: isStraight,
            score: Score.STRAIGHT,
        },
        {
            condition: isFlush,
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

    function isFlush(cards: FiveCards): boolean {
        return cards.filter((card: Card) => card.suits(cards[0])).length === 5;
    }

    function isStraightFlush(cards: FiveCards): boolean {
        return isFlush(cards) && isStraight(cards);
    }
}

export default class Hand {
    public static createFromCards(card1: string, card2: string, card3: string, card4: string, card5: string) {
        return new Hand([new Card(card1), new Card(card2), new Card(card3), new Card(card4), new Card(card5)]);
    }

    private readonly cards: FiveCards;
    private readonly score: Score;

    constructor(cards: FiveCards) {
        this.cards = cards;
        this.sortCardsByValue();
        this.score = this.findScore();
    }

    public compareTo(other: Hand): Result {
        if (this.score > other.score) {
            return Result.WIN;
        }

        return Result.LOSE;
    }

    private sortCardsByValue() {
        this.cards.sort((cardA: Card, cardB: Card) => {
            return cardA.value - cardB.value;
        });
    }

    private findScore() {
        for (const rule of Rules.rules) {
            if (rule.condition(this.cards)) {
                return rule.score;
            }
        }
        return Score.HIGH_CARD;
    }
}

export enum Result {
    LOSE = -1,
    SPLIT,
    WIN,
}
