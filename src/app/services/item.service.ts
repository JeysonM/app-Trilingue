import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../models/item';

import * as firebase from 'firebase';
import {AngularFireStorage} from 'angularfire2/storage'
import { Toast } from '@ionic-native/toast/ngx';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public itemList: AngularFireList<any>;
  public selectedImage:string;
  public urlImage:Observable<string>;
  public myUrlImage:string;
  constructor(private firebase: AngularFireDatabase,
              public toast: Toast,
              public storage:AngularFireStorage) {}

  getItems(){
    return this.itemList = this.firebase.list('items');
  }

  getItem(key: string){
    return this.firebase.object(`items/${key}`).valueChanges();
  }


  insertItem(item: Item){
    this.itemList.push({
      spanish_word: item.spanish_word,
      english_word: item.english_word,
      quechua_word: item.quechua_word,
      imagePath: item.imagePath,
      kind: item.kind,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString()
    });
  }

  updateItem(item: Item){
    this.itemList.update(item.$key, {
      spanish_word: item.spanish_word,
      english_word: item.english_word,
      quechua_word: item.quechua_word,
      imagePath: item.imagePath,
      kind: item.kind,
      updated_at: Date.now().toString()
    });
  }

  deleteItem($key: string) {
    this.itemList.remove($key);
  }

  getlink(name){
    var starsRef = this.storage.ref(`img/${name}`)
      .getDownloadURL()
      .subscribe((avatarUrl) => {

        console.log(avatarUrl);
      }, (error) => {

        console.error(error);
      });
  }

  loadImageToFirebase(imagePath,item){
     
    let promise = new Promise ((resolve,reject)=>{
      this.showToast(`Cargando imagen...`);
      
      let storeRef = firebase.storage().ref();
      let fileName:string = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask = storeRef.child(`img/${fileName}`)
      .putString( imagePath, 'base64', {contentType: 'image/jpeg'});

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
        () => {},
        (err) =>{
          console.log('ERROR UPLOAD FILE');
          console.log(JSON.stringify(err));
          this.showToast(JSON.stringify(err));
          reject();
        },
        ()=>{
          var starsRef = this.storage.ref(`img/${fileName}`)
          .getDownloadURL()
          .subscribe((urlImage) => {

            item.imagePath = urlImage.toString();
            this.insertItem(item);
            this.showToast('Item guardado correctamente');
            
          }, (error) => {

            console.error(error);
          });
          resolve();
        }
      )
    });

    //return promise;
  }

  showToast(message){
    this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
