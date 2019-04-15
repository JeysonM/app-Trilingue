import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public colors = "colors"
  public numbers = "numbers"
  public class_objects = "class_objects"
  public week_days = "week_days"

  constructor(public navController: NavController){

  }


  goTo(destiny){
    this.navController.navigateForward(`/item-list/${destiny}`);
  }
}
