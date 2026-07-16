import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomebankService} from "../../service/homebank.service";
import {SharedDataService} from "../../service/shared-data.service";
import {Homebank} from "../../model/homebank";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit, OnDestroy {
  homebank: Homebank | null;

  constructor(private homebankService: HomebankService,
              private sharedDataService: SharedDataService) {
    this.homebank = null;
  }

  ngOnInit(): void {
    this.sharedDataService.getHomebank().subscribe(homebank => {
      this.homebank = homebank;
    });
  }

  get accountsToDisplay() {
    return this.homebank?.accounts.filter(account => this.homebankService.isDisplayable(account));
  }

  ngOnDestroy(): void {
    this.homebank = null;
  }
}
