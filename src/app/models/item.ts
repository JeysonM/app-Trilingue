export class Item {
    $key:string;
    spanish_word:string;
    english_word:string;
    quechua_word:string;
    imagePath:string;
    kind: string;

    constructor(){
        this.spanish_word = "";
        this.english_word = "";
        this.quechua_word = "";
        this.imagePath = "";
        this.kind = "";
    }
}
