import { Component } from '@angular/core';
import { TripleWordService } from '../services/triple-word.service';
import { TripleWord } from '../models/triple-word';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  public tripleWordList: TripleWord[] = new Array();
  constructor(public tripleWordService: TripleWordService,
              public router: Router,
              public navController: NavController) { }

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

  pushToDetailTriWord(word:TripleWord){
    this.navController.navigateForward(`/triple-words-detail/${word.$key}`);
  }

}
