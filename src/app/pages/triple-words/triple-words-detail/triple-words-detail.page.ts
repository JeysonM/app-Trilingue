import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TripleWordService } from 'src/app/services/triple-word.service';
import { TripleWord } from 'src/app/models/triple-word';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-triple-words-detail',
  templateUrl: './triple-words-detail.page.html',
  styleUrls: ['./triple-words-detail.page.scss'],
})
export class TripleWordsDetailPage implements OnInit {
  triWord_id:any;
  tripleWord:TripleWord = new TripleWord();
  triWordObservable: Observable<any>;

  recording: boolean = false;
  filePath: string;
  fileNameSpanish: string;
  fileNameEnglish: string;
  fileNameQuechua: string;
  audio: MediaObject;
  audioList: any[] = [];
  audioSpanish = new Audio();  
  audioEnglish = new Audio();
  audioQuechua = new Audio();

  constructor(public activatedRoute: ActivatedRoute,
              public navController: NavController,
              public tripleWordService: TripleWordService,
              private media: Media,
              private file: File,
              public platform: Platform) { }

  ngOnInit() {
    this.triWord_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.triWordObservable = this.tripleWordService.getTriWord(this.triWord_id);
    this.triWordObservable.subscribe(triWord => {
        this.tripleWord = triWord; 
    });
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

  buttonBack(){
    this.navController.navigateForward(`/tabs/tab2`);
  }

  playAudioSpanish(tripleWord: TripleWord){
    this.audioSpanish.src = tripleWord.spanish_phonetics;
    this.audioSpanish.load();
    this.audioSpanish.play();
  }
  
  stopAudioSpanish(){
    this.audioSpanish.pause()
  }

  playAudioEnglish(tripleWord: TripleWord){
    this.audioEnglish.src = tripleWord.english_phonetics;
    this.audioEnglish.load();
    this.audioEnglish.play();
  }
  
  stopAudioEnglish(){
    this.audioEnglish.pause()
  }

  playAudioQuechua(tripleWord: TripleWord){
    this.audioQuechua.src = tripleWord.quechua_phonetics;
    this.audioQuechua.load();
    this.audioQuechua.play();
  }
  
  stopAudioQuechua(){
    this.audioQuechua.pause()
  }

  

}
