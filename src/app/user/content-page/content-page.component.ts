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
declare const cbpHorizontalMenu: any;
declare const App: any;
@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {
  public page_type= '';
  public page_title= '';
  public page_description= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla sodales diam, eu' +
  'facilisis augue feugiat ultricies. In scelerisque elit nulla, nec tempor metus gravida et. Vestibulum vitae purus a ' +
  'felis elementum finibus. Vivamus ut semper justo. Integer pulvinar congue maximus. Nullam vitae convallis ex. ' +
'Curabitur et elit neque. Sed varius arcu eu iaculis malesuada. Vestibulum ac tortor vel tortor iaculis varius et sit ' +
'amet enim. Curabitur at turpis libero. Ut dictum sodales metus, vel viverra quam tempus sed. Donec eleifend eros ' +
'imperdiet neque maximus consequat. Sed efficitur, ligula in aliquam cursus, felis dui porttitor augue, nec condimentum ' +
'eros nulla nec magna. Sed fermentum laoreet lacus, a feugiat ante elementum id.  Aenean faucibus lorem in lorem ' +
'iaculis feugiat. Integer turpis nisi, iaculis eget magna non, porta lacinia nunc. Donec non dictum arcu, ac aliquam dui. ' +
'Ut tempor sapien ante, quis cursus lectus hendrerit nec. Maecenas semper, quam vel gravida porta, nulla quam faucibus ' +
'ante, sit amet venenatis dolor turpis at est. Curabitur tristique accumsan volutpat. Nunc pulvinar, arcu sit amet ' +
'lobortis ultricies, eros urna molestie mauris, in luctus leo purus et nisi. Suspendisse blandit mi nibh, ut tincidunt ' +
'velit aliquam eu. Mauris sed fermentum est, in aliquet nibh. Proin vulputate id sapien id auctor. Nam suscipit fringilla ' +
'auctor. Ut quis magna sit amet lectus fringilla egestas.' +
  'Quisque porttitor massa non metus fermentum, et rutrum elit faucibus. Donec sed leo et sem molestie cursus tristique ' +
  'sed elit. Integer imperdiet euismod diam. Etiam tellus tellus, ultricies nec aliquet id, facilisis in tortor. Sed ' +
  'suscipit ultrices metus, sagittis consequat metus rhoncus sed. Duis placerat dui ac risus molestie, dapibus gravida ' +
  'tellus tincidunt. Integer eget nunc neque. Curabitur id mi laoreet, rhoncus ex vitae, tristique dui. Sed nec ultrices ' +
  'ex, id volutpat lacus. Sed a sollicitudin purus. Vivamus luctus, risus et euismod congue, ipsum risus condimentum ' +
  'orci, ultricies placerat quam risus sit amet velit. Morbi dictum feugiat mattis. Phasellus id sollicitudin nisl.' +
  'Pellentesque placerat turpis orci, et cursus libero condimentum et. Curabitur at purus hendrerit, commodo dui a, ' +
  'interdum erat. Proin ullamcorper rhoncus libero eget scelerisque. Nulla id massa quam. Donec sit amet ullamcorper ' +
  'lacus, a efficitur sem. Curabitur quis ex viverra velit sodales lacinia sed sed ex. Mauris malesuada magna sed eros ' +
  'sagittis, ut vehicula eros dignissim. Phasellus vitae tempor dolor. Curabitur lectus eros, egestas vitae leo non, ' +
  'ultricies bibendum turpis. Cras vitae lorem nec velit elementum rutrum id vel sem.';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService, private ngZone: NgZone,
    private url: LocationStrategy, private dialogService: DialogService, private notifierService: NotifierService) {
    this._routeParams.params.subscribe(params => {
      //debugger;
      this.page_type = params['type'];
      this.loadPageContents();
      //debugger;
  });
  }

  ngOnInit() {
    
  }
loadPageContents() {
  //debugger;
  if (this.page_type === 'about-us') {
this.page_title = 'About Us';
  } else if (this.page_type === 'careers') {
    this.page_title = 'Careers';
  } else if (this.page_type === 'press') {
    this.page_title = 'Press';
  } else if (this.page_type === 'faq') {
    this.page_title = 'FAQ';
  } else if (this.page_type === 'trust-safety') {
    this.page_title = 'Trust & Safety';
  } else if (this.page_type === 'terms-service') {
    this.page_title = 'Terms of Service';
  } else if (this.page_type === 'privacy-policy') {
    this.page_title = 'Privacy Policy';
  } else if (this.page_type === 'partnership') {
    this.page_title = 'Partnership';
  } else if (this.page_type === 'help-client') {
    this.page_title = 'Help & Support - Client';
  } else if (this.page_type === 'help-freelancers') {
    this.page_title = 'Help & Support - Freelancers';
  } else if (this.page_type === 'forum') {
    this.page_title = 'Forum';
  } else if (this.page_type === 'blogs') {
    this.page_title = 'Blogs';
  } else if (this.page_type === 'events') {
    this.page_title = 'Events';
  }
}
}
