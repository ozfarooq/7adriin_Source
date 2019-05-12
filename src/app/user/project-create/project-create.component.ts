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
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';
import { NotifierService } from 'angular-notifier';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
declare const FB: any;
declare var CKEDITOR: any;

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit, AfterViewInit {
  public hideImageCropper = true;
  public isImageExist = false;
  public edit_project_logo = false;
  public crop_project_image = false;
  public isApp = false;
  public createTab = '1';
  public cropperSettings;
  public croppedWidth: Number;
  public croppedHeight: Number;
  public allCategoryList: any[] = [];
  public allSubCategoryList: any[] = [];
  public filteredSubCategoryList: any[] = [];
  public allSkillsList: any[] = [];
  public allSelectedSkillsList: any[] = [];
  public dataProjectImage: any;
  public projectImage = '';
  public projectWidth = '';
  public projectHeight = '';

  public image_url = '';
  public project_title = '';
  public description = '';
  public selectedCategory = '';
  public selectedSubCategory = '';
  public proj_budget = '';
  public loadNewProjectImage = false;
  private readonly notify: NotifierService;
  public projectObj: any = {
    project_title: '',
    project_description_editor: '',
    selectedCategory: '',
    selectedSubCategory: '',
    allSelectedSkillsList: [],
    project_Image: '',
    project_Pdf: '',
    is_verified: '',
    user_id: '',
    proj_budget: ''
  };
  public CkeditorConfig = {removeButtons: 'Underline,Subscript,Superscript,SpecialChar'
  , toolbar: [
    { name: 'document', groups: [], items: ['Source'] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline'] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
    items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
    { name: 'links', items: [] },
    { name: 'styles', items: ['Format', 'FontSize' ] }
  ]};
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService, private projectServiceObj: ProjectService,
    private url: LocationStrategy, private dialogService: DialogService, public ngZone: NgZone, private notifierService: NotifierService) {
      this.notify = notifierService;
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 100;
      this.cropperSettings.height = 100;
      this.cropperSettings.croppedWidth = 1280;
      this.cropperSettings.croppedHeight = 1000;
      this.cropperSettings.canvasWidth = 500;
      this.cropperSettings.canvasHeight = 300;
      this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;
        this.cropperSettings.rounded = false;
        this.cropperSettings.keepAspect = false;
      this.cropperSettings.noFileInput = true;
        this.dataProjectImage = {};
     }

  ngOnInit() {
  }
  ngAfterViewInit() {
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.inline( 'project_description_editor', {removeButtons: 'Underline,Subscript,Superscript,SpecialChar'
    , toolbar: [
      { name: 'document', groups: [], items: ['Source'] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline'] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
      items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
      { name: 'links', items: [] },
      { name: 'styles', items: ['Format', 'FontSize' ] }
    ]});
    this.loadAllCategories();
    this.loadAllAvailableSubCategories();
    this.loadAllSkills();
  }
  loadAllCategories() {
    this.userServiceObj.loadAllCategories()
    .subscribe((result) => this.loadAllCategoriesResp(result));
  }
  loadAllCategoriesResp(result: any): void {
    if ( result.status === true) {
      this.allCategoryList = result.results;
    } else {
      this.allCategoryList = [];
    }
  }
  loadAllAvailableSubCategories() {
    this.userServiceObj.loadAllAvailableSubCategories()
    .subscribe((result) => this.loadAllAvailableSubCategoriesResp(result));
  }
  loadAllAvailableSubCategoriesResp(result: any): void {
    if ( result.status === true) {
      this.allSubCategoryList = result.results;
    } else {
      this.allSubCategoryList = [];
    }
  }
  filterSubCategories(cat_Id: any) {
    this.filteredSubCategoryList = this.allSubCategoryList.filter(
      category => category.cat_id === cat_Id);
  }
  loadAllSkills() {
    this.userServiceObj.loadAllSkills()
    .subscribe((result) => this.loadAllSkillsResp(result));
  }
  loadAllSkillsResp(result: any): void {
    if ( result.status === true) {
      this.allSkillsList = result.skills;
    } else {
      this.allSkillsList = [];
    }
  }
  setSelectedPackage(skillItem) {
    const selectedIndex = this.allSelectedSkillsList.indexOf(skillItem);
    if (selectedIndex >= 0) {
      this.allSelectedSkillsList.splice(selectedIndex, 1);
    } else {
      this.allSelectedSkillsList.push(skillItem);
    }
  }
  setProjectTopTabs(createTabType: string) {
      this.createTab = createTabType;
  }
  cancelProject() {
    this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
      });
  }
  projectFirstStep() {
    let finalProjectSkills = '';
this.projectObj.project_title = this.project_title;
this.projectObj.project_description_editor = document.getElementById('project_description_editor').innerHTML;
this.projectObj.selectedCategory = this.selectedCategory;
this.projectObj.selectedSubCategory = this.selectedSubCategory;
this.allSelectedSkillsList.forEach(function(data){
  if (finalProjectSkills === '') {
    finalProjectSkills = data.id.toString();
  }else if (finalProjectSkills !== '') {
  finalProjectSkills = finalProjectSkills + ',' + data.id.toString();
}
});

this.projectObj.allSelectedSkillsList = finalProjectSkills;
//debugger;
this.projectObj.proj_budget = this.proj_budget;
this.projectObj.user_id = this.localStorageService.get('userId').toString();
this.ngZone.run(() => {
this.createTab = '2';
});
//debugger;
  }
  projectSecondStep() {
    this.projectObj.project_Image = this.projectImage;
    this.ngZone.run(() => {
    this.createTab = '3';
    });
    //debugger;
  }
  createProject() {
    this.projectObj.is_verified = '1';
    this.projectServiceObj.createProject(this.projectObj).
    subscribe((result) => this.createProjectResponse(result));
    //debugger;
  }
  createProjectResponse(result: any): void {
    //debugger;
    if (result.status === true) {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
        this.notify.notify( 'success', result.message.toUpperCase() );
        CKEDITOR.instances['project_description_editor'].destroy(true);
      });
      //debugger;
    }
  }
  loadEditedImage(imageObject: any) {
    const self = this;
    const image: any = new Image();
    const reader = new FileReader();
            self.cropperSettings.croppedWidth = imageObject.croppedWidth;
            self.cropperSettings.croppedHeight = imageObject.croppedHeight;
           self.resizeProjectImage(imageObject.websiteImage, data => {
            self.projectImage = data;
              self.createProjectImageThumbnail(self.projectImage);
            });
  }
