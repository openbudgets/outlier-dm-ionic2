import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatasetListPage } from '../pages/dataset-list/dataset-list';
import { NewDatasetPage } from '../pages/new-dataset/new-dataset';
import { ConfigurationPage } from "../pages/configuration/configuration";
import { LangService } from "../services/lang-service";


@Component({
  templateUrl: 'app.html',
  providers: [LangService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DatasetListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Datasets List', component: DatasetListPage },
      { title: 'New Dataset', component: NewDatasetPage },
      { title: 'Configuration', component: ConfigurationPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
