import Card from "./card";
import FiveCards from "./fiveCards";
import Score from "./score";

interface IRule {
    score: Score;

    condition(cards: FiveCards): boolean;
}

namespace Rules {
    const rules: IRule[] = [
        {
            condition: isRoyalFlush,
            score: Score.ROYAL_FLUSH,
        },
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
        {
            condition: (_) => true,
            score: Score.HIGH_CARD,
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

    function isRoyalFlush(cards: FiveCards): boolean {
        return isStraightFlush(cards) &&
            cards.find((card: Card) => card.isAce()) !== undefined;
    }

    export function findScore(cards: FiveCards) {
        for (const rule of rules) {
            if (rule.condition(cards)) {
                return rule.score;
            }
        }
        throw new Error(`No score found for cards ${JSON.stringify(cards)}`);
    }
}

export default Rules;
