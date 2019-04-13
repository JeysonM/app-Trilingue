import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database'
import { TripleWord } from '../models/triple-word';

@Injectable({
  providedIn: 'root'
})
export class TripleWordService {
  public tripleWordList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {}

  getTriWords(){
    return this.tripleWordList = this.firebase.list('triwords');
  }

  getTriWord(key: string){
    return this.firebase.object(`triwords/${key}`).valueChanges();
  }


  insertTriWord(tripleWord: TripleWord){
    this.tripleWordList.push({
      spanish_word: tripleWord.spanish_word,
      english_word: tripleWord.english_word,
      quechua_word: tripleWord.quechua_word,
      spanish_example: tripleWord.spanish_example,
      english_example: tripleWord.english_example,
      quechua_example: tripleWord.quechua_example,
      spanish_phonetics: tripleWord.spanish_phonetics,
      english_phonetics: tripleWord.english_phonetics,
      quechua_phonetics: tripleWord.quechua_phonetics,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString()
    });
  }

  updateTriWord(tripleWord: TripleWord){
    this.tripleWordList.update(tripleWord.$key, {
      spanish_word: tripleWord.spanish_word,
      english_word: tripleWord.english_word,
      quechua_word: tripleWord.quechua_word,
      spanish_example: tripleWord.spanish_example,
      english_example: tripleWord.english_example,
      quechua_example: tripleWord.quechua_example,
      spanish_phonetics: tripleWord.spanish_phonetics,
      english_phonetics: tripleWord.english_phonetics,
      quechua_phonetics: tripleWord.quechua_phonetics,
      updated_at: Date.now().toString()
    });
  }

  deleteTriWord($key: string) {
    this.tripleWordList.remove($key);
  }

}