projectFileChangeListener($event) {
  this.crop_project_image = true;
  this.edit_project_logo = true;
  this.isImageExist = true;
  const image: any = new Image();
  const file: File = $event.target.files[0];
  const myReader: FileReader = new FileReader();
  const that = this;
  myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      image.onload = function () {

        that.cropperSettings.croppedWidth = image.width;
        that.cropperSettings.croppedHeight = image.height;
     that.projectImage = image.src;
    that.createProjectImageThumbnail(that.projectImage);
    };
  };
  myReader.readAsDataURL(file);
}
/////////////////////Generate Thumbnail//////////////////////

createProjectImageThumbnail(bigMatch: any) {
  const that = this;
  //debugger;
    this.generateProjectImageFromImage(bigMatch, 500, 500, 0.5, data => {
      //debugger
  that.dataProjectImage.image = data;
  //debugger;
    });
  }
  generateProjectImageFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
    const canvas: any = document.createElement('canvas');
    const image: any = new Image();
    const that = this;
    image.src = img;
    image.onload = function () {
      let width = that.cropperSettings.croppedWidth;
      let height = that.cropperSettings.croppedHeight;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      that.projectWidth = width;
      that.projectHeight = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      // IMPORTANT: 'jpeg' NOT 'jpg'
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl);
    };
  }
  resizeProjectImage(img: any, callback) {
    const canvas: any = document.createElement('canvas');
    const image: any = new Image();
    const that = this;

    image.src = img;
    image.onload = function () {
      const width = that.cropperSettings.croppedWidth;
      const height = that.cropperSettings.croppedHeight;
      canvas.width = width;
      canvas.height = height;
const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 1);

     callback(dataUrl);
    };
  }
 ////////////////////////////////////////////////////////////////////////
}
