import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DatasetDetailsPage } from '../dataset-details/dataset-details';
import { DatasetService } from '../../services/dataset-service';
export var DatasetListPage = (function () {
    function DatasetListPage(navCtrl, navParams, datasetService, loadingCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datasetService = datasetService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.selectedItem = navParams.get('item');
        this.isComparingMultiple = false;
        this.selectedDatasets = [];
        var itemSettings = {
            'Processing': { icon: 'timer', color: 'danger' },
            'Ready': { icon: 'checkmark-circle-outline', color: 'secondary' }
        };
        var loading = this.loadingCtrl.create({
            content: 'Getting files list. Please wait...'
        });
        loading.present();
        this.datasetService.listDatasets().subscribe(function (response) {
            loading.dismiss();
            _this.items = response.map(function (file) {
                return {
                    title: file.filename,
                    status: file.status,
                    icon: itemSettings[file.status].icon,
                    color: itemSettings[file.status].color,
                    selected: false
                };
            });
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var alert = _this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'An error has occurred while fetching the files list.',
                buttons: ['OK']
            });
            alert.present();
        });
    }
    DatasetListPage.prototype.compareDatasets = function (event) {
        // take the data of datasets that are selected for comparison
        var that = this;
        var data = this.items
            .filter(function (item) {
            return that.selectedDatasets.includes(item.title);
        })
            .map(function (item) {
            return item.data;
        })
            .reduce(function (a, b) {
            return a.concat(b);
        });
        this.navCtrl.push(DatasetDetailsPage, {
            item: { title: "Comparison of selected Datasets", data: data }
        });
    };
    DatasetListPage.prototype.itemTapped = function (event, item) {
        var _this = this;
        console.log(item);
        if (item.status == 'Processing') {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'This dataset is being processed, try again later',
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        var loading = this.loadingCtrl.create({
            content: 'Downloading dataset. Please wait...'
        });
        loading.present();
        this.datasetService.retrieveDataset(item.title).subscribe(function (res) {
            loading.dismiss();
            item.data = res;
            if (_this.isComparingMultiple) {
                if (!item.selected) {
                    _this.selectedDatasets.push(item.title);
                }
                else {
                    var toRemove = _this.selectedDatasets.indexOf(item.title);
                    _this.selectedDatasets.splice(toRemove, 1);
                }
                item.selected = !item.selected;
                console.log(_this.selectedDatasets);
            }
            else {
                _this.navCtrl.push(DatasetDetailsPage, {
                    item: item
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            var alert = _this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'An error has occurred while fetching the dataset.',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    DatasetListPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-list',
                    templateUrl: 'configuration.html',
                    providers: [DatasetService]
                },] },
    ];
    /** @nocollapse */
    DatasetListPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
        { type: DatasetService, },
        { type: LoadingController, },
        { type: AlertController, },
    ]; };
    return DatasetListPage;
}());
//# sourceMappingURL=configuration.js.mapp