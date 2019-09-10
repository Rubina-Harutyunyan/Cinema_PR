import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUp2Component } from './sign-up2/sign-up2.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './admin/dialog/dialog.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import {DataTableModule} from './sharedTable/data-table.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SafePipe } from './safe.pipe';
import {MatDialogModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent,
    SignUp2Component,
    MyDialogComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTableModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyDialogComponent
  ]
})
export class AppModule { }
