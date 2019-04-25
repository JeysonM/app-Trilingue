import { Component, OnInit } from '@angular/core';
import { TripleWord } from 'src/app/models/triple-word';
import { TripleWordService } from 'src/app/services/triple-word.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

import { MediaCapture, CaptureVideoOptions, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-triple-words',
  templateUrl: './triple-words.page.html',
  styleUrls: ['./triple-words.page.scss'],
})
export class TripleWordsPage implements OnInit {

  public tripleWord:TripleWord = new TripleWord();
  public triWord_id:any;
  public triWordObservable: Observable<any>;

  recording: boolean = false;
  filePath: string;
  fileNameSpanish: string;
  fileNameEnglish: string;
  fileNameQuechua: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(public tripleWordService: TripleWordService,
              public router: Router,
              public toast: Toast,
              public navController: NavController,
              public activatedRoute: ActivatedRoute,
              private media: Media,
              private file: File,
              public platform: Platform) { }

  ngOnInit() {
    this.triWord_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tripleWordService.getTriWords();
    this.getAudioList();
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
          this.tripleWord.spanish_phonetics = this.fileNameSpanish;
          this.tripleWordService.insertTriWord(this.tripleWord);
          this.router.navigate(['/tabs/tab2'])
        }else{
          this.tripleWord.spanish_phonetics = this.fileNameSpanish;
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

  /*****
   * Recording functions 
   *****/

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  startRecordSpanish() {
    if (this.platform.is('ios')) {
      this.fileNameSpanish = this.tripleWord.spanish_word + new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileNameSpanish;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileNameSpanish = this.tripleWord.spanish_word + new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileNameSpanish;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecordSpanish() {
    this.audio.stopRecord();
    let data = { filename: this.fileNameSpanish };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }


}
