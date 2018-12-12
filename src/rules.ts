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

    function isRoyalFlush(cards: FiveCards): boolean {
        return isStraightFlush(cards) && containsAce(cards);
    }

    function containsAce(cards: FiveCards) {
        return cards.some((card: Card) => card.isAce());
    }

    function isStraightFlush(cards: FiveCards): boolean {
        return isFlush(cards) && isStraight(cards);
    }

    function isFourOfAKind(cards: FiveCards): boolean {
        return Count.hasGroupOfSize(cards, 4, (card) => card.value);
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
        return Count.hasGroupOfSize(cards, 3, (card) => card.value);
    }

    function isTwoPair(cards: FiveCards): boolean {
        const cardOccurrences = Count.groupsOf(cards, (card) => card.value);
        const occurrences = Count.groupsOf(cardOccurrences, (occurrence) => occurrence);
        return occurrences.length > 2 && occurrences[2] === 2;
    }

    function isOnePair(cards: FiveCards): boolean {
        return Count.hasGroupOfSize(cards, 2, (card) => card.value);
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

namespace Count {
    export type Extract<T> = (item: T) => number;

    export function groupsOf<T>(items: T[], extract: Extract<T>): number[] {
        return items.reduce((countByValue: number[], item: T) => {
            countByValue[extract(item)] = countByValue[extract(item)] ? countByValue[extract(item)]! + 1 : 1;
            return countByValue;
        }, []);
    }

    export function hasGroupOfSize<T>(items: T[], size: number, extract: Extract<T>): boolean {
        const countByValue = Count.groupsOf(items, extract);
        return countByValue.some((value: number) => value === size);
    }
}

export default Rules;
