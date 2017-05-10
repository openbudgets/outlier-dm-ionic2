import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/dataset-details/dataset-details';
import { DatasetListPage } from '../pages/dataset-list/dataset-list';
import { NewDatasetPage } from '../pages/new-dataset/new-dataset';
import { OutlierDMChart } from '../pages/outlier-dm-chart/outlier-dm-chart'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    DatasetListPage,
    NewDatasetPage,
    OutlierDMChart
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    DatasetListPage,
    NewDatasetPage,
    OutlierDMChart
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
