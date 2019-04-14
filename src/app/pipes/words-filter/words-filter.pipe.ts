import { Pipe, PipeTransform } from '@angular/core';
import { TripleWord } from 'src/app/models/triple-word';

@Pipe({
  name: 'wordsFilter'
})
export class WordsFilterPipe implements PipeTransform {

  transform(triWords: TripleWord[], searchQuery: string): TripleWord[] {
    console.log("Enter to pipe");
    if(!triWords || !searchQuery){
      return triWords;
    }
    return triWords.filter(triWord => 
      triWord.spanish_word.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  }

}
