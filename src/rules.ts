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
        return Count.of(cards).groupedBy(cardValue).is(4);
    }

    function cardValue(card: Card): number {
        return card.value;
    }

    function isFullHouse(cards: FiveCards): boolean {
        return isOnePair(cards) && isThreeOfAKind(cards);
    }

    function isFlush(cards: FiveCards): boolean {
        return allSuitsMatch(cards);
    }

    function allSuitsMatch(cards: FiveCards) {
        const firstCard = cards[0];
        return cards.every((card: Card) => card.hasSameSuiteAs(firstCard));
    }

    function isStraight(cards: FiveCards): boolean {
        return isSequential(cards);
    }

    function isSequential(cards: FiveCards): boolean {
        const firstCard = cards[0];
        const remainingCards = cards.slice(1);

        let previousCardValue = firstCard.value;
        for (const card of remainingCards) {
            if (card.value !== previousCardValue + 1) {
                return false;
            }
            previousCardValue = card.value;
        }
        return true;
    }

    function isThreeOfAKind(cards: FiveCards): boolean {
        return Count.of(cards).groupedBy(cardValue).is(3);
    }

    function isTwoPair(cards: FiveCards): boolean {
        const occurrencesByValue = Count.of(cards).groupedBy(cardValue);
        return occurrencesByValue.groupByOccurrences().hasPairs(2);
    }

    function isOnePair(cards: FiveCards): boolean {
        return Count.of(cards).groupedBy(cardValue).is(2);
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
    export function of<T>(items: T[]): ICount<T> {
        return {
            groupedBy: (extract: Count.Extract<T>) => {
                return groupsOf(items, extract);
            },
        };
    }

    interface ICount<T> {
        groupedBy(extract: Count.Extract<T>): IGrouped;
    }

    export type Extract<T> = (item: T) => number;

    interface IGrouped {
        groupByOccurrences(): IGrouped;

        hasPairs(count: number): boolean;

        is(size: number): boolean;
    }

    function groupsOf<T>(items: T[], extract: Extract<T>): IGrouped {
        const occurrencesByValue = items.reduce((countByGroup: number[], item: T) => {
            const group = extract(item);
            countByGroup[group] = countByGroup[group] ? countByGroup[group]! + 1 : 1;
            return countByGroup;
        }, []);
        return {
            groupByOccurrences: () => {
                return groupsOf(occurrencesByValue, (occurrence) => occurrence);
            },
            hasPairs: (count: number) => {
                return occurrencesByValue.length > 2 && occurrencesByValue[2] === count;
            },
            is: (size: number) => {
                return occurrencesByValue.some((value: number) => value === size);
            },
        };
    }
}

export default Rules;
