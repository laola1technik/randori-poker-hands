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
            condition: isFullHouse,
            score: Score.FULL_HOUSE,
        },
        {
            condition: isFlush,
            score: Score.FLUSH,
        },
        {
            condition: isStraight,
            score: Score.STRAIGHT,
        },
        {
            condition: isThreeOfAKind,
            score: Score.THREE_OF_A_KIND,
        },
        {
            condition: isTwoPair,
            score: Score.TWO_PAIR,
        },
        {
            condition: isOnePair,
            score: Score.ONE_PAIR,
        },
        {
            condition: () => true,
            score: Score.HIGH_CARD,
        },
    ];

    // TODO sort methods similar to list above, separate second level methods out of this
    // maybe separate objects/instances for complex checks?

    function isRoyalFlush(cards: FiveCards): boolean {
        return isStraightFlush(cards) && containsAce(cards);
    }

    function isStraightFlush(cards: FiveCards): boolean {
        return isFlush(cards) && isStraight(cards);
    }

    function isFourOfAKind(cards: FiveCards): boolean {
        return hasCardOccurrencesOf(cards, 4);
    }

    function isFullHouse(cards: FiveCards): boolean {
        return isOnePair(cards) && isThreeOfAKind(cards);
    }

    function isFlush(cards: FiveCards): boolean {
        return allSuitsMatch(cards);
    }

    function allSuitsMatch(cards: FiveCards) {
        return cards.every((card: Card) => card.suits(cards[0]));
    }

    function isStraight(cards: FiveCards): boolean {
        return isSequential(cards, 1);
    }

    function isSequential(cards: FiveCards, delta: number): boolean {
        let current = cards[0].value;
        for (const card of cards.slice(1)) {
            if (card.value !== current + delta) {
                return false;
            }
            current = card.value;
        }
        return true;
    }

    function isThreeOfAKind(cards: FiveCards): boolean {
        return hasCardOccurrencesOf(cards, 3);
    }

    function isTwoPair(cards: FiveCards): boolean {
        const cardOccurrences = countOccurrencesByCardValue(cards);
        const occurrences = countOccurrencesBy(cardOccurrences, (occurrence) => occurrence);
        return occurrences.length > 2 && occurrences[2] === 2;
    }

    function isOnePair(cards: FiveCards): boolean {
        return hasCardOccurrencesOf(cards, 2);
    }

    function containsAce(cards: FiveCards) {
        return cards.some((card: Card) => card.isAce());
    }

    // TODO move
    function countOccurrencesByCardValue(cards: FiveCards) {
        return countOccurrencesBy(cards, (card) => card.value);
    }

    function countOccurrencesBy<T>(items: T[], extract: (item: T) => number): number[] {
        return items.reduce((countByValue: number[], item: T) => {
            countByValue[extract(item)] = countByValue[extract(item)] ? countByValue[extract(item)]! + 1 : 1;
            return countByValue;
        }, []);
    }

    // TODO move
    function hasCardOccurrencesOf(cards: FiveCards, count: number): boolean {
        const countByValue = countOccurrencesByCardValue(cards);
        return countByValue.find((value: number) => value === count) !== undefined;
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
