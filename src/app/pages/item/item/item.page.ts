import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  public item:Item = new Item();
  public item_id:any;
  public destiny_id:any;
  public itemObservable: Observable<any>;

  constructor(public itemService: ItemService,
              public router: Router,
              public toast: Toast,
              public navController: NavController,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.destiny_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.destiny_id);
    this.itemService.getItems();

    if(this.item_id){
      this.itemObservable = this.itemService.getItem(this.item_id);
      this.itemObservable.subscribe(item => {
         
          this.item = item;
          this.item.$key = this.item_id;
          console.log(this.item);
      });
    }
  }

  onSubmitItem(){
    if(this.validateForm(this.item)){
      if(!this.item_id){
        this.item.kind = this.destiny_id;
        this.itemService.insertItem(this.item);
        this.router.navigate([`/item-list/${this.destiny_id}`])
      }else{
        this.itemService.updateItem(this.item);
        this.router.navigate([`/item-list/${this.destiny_id}`])
      }
    }else{
      this.toast.show(`Complete todos los campos`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }


  validateForm(item: Item){
    var resp = false
    if( (/.*\S+.*/.test(item.english_word)) &&
        (/.*\S+.*/.test(item.spanish_word)) &&
        (/.*\S+.*/.test(item.quechua_word)) ){
        resp = true
      }
      return resp;
  }

  buttonBack(){
    this.navController.navigateForward(`/item-list/${this.destiny_id}`);
  }

}
