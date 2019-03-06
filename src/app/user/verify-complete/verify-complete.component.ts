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
declare const cbpHorizontalMenu: any;
declare const App: any;

@Component({
  selector: 'app-verify-complete',
  templateUrl: './verify-complete.component.html',
  styleUrls: ['./verify-complete.component.css']
})
export class VerifyCompleteComponent implements OnInit {
  public verification_code= '';
  public userVerificationMsg= '';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) {
      this._routeParams.params.subscribe(params => {
        this.verification_code = params['verificationCode'];
    });
    }
  ngOnInit() {
  }

  verifyUser(): void {
          this.userServiceObj.confirmVerificationCode(this.verification_code)
          .subscribe((result) => this.verifyUserResponse(result));
  }
  verifyUserResponse(result: any): void {
    if (result.status === true) {

      this.userVerificationMsg = 'User has been successfully verified.';
      this.localStorageService.set('loggedInUserInfo', result.memberCredentials);
      //this.notify.show( result.message.toUpperCase(), { position: 'top', duration: '2000', type: 'success' });
      this.router.navigate(['personal-info']);

    } else {
      // this.userCreated = true;
      // this.userSignUpMsg = result.message.toUpperCase();
      //this.notify.show( result.message.toUpperCase(), { position: 'top', duration: '2000', type: 'error' });
    }

  }
}
