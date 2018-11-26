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
            condition: isFourOfAKind,
            score: Score.FOUR_OF_A_KIND,
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
            condition: isTwoPair,
            score: Score.TWO_PAIR,
        },
        {
            condition: isOnePair,
            score: Score.ONE_PAIR,
        },
        // TODO add other hands
        {
            condition: () => true,
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

    function isRoyalFlush(cards: FiveCards): boolean {
        return isStraightFlush(cards) &&
            cards.find((card: Card) => card.isAce()) !== undefined;
    }

    function isStraightFlush(cards: FiveCards): boolean {
        return isFlush(cards) && isStraight(cards);
    }

    function countOccurrencesByValue(cards: FiveCards) {
        return cards.reduce((countByValue: number[], card: Card) => {
            countByValue[card.value] = countByValue[card.value] ? countByValue[card.value]! + 1 : 1;
            return countByValue;
        }, []);
    }

    function hasOccurrenceCount(cards: FiveCards, count: number): boolean {
        const countByValue = countOccurrencesByValue(cards);
        return countByValue.find((value: number) => value === count) !== undefined;
    }

    function isFourOfAKind(cards: FiveCards): boolean {
        return hasOccurrenceCount(cards, 4);
    }

    function isOnePair(cards: FiveCards): boolean {
        return hasOccurrenceCount(cards, 2);
    }

    function isTwoPair(cards: FiveCards): boolean {
        const cardOccurrences = countOccurrencesByValue(cards);
        const occurrences = cardOccurrences.reduce((countByValue: number[], cardOccurrence: number) => {
            countByValue[cardOccurrence] = countByValue[cardOccurrence] ? countByValue[cardOccurrence]! + 1 : 1;
            return countByValue;
        }, []);
        return occurrences.length > 2 && occurrences[2] === 2;
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
