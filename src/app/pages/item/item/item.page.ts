import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { NavController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

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

  public title:string;
  public imagePreview:string;
  public image64:string;

  constructor(public itemService: ItemService,
              public router: Router,
              public toast: Toast,
              public navController: NavController,
              public activatedRoute: ActivatedRoute,
              private imagePicker: ImagePicker) { }

  ngOnInit() {
    this.destiny_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.test();
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
        this.itemService.loadImageToFirebase(this.image64,this.item);
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

  test(){
    let name = "1555863581844";
    this.itemService.getlink(name);
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

  selectImage(){
    let options:ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);

          this.imagePreview = 'data:image/jpeg;base64,' + results[i];
          this.image64 = results[i];
      }
    }, (err) => { 
      console.log("Error en selector", JSON.stringify(err));
    });
  }

  buttonBack(){
    this.navController.navigateForward(`/item-list/${this.destiny_id}`);
  }

}
