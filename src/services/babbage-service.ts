import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class BabbageService {
  items: any;
  babbageUrl: string;

  static get parameters() { return [[Http]]; }

  constructor(private http:Http) {
    this.babbageUrl = 'http://apps.openbudgets.eu/search/package?q=';
  }

  searchPackage(query) {
    return this.http.get(this.babbageUrl + query + '&no-cache-token=' + Math.random()).map(res => res.json());
  }

  loadItems() {
    return new Promise((resolve, reject) => {
      this.searchPackage('').subscribe(
        response => {
          this.items = response;
          resolve(this.items);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  filterItems(searchTerm) {
    return this.items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
