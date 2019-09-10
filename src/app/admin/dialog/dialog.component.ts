import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CinemaService} from '../../shared/cinema.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cinemaService: CinemaService,
    private http: HttpClient) {
  }
  ngOnInit() {
    console.log('dsdadasdsdasa', this.data);
    if (this.data) {
      this.form.get('id').setValue(this.data.id);
      this.form.get('name').setValue(this.data.name);
      this.form.get('address').setValue(this.data.address);
      this.form.get('description').setValue(this.data.description);
    }
  }

  add() {
    this.http.post('http://localhost:3001/cinema', this.form.value).subscribe(
      (res: any) => {
        this.dialogRef.close(true);
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  save() {

    this.http.patch('http://localhost:3001/cinema/' + this.form.value.id, this.form.value).subscribe(
      (res: any) => {
        console.log('------------', res);
        this.dialogRef.close(true);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
