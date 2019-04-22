import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  public itemList: Item[] = new Array();
  public searchQuery:string;
  public destiny:string;
  public title:string;

  constructor(public itemsService: ItemService,
              public router: Router,
              public navController: NavController,
              public toast: Toast,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.destiny = this.activatedRoute.snapshot.paramMap.get('id');
    this.setTitleToolbar();
    this.itemsService.getItems()
    .snapshotChanges()
    .subscribe( item => {
      this.itemList = [];
      item.forEach(element => {
        let object= element.payload.toJSON();
        object['$key'] = element.key;
        var myItem = object as Item;
        if(myItem.kind == this.destiny){
          this.itemList.push(myItem);
        }
      });
    }); 
  }

  setTitleToolbar(){
    if(this.destiny == "colors"){
      this.title = "Colores";
    }
    if(this.destiny == "numbers"){
      this.title = "Números";
    }
    if(this.destiny == "family"){
      this.title = "Familia";
    }
    if(this.destiny == "months_days"){
      this.title = "Días y Meses";
    }
    if(this.destiny == "meals"){
      this.title = "Alimentos";
    }
    if(this.destiny == "objects"){
      this.title = "Objetos";
    }
    if(this.destiny == "human_body"){
      this.title = "Cuerpo humano";
    }
    if(this.destiny == "verbs"){
      this.title = "Verbos";
    }
    if(this.destiny == "animals"){
      this.title = "Animales";
    }

  }


  buttonBack(){
    this.navController.navigateForward(`/tabs/tab3`);
  }

}
