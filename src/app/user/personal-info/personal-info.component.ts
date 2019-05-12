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

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
declare const FB: any;
declare var CKEDITOR: any;
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
 // @ViewChild('personalCropper', undefined)
  //personalCropper: ImageCropperComponent;
  public hideImageCropper = true;
  public isImageExist = false;
  public edit_personal_logo = false;
  public crop_personal_image = false;
  public isApp = false;
  public cropperSettings;
  public croppedWidth: Number;
  public croppedHeight: Number;
  public allCountryCodes: any[] = [];
  public dataPersonalImage: any;
  public personalImage = '';
  public personalWidth = '';
  public personalHeight = '';
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
  public loadNewPersonalImage = false;
  public user_id = '';
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
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) {
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
        this.dataPersonalImage = {};
     }

  ngOnInit() {
    this.loadAllCountries();
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.inline( 'user_description_editor', {removeButtons: 'Underline,Subscript,Superscript,SpecialChar'
    , toolbar: [
      { name: 'document', groups: [], items: ['Source'] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline'] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
      items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
      { name: 'links', items: [] },
      { name: 'styles', items: ['Format', 'FontSize' ] }
    ]});
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
/*editImage(imageType: string) {
  const that = this;
  this.loadNewPersonalImage = true;
  //debugger;
  const selectedImageOption = {
    mode: 'edit',
    croppedWidth: this.cropperSettings.croppedWidth,
    croppedHeight: this.cropperSettings.croppedHeight,
    websiteImage: this.personalImage,
    imageType: imageType
  };
 var modalColor = this.modalCtrl.create(PicturePopupPage,{selectedImageOption:selectedImageOption});
  modalColor.onDidDismiss(data => {
    if (data) {
      that.setWebsiteImage(data);
    }
});
 modalColor.present();
}*/
setWebsiteImage(imageObject: any) {
this.loadNewPersonalImage = true;

  if (imageObject.imageType === 'personal') {
    this.loadEditedImage(imageObject);
  }

  }
  loadEditedImage(imageObject: any) {
    const self = this;
    const image: any = new Image();
    const reader = new FileReader();
            self.cropperSettings.croppedWidth = imageObject.croppedWidth;
            self.cropperSettings.croppedHeight = imageObject.croppedHeight;
           self.resizePersonalImage(imageObject.websiteImage, data => {
            self.personalImage = data;
              self.createPersonalImageThumbnail(self.personalImage);
            });
  }
personalFileChangeListener($event) {
  this.crop_personal_image = true;
  this.edit_personal_logo = true;
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
     that.personalImage = image.src;
    that.createPersonalImageThumbnail(that.personalImage);
    };
  };
  myReader.readAsDataURL(file);
}
/////////////////////Generate Thumbnail//////////////////////

createPersonalImageThumbnail(bigMatch: any) {
  const that = this;
  //debugger;
    this.generatePersonalImageFromImage(bigMatch, 500, 500, 0.5, data => {
      //debugger
  that.dataPersonalImage.image = data;
  //debugger;
    });
  }
  generatePersonalImageFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
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
      that.personalWidth = width;
      that.personalHeight = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      // IMPORTANT: 'jpeg' NOT 'jpg'
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl);
    };
  }
  resizePersonalImage(img: any, callback) {
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
savePersonalInfo(): void {
  //debugger;
  this.userServiceObj.savePersonalInfo(this.localStorageService.get('userId').toString(), this.first_name, this.last_name,
  this.selectedCountry, this.selectedResidencyCountry,
    this.contact_number, this.home_address, this.age, this.image_url,
    document.getElementById('user_description_editor').innerHTML, this.language_selected)
  .subscribe((result) => this.savePersonalInfoResponse(result));
}
savePersonalInfoResponse(result: any): void {
  //debugger;
  CKEDITOR.instances['user_description_editor'].destroy(true);
  if (result.status === true) {
  }
}
}
