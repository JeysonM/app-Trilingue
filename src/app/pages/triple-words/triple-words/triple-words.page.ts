import { Component, OnInit } from '@angular/core';
import { TripleWord } from 'src/app/models/triple-word';
import { TripleWordService } from 'src/app/services/triple-word.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-triple-words',
  templateUrl: './triple-words.page.html',
  styleUrls: ['./triple-words.page.scss'],
})
export class TripleWordsPage implements OnInit {

  public tripleWord:TripleWord = new TripleWord();
  public triWord_id:any;
  public triWordObservable: Observable<any>;

  constructor(public tripleWordService: TripleWordService,
              public router: Router,
              public toast: Toast,
              public navController: NavController,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.triWord_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tripleWordService.getTriWords();

    if(this.triWord_id){
      this.triWordObservable = this.tripleWordService.getTriWord(this.triWord_id);
      this.triWordObservable.subscribe(triWord => {
         
          this.tripleWord = triWord;
          this.tripleWord.$key = this.triWord_id;
          console.log(this.tripleWord);
      });
    }
  }


  onSubmitTripleWord(){
    
      if(this.validateForm(this.tripleWord)){
        if(!this.triWord_id){
          this.tripleWordService.insertTriWord(this.tripleWord);
          this.router.navigate(['/tabs/tab2'])
        }else{
          this.tripleWordService.updateTriWord(this.tripleWord);
          this.router.navigate(['/tabs/tab2'])
        }
      }else{
        this.toast.show(`Complete todos los campos, la fonetica es opcional`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    
  }


  validateForm(tripleWord: TripleWord){
    var resp = false
    if( (/.*\S+.*/.test(tripleWord.english_word)) &&
        (/.*\S+.*/.test(tripleWord.english_example)) &&
        (/.*\S+.*/.test(tripleWord.spanish_word)) &&
        (/.*\S+.*/.test(tripleWord.spanish_example)) &&
        (/.*\S+.*/.test(tripleWord.quechua_word)) &&
        (/.*\S+.*/.test(tripleWord.english_example))){
        resp = true
      }
      return resp;
  }

  buttonBack(){
    this.navController.navigateForward(`/tabs/tab2`);
  }

}
