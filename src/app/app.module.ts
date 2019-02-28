import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy,
  Location, CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NgProgressModule } from 'ng2-progressbar';
import {NgxPaginationModule} from 'ngx-pagination';
import {SelectModule} from 'ng2-select-compat';
import { DatepickerModule } from 'angular2-material-datepicker';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgNotifyPopup } from 'ng2-notify-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { ProjectListingComponent } from './user/project-listing/project-listing.component';
import { ProjectDetailComponent } from './user/project-detail/project-detail.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { LeftProfileComponent } from './user/left-profile/left-profile.component';
import { SearchFilterComponent } from './user/search-filter/search-filter.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PostLoginComponent } from './user/post-login/post-login.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { SimpleSearchComponent } from './user/simple-search/simple-search.component';
import { ContentPageComponent } from './user/content-page/content-page.component';
import { RecentlyViewedComponent } from './user/recently-viewed/recently-viewed.component';
import { ProjectCreateComponent } from './user/project-create/project-create.component';
import { MyProjectsComponent } from './user/my-projects/my-projects.component';
import { InboxComponent } from './user/inbox/inbox.component';
import { MyContactsComponent } from './user/my-contacts/my-contacts.component';
import { MySettingsComponent } from './user/my-settings/my-settings.component';
import { MyNotificationsComponent } from './user/my-notifications/my-notifications.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { ProjectsComponentComponent } from './user/projects-component/projects-component.component';
import { MyProjectsTabComponent } from './user/my-projects-tab/my-projects-tab.component';
import { MyTodosComponent } from './user/my-todos/my-todos.component';
import { MyBuyersComponent } from './user/my-buyers/my-buyers.component';
import { MySellersComponent } from './user/my-sellers/my-sellers.component';
import { BillingComponent } from './user/billing/billing.component';
import { SecurityComponent } from './user/security/security.component';
import { MyAccountComponent } from './user/my-account/my-account.component';
import { SettingNotificationsComponent } from './user/setting-notifications/setting-notifications.component';
import { PersonalInfoComponent } from './user/personal-info/personal-info.component';
import { ProfessionalInfoComponent } from './user/professional-info/professional-info.component';
import { LinkedAccountsComponent } from './user/linked-accounts/linked-accounts.component';
import { AccountSecurityComponent } from './user/account-security/account-security.component';
import { RegisterationInfoComponent } from './user/registeration-info/registeration-info.component';
import { VerifyCompleteComponent } from './user/verify-complete/verify-complete.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, HeaderComponent, FooterComponent, ProjectListingComponent,
    ProjectDetailComponent, DashboardComponent, EditProfileComponent, LeftProfileComponent,
    SearchFilterComponent, LoginComponent, RegisterComponent, PostLoginComponent,
    ForgetPasswordComponent, SimpleSearchComponent, ContentPageComponent, RecentlyViewedComponent,
    ProjectCreateComponent, MyProjectsComponent, InboxComponent, MyContactsComponent,
    MySettingsComponent, MyProfileComponent, MyNotificationsComponent, ProjectsComponentComponent,
    MyProjectsTabComponent, MyTodosComponent, MyBuyersComponent, MySellersComponent,
    BillingComponent, SecurityComponent, MyAccountComponent, SettingNotificationsComponent,
    PersonalInfoComponent, ProfessionalInfoComponent, LinkedAccountsComponent,
    AccountSecurityComponent, RegisterationInfoComponent, VerifyCompleteComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule,
    HttpModule,
    LocalStorageModule.withConfig({
            prefix: 'SevenAdriin',
            storageType: 'localStorage'
        }), NgxPaginationModule, NgProgressModule, Ng4GeoautocompleteModule.forRoot(),
        BootstrapModalModule, DatepickerModule, ConfirmModule,
        SelectModule, MultiselectDropdownModule, NgNotifyPopup
  ],
 //providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService, SharedService],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, UserService, SharedService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  entryComponents: []
})
export class AppModule { }
