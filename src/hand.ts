import Card from "./card";
import FiveCards from "./fiveCards";
import Rules from "./rules";
import Score from "./score";

export default class Hand {
    public static createFromCards(card1: string, card2: string, card3: string, card4: string, card5: string) {
        return new Hand([new Card(card1), new Card(card2), new Card(card3), new Card(card4), new Card(card5)]);
    }

    public readonly score: Score;
    private readonly cards: FiveCards;

    constructor(cards: FiveCards) {
        this.cards = cards;
        this.sortCardsByValue();
        this.score = Rules.findScore(this.cards);
    }

    public compareTo(other: Hand): Result {
        if (this.score > other.score) {
            return Result.WIN;
        }
        // TODO SPLIT
        // TODO cases of same hand with higher straight
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
