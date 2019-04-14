import { Component } from '@angular/core';
import { TripleWordService } from '../services/triple-word.service';
import { TripleWord } from '../models/triple-word';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  public tripleWordList: TripleWord[] = new Array();
  public searchQuery:string;

  constructor(public tripleWordService: TripleWordService,
              public router: Router,
              public navController: NavController,
              public toast: Toast,) { }

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

  onDelete(triWord: TripleWord){
    this.tripleWordService.deleteTriWord(triWord.$key);
    this.toast.show(`Se eliminó correctamente`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
    
  }

}
