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
        return Count.of(cards).groupedBy(cardValue).is(3);
    }

    function isTwoPair(cards: FiveCards): boolean {
        const occurrencesByValue = Count.of(cards).groupedBy(cardValue);
        return occurrencesByValue.groupBy().foo(2, 2);
        // return occurrencesGroupBySize.length > 2 && occurrencesGroupBySize[2] === 2;
        // TODO implement foo with content of comment
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
    export type Extract<T> = (item: T) => number;

    export function groupsOf<T>(items: T[], extract: Extract<T>): number[] {
        return items.reduce((countByValue: number[], item: T) => {
            countByValue[extract(item)] = countByValue[extract(item)] ? countByValue[extract(item)]! + 1 : 1;
            return countByValue;
        }, []);
    }

    interface IGrouped {
        is(size: number): boolean;
        groupBy(): IGrouped;

        foo(a: number, b: number): boolean;
    }

    export function groupsOf_<T>(items: T[], extract: Extract<T>): IGrouped {
        const x = items.reduce((countByValue: number[], item: T) => {
            countByValue[extract(item)] = countByValue[extract(item)] ? countByValue[extract(item)]! + 1 : 1;
            return countByValue;
        }, []);
        return {
            foo: (a: number, b: number) => {
                return x.length > a && x[a] === b;
            },
            groupBy: () => {
                return groupsOf_(x, (occurrence) => occurrence);
            },
            is: (size: number) => {
                return x.some((value: number) => value === size);
            },
        };
    }

    interface ICount<T> {
        groupedBy(extract: Count.Extract<T>): IGrouped;
    }

    export function of<T>(items: T[]): ICount<T> {
        return {
            groupedBy: (extract: Count.Extract<T>) => {
                return Count.groupsOf_(items, extract);
            },
        };
    }
}

export default Rules;
