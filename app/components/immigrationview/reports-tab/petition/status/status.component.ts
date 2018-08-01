﻿import {AppService} from '../../../../../services/app.service';
import {PetitionsStatusReportsService} from './status.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../../common/header/header.service';


@Component({
    selector: 'app-petitionstatus-report',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.sass'],
  providers: [PetitionsStatusReportsService]
})

export class PetitionsStatusReportsComponent implements OnInit {

    public orgsList: any = {};
    public orgsNames: any = [];
    public open: any = [];
    public closed: any = [];
  constructor(public appService: AppService, private petitionsStatusreportsservice: PetitionsStatusReportsService, public headerService: HeaderService) { }
  ngOnInit() {
        this.headerService.showSideBarMenu("immiview-reports", "immiview-petitionreports");

        this.petitionsStatusreportsservice.getpetitonstatusreports(this.headerService.user.accountId)
            .subscribe((res) => {
                this.barChartData = [];
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.barChartLabels.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        if (this.orgsList[item].length == "2") {
                            if (this.orgsList[item][i].status == "Open") {
                                this.open.push(this.orgsList[item][i]['count']);
                            }
                            if (this.orgsList[item][i].status == "Close") {
                                this.closed.push(this.orgsList[item][i]['count']);
                            }
                        }
                        else {
                            if (this.orgsList[item][i].status == "Open") {
                                this.open.push(this.orgsList[item][i]['count']);
                            }
                            else {
                                this.open.push(0);
                            }
                            if (this.orgsList[item][i].status == "Close") {
                                this.closed.push(this.orgsList[item][i]['count']);
                            }
                            else {
                                this.closed.push(0);
                            }
                        }

                    }

                }
                this.barChartData.push({ data: this.open, label: 'Open petiitons' }, { data: this.closed, label: 'Closed petiitons' });
            });
    }
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
            }]
        }
    };
    public barChartLabels = [];
    public barChartLegend: boolean = true;
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public barChartData: any[] = [{ data: [], label: '' }, { data: [], label: '' }];

}
