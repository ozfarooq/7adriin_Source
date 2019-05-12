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
import { NotifierService } from 'angular-notifier';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

declare const FB: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private readonly notify: NotifierService;
  public passwordMsg= '';
  public password= '';
  public re_password= '';
  public email = '';
  public userId: any;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService, private notifierService: NotifierService) { 
      this.notify = notifierService;
      this._routeParams.params.subscribe(params => {
        this.userId = params['userId'];
    });
    }

  ngOnInit() {
  }
  changePassword() {
    if (this.userId) {
      if (this.password === this.re_password)  {
        this.userServiceObj.changePassword(this.userId, this.password)
        .subscribe((result) => this.changePasswordResponse(result));
      } else {
        this.notify.notify( 'error', 'Password does not match' );
      }
    } else {
      this.notify.notify( 'error', 'User does not exists' );
    }
  }
  changePasswordResponse(result: any): void {
    debugger;
    if (result.status === true) {
      this.passwordMsg = result.message;
      this.notify.notify( 'success', this.passwordMsg.toUpperCase() );
  } else if (result.status === true) {
    this.passwordMsg = result.message;
    this.notify.notify( 'error', this.passwordMsg.toUpperCase() );
}
}
}

