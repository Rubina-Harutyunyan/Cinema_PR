import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogComponent} from '../dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../../shared/cinema.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.css']
})
export class DialogMovieComponent implements OnInit {
  editMovie: FormGroup  = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    poster: new FormControl(''),
    trailer: new FormControl(''),
    date: new FormControl(new Date())
  });
  url;
  safeURL;
  flag = false;
  flagURL = false;
  parsedStr;
  link;
  public dataSource;
  displayedColumns: string[] = ['id', 'name', 'poster', 'trailer', 'date', 'actions'];
  constructor(
    public dialogRef: MatDialogRef<DialogMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cinemaService: CinemaService,
    private http: HttpClient,
    protected sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // console.log(new Date(this.data.date.getTime() - (this.data.date.getTimezoneOffset() * 60000)).toJSON());
    // console.log(JSON.stringify(this.data.date));
    console.log('dsdadasdsdasa', this.data);

    if (this.data) {
      let date = new Date(this.data.date);
      let dateN = new Date(date.getTime() - (date.getTimezoneOffset() / 300000)).toJSON();
      console.log(dateN);
      // this.data.date = new Date(Date.parse(this.data.date)).getTime() - (this.data.date).getTimezoneOffset() / 60000;
      console.log(this.data.date);
      this.editMovie.get('id').setValue(this.data.id);
      this.editMovie.get('name').setValue(this.data.name);
      this.editMovie.get('poster').setValue(this.data.poster);
      this.editMovie.get('trailer').setValue(this.data.trailer);
      this.editMovie.get('date').setValue(dateN);
      console.log(new Date(Date.parse(this.data.date)).getTime());
      // console.log(new Date(Date.parse(this.data.date)).getTimezoneOffset() * 60000).toJSON();
      // this.editMovie.get('date').setValue(new Date(this.data.date.value.getTime() - (this.data.date.value.getTimezoneOffset() / 60000)).toJSON());
      // console.log(new Date(this.data.date.getTime() - (this.data.date.getTimezoneOffset() * 60000)).toJSON());
    }

    console.log('form', this.editMovie.value);
  }



  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        console.log(this.url);
        this.flag = true;

        this.editMovie.get('poster').setValue(this.url);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  readUrl2(event) {
    const inputValue = event.target.value;
    console.log(inputValue);
    this.parsedStr = inputValue.split("v=")[1];
    this.parsedStr = (this.parsedStr != undefined) ? this.parsedStr : inputValue.split("youtu.be/")[1];
    const resultId = this.parsedStr.split("&")[0];
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + resultId);
    console.log(this.safeURL);
    this.editMovie.get('trailer').setValue(this.safeURL);
    this.flagURL = true;
  }


edit() {
  console.log(this.editMovie.value);
  console.log(this.editMovie.value.id);
  this.editMovie.get('date').setValue(new Date(this.editMovie.get('date').value.getTime() - (this.editMovie.get('date').value.getTimezoneOffset() * 60000)).toJSON());
  this.http.patch('http://localhost:3002/movies/' + this.editMovie.value.id, this.editMovie.value).subscribe(
    (res: any) => {
      console.log('------------', res);
      // this.http.get('http://localhost:3002/movies').subscribe(
      //   (res: any) => {
      //     console.log(res);
      //     // this.dataSource = res;
      //     this.dataSource = res.filter((item) => {
      //       return item.cinemaId === 2;
      //     });
      //     this.dialogRef.close(true);
      //     console.log(this.dataSource);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
      this.dialogRef.close(true);
    },
    (error) => {
      console.log('xxxxxxxxx', error);
    }
  );

}

}
