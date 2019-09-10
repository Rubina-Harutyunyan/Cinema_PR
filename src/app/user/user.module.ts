import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { CinemaUserComponent } from './cinema-user/cinema-user.component';
import {UserComponent} from './user.component';
import { ProfileComponent } from './profile/profile.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {DataTableModule} from '../sharedTable/data-table.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MoviesUserComponent } from './movies-user/movies-user.component';


@NgModule({
  declarations: [
    UserComponent,
    CinemaUserComponent,
    ProfileComponent,
    MoviesUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    DataTableModule,
    FlexLayoutModule

  ]
})
export class UserModule { }
