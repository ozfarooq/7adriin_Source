import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, Renderer, EventEmitter, NgZone  } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { LocationStrategy, Location } from '@angular/common';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { Router, CanActivate, RouterModule, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
//import {LocalStorageService} from 'ngx-localstorage';
import {NgProgressService} from 'ng2-progressbar';
import { DialogService } from 'ng2-bootstrap-modal';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit, AfterViewInit {
  public userType= '';
  public userId= '';
  private allProjectList: any[]= [];
  private allCurrentProjectList: any[]= [];
  private allCompletedProjectList: any[]= [];
  private allCanceledProjectList: any[]= [];
  private allProposalList: any[]= []; public userProjectTab = '0';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService, private ngZone: NgZone) {
    }

  ngOnInit() {
    if (this.localStorageService.get('userType') === '1') {
      this.userType = '1';
      }else if (this.localStorageService.get('userType') === '0') {
      this.userType = '0';
      }
      if (this.localStorageService.get('userId')) {
        this.userId = this.localStorageService.get('userId').toString();
      }
  }
  ngAfterViewInit() {
    if (this.userType === '0') {
      //debugger;
      this.loadAllFreelancerProjects();
    }
  }
loadAllFreelancerProjects() {
this.userServiceObj.loadAllFreelancerProjects(this.userId).
subscribe((result) => this.loadAllFreelancerProjectsResp(result));
}
loadAllFreelancerProjectsResp(result: any): void {
  if ( result.status === true) {
    if ( result.projects !== false) {
      this.allProjectList = result.projects;
      //debugger;
      this.loadCurrentProjects();
      this.loadCompletedProjects();
      this.loadCanceledProjects();
    } else {
      this.allProjectList = [];
    }
  } else {
    this.allProjectList = [];
  }
}
  loadCompletedProjects() {
    this.allCompletedProjectList = this.allProjectList.filter(
      project => project.status === 'completed');
  }
  loadCurrentProjects() {
    this.allCurrentProjectList = this.allProjectList.filter(
      project => project.status === 'assigned' || project.status === 'pending');
      //debugger;
  }
  loadCanceledProjects() {
    this.allCanceledProjectList = this.allProjectList.filter(
      project => project.status === 'cancelled');
  }
  loadProposalSubmitted() {

  }
  formateDate(dateObj: string) {

  }
  setUserTabs(tabIndex: string) {
   this.userProjectTab = tabIndex;
  }
}
