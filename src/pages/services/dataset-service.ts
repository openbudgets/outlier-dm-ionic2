import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../app/app.settings';

export class DatasetService {
  currentDataset: any;

  static get parameters() { return [[Http]]; }

  constructor(private http:Http) {}

  listDatasets() {
    let url = AppSettings.API_ENDPOINT + '/files';
    return this.http.get(url).map(res => res.json());
  }

  retrieveDataset(filename: string) {
    let url = AppSettings.API_ENDPOINT + '/files/' + filename;
    return this.http.get(url).map(res => res.json());
  }

  getCurrentDataset() { return this.currentDataset }

  setCurrentDataset(data: any) { this.currentDataset = data; }
}
