import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { LoginComponent } from './user/login/login.component';
import { PostLoginComponent } from './user/post-login/post-login.component';
import { ProjectDetailComponent } from './user/project-detail/project-detail.component';
import { ProjectListingComponent } from './user/project-listing/project-listing.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { ContentPageComponent } from './user/content-page/content-page.component';
import { ProjectCreateComponent } from './user/project-create/project-create.component';
import { MyProjectsComponent } from './user/my-projects/my-projects.component';
import { InboxComponent } from './user/inbox/inbox.component';
import { MyContactsComponent } from './user/my-contacts/my-contacts.component';
import { MySettingsComponent } from './user/my-settings/my-settings.component';
import { MyNotificationsComponent } from './user/my-notifications/my-notifications.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { RegisterationInfoComponent } from './user/registeration-info/registeration-info.component';
import { VerifyCompleteComponent } from './user/verify-complete/verify-complete.component';
import { AllCategoriesComponent } from './user/all-categories/all-categories.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { FbConfirmComponent } from './user/fb-confirm/fb-confirm.component';
import { FinancialStatementComponent } from './user/financial-statement/financial-statement.component';
import { DashboardProjectsComponent } from './user/dashboard-projects/dashboard-projects.component';

const routes: Routes = [
  {
      path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
      path: 'home', component: HomeComponent
    },
    {
      path: 'edit-profile', component: EditProfileComponent
    },
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'post-login', component: PostLoginComponent
    },
    {
      path: 'register', component: RegisterComponent
    },
    {
      path: 'register/:type', component: RegisterComponent
    },
    {
      path: 'project-detail', component: ProjectDetailComponent
    },
    {
      path: 'project-listing', component: ProjectListingComponent
    },
    {
      path: 'project-listing/:catId', component: ProjectListingComponent
    },
    {
      path: 'dashboard', component: DashboardComponent
    }
    ,
    {
      path: 'forget-password', component: ForgetPasswordComponent
    },
    {
      path: 'content', component: ContentPageComponent
    },
    {
      path: 'content/:type', component: ContentPageComponent
    }
    ,
    {
      path: 'create-project', component: ProjectCreateComponent
    },
    {
      path: 'my-project', component: MyProjectsComponent
    },
    {
      path: 'my-settings', component: MySettingsComponent
    },
    {
      path: 'inbox', component: InboxComponent
    },
    {
      path: 'my-contacts', component: MyContactsComponent
    },
    {
      path: 'my-notifications', component: MyNotificationsComponent
    },
    {
      path: 'my-profile', component: MyProfileComponent
    },
    {
      path: 'personal-info', component: RegisterationInfoComponent
    },
    {
      path: 'verify', component: VerifyCompleteComponent
    },
    {
      path: 'verify/:verificationCode', component: VerifyCompleteComponent
    },
    {
      path: 'categories', component: AllCategoriesComponent
    },
    {
      path: 'change-password/:userId', component: ChangePasswordComponent
    },
    {
      path: 'FbConfirmPage', component: FbConfirmComponent
    },
    {
      path: 'FbConfirmPage/:type', component: FbConfirmComponent
    },
    {
      path: 'financial-statement', component: FinancialStatementComponent
    },
    {
      path: 'dashboard-projects', component: DashboardProjectsComponent
    }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
  })
export class AppRoutingModule { }
