import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemDetailsPage } from '../dataset-details/dataset-details';
import { DatasetService } from '../../services/dataset-service';

@Component({
  selector: 'page-list',
  templateUrl: 'dataset-list.html',
  providers: [DatasetService]
})
export class DatasetListPage {
  selectedItem: any;
  items: Array<{title: string, data: any, note: string, icon: string, selected: any}>;
  isComparingMultiple: boolean;
  selectedDatasets: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datasetService: DatasetService,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');
    this.isComparingMultiple = false;
    this.selectedDatasets = [];

    let itemSettings = {
      'Processing': {icon: 'timer', color: 'danger'},
      'Ready': {icon: 'checkmark-circle-outline', color: 'secondary'}
    };

    let loading = this.loadingCtrl.create({
      content: 'Getting files list. Please wait...'
    });

    loading.present();

    this.datasetService.listDatasets().subscribe(
      response => {
        loading.dismiss();
        this.items = response.map(file => {
          return {
            title: file.filename,
            status: file.status,
            icon: itemSettings[file.status].icon,
            color: itemSettings[file.status].color,
            selected: false
          }
        });
      },
      error => {
        loading.dismiss();
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'An error has occurred while fetching the files list.',
          buttons: ['OK']
        });
        alert.present();
      },
    );
  }

  compareDatasets(event) {
    // take the data of datasets that are selected for comparison
    let that = this;
    let data = this.items
      .filter(function (item) {
        return that.selectedDatasets.includes(item.title);
    })
      .map(function (item) {
        return item.data;
    })
      .reduce(function(a, b) {
        return a.concat(b);
    });

    this.navCtrl.push(ItemDetailsPage, {
      item: {title: "Comparison", data: data}
    });
  }

  itemTapped(event, item) {
    console.log(item);
    if (item.status == 'Processing') {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'This dataset is being processed, try again later',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Downloading dataset. Please wait...'
    });

    loading.present();

    this.datasetService.retrieveDataset(item.title).subscribe(
      res => {
        loading.dismiss();
        item.data = res;

        if (this.isComparingMultiple) {
          if (!item.selected) {
            this.selectedDatasets.push(item.title);
          }
          else {
            let toRemove = this.selectedDatasets.indexOf(item.title);
            this.selectedDatasets.splice(toRemove, 1);
          }
          item.selected = !item.selected;
          console.log(this.selectedDatasets);
        }
        else {
          this.navCtrl.push(ItemDetailsPage, {
            item: item
          });
        }
      },
      error => {
        loading.dismiss();
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'An error has occurred while fetching the dataset.',
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
}
