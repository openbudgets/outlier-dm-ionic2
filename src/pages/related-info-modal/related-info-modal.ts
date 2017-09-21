import {Component} from "@angular/core";
import {LangService} from "../../services/lang-service";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'related-info-modal',
  templateUrl: 'related-info-modal.html',
  providers: [LangService]
})
export class RelatedInfoModal {
  modalString: any;

  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.modalString = params.get('modalString');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}