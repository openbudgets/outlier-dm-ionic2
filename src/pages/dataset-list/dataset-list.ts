import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../dataset-details/dataset-details';
import { DatasetService } from '../services/dataset-service';

@Component({
  selector: 'page-list',
  templateUrl: 'dataset-list.html',
  providers: [DatasetService]
})
export class DatasetListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datasetService: DatasetService) {
    this.selectedItem = navParams.get('item');

    let itemSettings = {
      'Processing': {icon: 'timer', color: 'danger'},
      'Ready': {icon: 'checkmark-circle-outline', color: 'secondary'}
    };

    // turn on loading at this point
    this.datasetService.listDatasets().subscribe(
      response => {
        this.items = response.map(file => {
          return {
            title: file.filename,
            note: file.status,
            icon: itemSettings[file.status].icon,
            color: itemSettings[file.status].color
          }
        })
      },
      error => {
        console.log(error);
      },
      //() => turn off loading here
    );
  }

  itemTapped(event, item) {
    this.datasetService.retrieveDataset(item.title).subscribe(
      res => {
        item.data = res;
        this.navCtrl.push(ItemDetailsPage, {
          item: item
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
