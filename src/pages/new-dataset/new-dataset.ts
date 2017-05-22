import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { DAMService } from '../../services/dam-service';
import { DatasetService } from '../../services/dataset-service';
import { BabbageService } from '../../services/babbage-service';

@Component({
  selector: 'new-dataset',
  templateUrl: 'new-dataset.html',
  providers: [DAMService, DatasetService, BabbageService]
})
export class NewDatasetPage {
  datasetName: string;
  cube: string;
  factsUri: string;
  damUrl: string;
  searchPackageUrl: string;
  packageList: any;
  searchBar: string = '';
  isSearching: boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public damService: DAMService, public datasetService: DatasetService,
              public babbageService: BabbageService) {
    this.datasetName = "My New Dataset";
    this.cube = 'aragon-2008-income__568a8';
    this.factsUri = 'BABBAGE_FACT_URI=http://ws307.math.auth.gr/rudolf/public/api/3/cubes/';
    this.damUrl = 'http://dam-obeu.iais.fraunhofer.de/outlier_detection/LOF/sample?';

    let loading = this.loadingCtrl.create({
      content: 'Requesting dataset list.'
    });

    loading.present();

    this.packageList = [{id:'1', name:'1'},{id:'2', name:'2'},{id:'3', name:'3'}]

    this.babbageService.loadItems().then(
      response => {
        this.packageList = response;
        console.log(response);
        loading.dismiss();
      },
      error => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  filterPackageList(searchBar) {
    this.packageList = this.babbageService.filterItems(searchBar.target.value)
  }

  selectDatasetFromSearchList(dataset) {
    this.cube = dataset.id;
    this.isSearching = false;
  }

  startDAMJob(event) {
    let url = this.damUrl + this.factsUri + this.cube + '/facts';

    let loading = this.loadingCtrl.create({
      content: 'Sending job request to the DAM.'
    });

    loading.present();

    this.damService.startDAMJob(url).subscribe(
      response => {
        console.log(response);

        this.datasetService.addDataset(this.datasetName, response.jobid).subscribe(
          response => {
            loading.dismiss();
            console.log(response);
          },
          error => {
            loading.dismiss();
            console.log(error);
          }
        );
      },
      error => {
        loading.dismiss();
        console.log(error);
      }
    );
  }
}
