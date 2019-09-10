import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CinemaUserComponent} from './cinema-user/cinema-user.component';
import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';


const userRoutes: Routes = [
  {path: '', component: UserComponent, children: [
      {path: 'cinema', component : CinemaUserComponent},
      {path: 'profile', component: ProfileComponent}
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
   RouterModule
  ]
})
export class UserRoutingModule { }
