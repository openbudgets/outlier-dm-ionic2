import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../app/app.settings';

export class DatasetService {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }

    getDatasets() {
        let url = AppSettings.API_ENDPOINT + '/files';
        return this.http.get(url).map(res => res.json());
    }
}
