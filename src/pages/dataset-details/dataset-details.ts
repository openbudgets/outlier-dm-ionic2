import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DatasetService } from '../../services/dataset-service'


@Component({
  selector: 'page-item-details',
  templateUrl: 'dataset-details.html',
  providers: [DatasetService]
})
export class ItemDetailsPage {
  dataset: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private datasetService: DatasetService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.dataset = navParams.get('item');
  }
}
