import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class DAMService {
  static get parameters() { return [[Http]]; }

  constructor(private http:Http) {}

  startDAMJob(damUrl) {
    return this.http.get(damUrl).map(res => res.json());
  }
}
