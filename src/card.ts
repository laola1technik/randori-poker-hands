export default class Card {
    private cardsInOrder: string[];

    constructor(private identifier: string) {
        this.cardsInOrder = ["noCard", "noCard",
            "2", "3", "4", "5", "6", "7", "8", "9",
            "T", "J", "Q", "K", "A"];
    }

    get value(): number {
        return this.cardsInOrder.indexOf(this.identifier[0]);
    }
}
