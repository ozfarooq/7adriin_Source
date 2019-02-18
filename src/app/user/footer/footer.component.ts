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
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

declare const FB: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) { }

  ngOnInit() {
  }
loadContentPage() {
  this.router.navigate(['content']);
}
}
