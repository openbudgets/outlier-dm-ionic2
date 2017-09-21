import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DatasetDetailsPage } from '../pages/dataset-details/dataset-details';
import { DatasetListPage } from '../pages/dataset-list/dataset-list';
import { NewDatasetPage } from '../pages/new-dataset/new-dataset';
import { OutlierDMChart } from '../pages/outlier-dm-chart/outlier-dm-chart'
import { RelatedInfoModal } from '../pages/related-info-modal/related-info-modal'
import { ConfigurationPage } from '../pages/configuration/configuration'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslatePipe } from "./pipes/translate";

@NgModule({
  declarations: [
    MyApp,
    DatasetDetailsPage,
    DatasetListPage,
    NewDatasetPage,
    OutlierDMChart,
    RelatedInfoModal,
    ConfigurationPage,
    TranslatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DatasetDetailsPage,
    DatasetListPage,
    NewDatasetPage,
    OutlierDMChart,
    RelatedInfoModal,
    ConfigurationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TranslatePipe
  ]
})
export class AppModule {}
