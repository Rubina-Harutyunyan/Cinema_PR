import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatDialog, MatDialogModule, MatDialogRef,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableComponent} from './data-table/data-table.component';
import {DialogComponent} from '../admin/dialog/dialog.component';

@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    DataTableComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]

})
export class DataTableModule { }
