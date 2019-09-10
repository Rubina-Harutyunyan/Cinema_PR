
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignUp2Component} from './sign-up2/sign-up2.component';
import {AuthGuardService} from './shared/auth-guard.service';
import {RoleGuardService} from './shared/role-guard.service';
import {StepGuardService} from './shared/step-guard.service';

const appRoutes: Routes = [
  {path: 'admin', canActivate: [AuthGuardService, RoleGuardService], loadChildren:  './admin/admin.module#AdminModule'},
  {path: 'user', canActivate: [AuthGuardService, StepGuardService], loadChildren: './user/user.module#UserModule'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'signUp2', canActivate: [AuthGuardService], component: SignUp2Component},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: '**', redirectTo: 'login'}

]

@NgModule({

  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
