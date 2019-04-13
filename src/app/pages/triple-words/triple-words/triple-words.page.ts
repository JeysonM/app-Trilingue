import { Component, OnInit } from '@angular/core';
import { TripleWord } from 'src/app/models/triple-word';
import { TripleWordService } from 'src/app/services/triple-word.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-triple-words',
  templateUrl: './triple-words.page.html',
  styleUrls: ['./triple-words.page.scss'],
})
export class TripleWordsPage implements OnInit {

  public tripleWord:TripleWord = new TripleWord();
  constructor(public tripleWordService: TripleWordService,
              public router: Router) { }

  ngOnInit() {
    this.tripleWordService.getTriWords();
  }


  onSubmitTripleWord(){
    this.tripleWordService.insertTriWord(this.tripleWord);
    this.router.navigate(['/tabs/tab2'])
  }

}
