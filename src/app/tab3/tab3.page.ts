import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public colors = "colors";
  public numbers = "numbers";
  public family = "family";
  public months_days = "months_days";
  public meals = "meals";
  public objects = "objects";
  public human_body = "human_body"
  public verbs = "verbs";
  public animals = "animals";

  constructor(public navController: NavController){

  }
  
  goTo(destiny){
    this.navController.navigateForward(`/item-list/${destiny}`);
  }
}
