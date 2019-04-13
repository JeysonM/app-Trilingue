import { Component } from '@angular/core';
import { TripleWordService } from '../services/triple-word.service';
import { TripleWord } from '../models/triple-word';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tripleWordList: TripleWord[] = new Array();
  constructor(public tripleWordService: TripleWordService) { }

  ngOnInit() {
    this.tripleWordService.getTriWords()
    .snapshotChanges()
    .subscribe( item => {
      this.tripleWordList = [];
      item.forEach(element => {
        let objectTriWord= element.payload.toJSON();
        objectTriWord['$key'] = element.key;
        var myTriWord = objectTriWord as TripleWord;
        this.tripleWordList.push(myTriWord);
      });
      
    }); 
  }

}
