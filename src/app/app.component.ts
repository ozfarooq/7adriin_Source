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

import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public allCategoryList: any[] = [];
  title = 'Gafah';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) {
    sharedServiceObj.languageEmitter.subscribe(item => this.setLanguage(item));
    }
  ngOnInit() {
    this.loadAllCategories();
    document.getElementById('websiteCss').innerHTML = '<link href="assets/css/style.css" rel="stylesheet" />';
    //debugger;
  }
  loadAllCategories() {
    this.userServiceObj.loadAllCategories()
    .subscribe((result) => this.loadAllCategoriesResp(result));
  }
  loadAllCategoriesResp(result: any): void {
    if ( result.status === true) {
      this.allCategoryList = result.results;
      //this.runCarosel();
      //debugger;
      this.localStorageService.set('categoryList', this.allCategoryList);
    } else {
      this.allCategoryList = [];
      this.localStorageService.set('categoryList', this.allCategoryList);
    }
  }
  setLanguage(languageId: string) {
if (languageId === '1') {
  //debugger;
  document.getElementById('websiteCss').innerHTML = '';
  document.getElementById('websiteCss').innerHTML = '<link href="assets/css/style.css" rel="stylesheet" />';
}else if (languageId === '2') {
  //debugger;
  document.getElementById('websiteCss').innerHTML = '';
  document.getElementById('websiteCss').innerHTML = '<link href="assets/css/rtlcss.css" rel="stylesheet" />';
}
  }
}
