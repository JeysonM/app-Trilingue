import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public itemList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {}

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
}
