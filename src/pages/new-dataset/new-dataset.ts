import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { DAMService } from '../../app/services/dam-service';

@Component({
  selector: 'new-dataset',
  templateUrl: 'new-dataset.html',
  providers: [DAMService]
})
export class NewDatasetPage {
  name: string;
  cube: string;
  factsUri: string;
  damUrl: string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public damService: DAMService) {
    this.name = "My New Dataset";
    this.cube = 'aragon-2008-income__568a8';
    this.factsUri = 'BABBAGE_FACT_URI=http://ws307.math.auth.gr/rudolf/public/api/3/cubes/';
    this.damUrl = 'http://dam-obeu.iais.fraunhofer.de/outlier_detection/LOF/sample?'
  }

  startDAMJob(event) {
    let url = this.damUrl + this.factsUri + this.cube + '/facts';

    let loading = this.loadingCtrl.create({
      content: 'Sending job request to the DAM.'
    });

    loading.present();

    this.damService.startDAMJob(url).subscribe(
      response => {
        loading.dismiss();
        console.log(response);
      },
      error => {
        loading.dismiss();
        console.log(error);
      }
    );
  }
}
