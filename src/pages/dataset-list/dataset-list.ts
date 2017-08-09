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
  items: Array<{title: string, note: string, icon: string, selected: any}>;
  isComparingMultiple: boolean;
  comparisonData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datasetService: DatasetService,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');
    this.isComparingMultiple = false;
    this.comparisonData = [];

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
    this.navCtrl.push(ItemDetailsPage, {
      item: {title: "Comparison", data: this.comparisonData}
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

        if (this.isComparingMultiple) {
          if (!item.selected) {
            this.comparisonData = this.comparisonData.concat(res);
          }
          item.selected = !item.selected;
        }
        else {
          item.data = res;
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
