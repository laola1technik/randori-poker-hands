const cardsInOrder = ["noCard", "noCard",
    "2", "3", "4", "5", "6", "7", "8", "9",
    "T", "J", "Q", "K", "A"];

export default class Card {

    constructor(private identifier: string) {
    }

    get value(): number {
        return cardsInOrder.indexOf(this.identifier[0]);
    }

    public isAce(): boolean {
        return this.identifier[0] === "A";
    }

    private get suit(): string {
        return this.identifier[1];
    }

    public suits(other: Card): boolean {
        return other.suit === this.suit;
    }

}
