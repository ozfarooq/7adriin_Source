import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, Renderer, EventEmitter, NgZone  } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { LocationStrategy, Location } from '@angular/common';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { Router, CanActivate, RouterModule, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {NgProgressService} from 'ng2-progressbar';
import { DialogService } from 'ng2-bootstrap-modal';
//import { NotificationService } from 'ng2-notify-popup';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
declare const FB: any;
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  public allCountryCodes: any[] = [];
  public selectedCountry = 'United Arab Emirates';
  public selectedResidencyCountry = 'United Arab Emirates';
  public contact_number = '';
  public home_address = '';
  public age = '';
  public first_name = '';
  public last_name = '';
  public image_url = '';
  public description = '';
  public language_selected = 'English';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) { }

  ngOnInit() {
    this.loadAllCountries();
  }

loadAllCountries() {
  this.sharedServiceObj.getAllCountries()
  .subscribe((result) => this.loadAllCountriesResp(result));
}
loadAllCountriesResp(result: any): void {
  if ( result.status === true) {
    this.allCountryCodes = result.results;
  } else {
    this.allCountryCodes = [];
  }
  //debugger;
}
savePersonalInfo(): void {
  this.userServiceObj.savePersonalInfo(this.first_name, this.last_name, this.selectedCountry, this.selectedResidencyCountry,
    this.contact_number, this.home_address, this.age, this.image_url, this.description, this.language_selected)
  .subscribe((result) => this.savePersonalInfoResponse(result));
}
savePersonalInfoResponse(result: any): void {
  //debugger;
  if (result.status === true) {
  }
}
}
