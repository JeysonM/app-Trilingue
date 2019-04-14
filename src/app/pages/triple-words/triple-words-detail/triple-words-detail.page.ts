import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TripleWordService } from 'src/app/services/triple-word.service';
import { TripleWord } from 'src/app/models/triple-word';

@Component({
  selector: 'app-triple-words-detail',
  templateUrl: './triple-words-detail.page.html',
  styleUrls: ['./triple-words-detail.page.scss'],
})
export class TripleWordsDetailPage implements OnInit {
  triWord_id:any;
  tripleWord:TripleWord = new TripleWord();
  triWordObservable: Observable<any>;

  constructor(public activatedRoute: ActivatedRoute,
              public navController: NavController,
              public tripleWordService: TripleWordService) { }

  ngOnInit() {
    this.triWord_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.triWordObservable = this.tripleWordService.getTriWord(this.triWord_id);
    this.triWordObservable.subscribe(triWord => {
        this.tripleWord = triWord; 
    });
  }

  buttonBack(){
    this.navController.navigateForward(`/tabs/tab2`);
  }

  

}
