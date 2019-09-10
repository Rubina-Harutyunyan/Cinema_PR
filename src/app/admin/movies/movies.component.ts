import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../shared/auth.service';
import {UsersService} from '../../shared/users.service';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  private routeSub: Subscription;
  data;

  index;
  id;
  newMovie: FormGroup;
  cinema;
  url;
  parsedStr;
  seats;
  safeURL;
  flag = false;
  public dataSource;
  displayedColumns: string[] = ['id', 'name', 'poster', 'trailer', 'date', 'actions'];

  constructor(
    private active: ActivatedRoute,
    private http: HttpClient,
    public modal: NgxSmartModalService,
    private cd: ChangeDetectorRef,
    protected sanitizer: DomSanitizer,
  ) {
  }


  ngOnInit() {


    this.routeSub = this.active.params.subscribe(params => {
      this.id = params['id'];
      this.index = --this.id;
      this.id = ++this.id;
      console.log(this.id);
    });

    this.newMovie = new FormGroup({
      name: new FormControl(''),
      poster: new FormControl(''),
      trailer: new FormControl(''),
      date: new FormControl(new Date()),
      cinemaId: new FormControl(this.id),
      seats: new FormControl('')
    });
    // this.dateTime =
    console.log('date', this.newMovie.get('date').value);

    this.http.get('http://localhost:3002/movies').subscribe(
      (res: any) => {
        console.log(res);
        // this.dataSource = res;
        this.dataSource = res.filter((item) => {
          return item.cinemaId === this.id;
        });
        console.log(this.dataSource);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        // console.log(this.url);
        this.newMovie.get('poster').setValue(this.url);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  readUrl2(event) {
    const inputValue = event.target.value;
    this.parsedStr = inputValue.split('v=')[1];
    this.parsedStr = (this.parsedStr != undefined) ? this.parsedStr : inputValue.split('youtu.be/')[1];
    const resultId = this.parsedStr.split('&')[0];
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + resultId);
    console.log(this.safeURL.changingThisBreaksApplicationSecurity);
    this.newMovie.get('trailer').setValue(this.safeURL.changingThisBreaksApplicationSecurity);
    this.flag = true;
  }

  addMovie() {

    this.newMovie.get('date').setValue(new Date(this.newMovie.get('date').value.getTime() - (this.newMovie.get('date').value.getTimezoneOffset() * 60000)).toJSON());
    this.seats = {
      seat1: true,
      seat2: true,
      seat3: true,
      seats4: true,
      seats5: true,
      seats6: true,
      seats7: true,
      seats8: true,
      seats9: true
    };
    this.newMovie.get('seats').setValue(this.seats);
    this.http.post('http://localhost:3002/movies', this.newMovie.value).subscribe(
      (res: any) => {
        this.dataSource.push(res);
        console.log(this.newMovie.value);
        console.log(res);
        console.log('dataaa', this.dataSource);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
