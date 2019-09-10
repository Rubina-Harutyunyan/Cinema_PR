import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {CinemaComponent} from './cinema/cinema.component';
import {DashboredComponent} from './dashbored/dashbored.component';
import {UsersComponent} from './users/users.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {
  MatCardModule, MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableModule} from '../sharedTable/data-table.module';
// import {DataTableComponent} from '../sharedTable/data-table/data-table.component';
import {DialogComponent} from './dialog/dialog.component';
import { MoviesComponent } from './movies/movies.component';
import {HttpClientModule} from '@angular/common/http';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { DialogMovieComponent } from './dialog-movie/dialog-movie.component';




@NgModule({
  declarations: [
    AdminComponent,
    CinemaComponent,
    DashboredComponent,
    UsersComponent,
    HeaderComponent,
    SettingsComponent,
    MyProfileComponent,
    DialogComponent,
    MoviesComponent,
    DialogMovieComponent,
    // DataTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSmartModalModule.forRoot(),
    NgxDatatableModule,
    DataTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  entryComponents: [
    DialogComponent,
    DialogMovieComponent
  ]
})
export class AdminModule { }


