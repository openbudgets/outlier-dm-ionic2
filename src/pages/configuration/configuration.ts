import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LangService} from "../../services/lang-service";

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  lang: string = 'en';
  languages: [any] = [{value: 'en', label: 'English'}, {value: 'de', label: 'Deutsch'}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public langService: LangService) {
    this.lang = langService.getLang();
  }

  setLang(newLang: string) {
    this.langService.setLang(newLang);
  }
}
