import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../../shared/cinema.service';

@Component({
  selector: 'app-cinema-user',
  templateUrl: './cinema-user.component.html',
  styleUrls: ['./cinema-user.component.css']
})
export class CinemaUserComponent implements OnInit {

  cinema: any;
  randomNumber;


  constructor(private http: HttpClient, private cinemaService: CinemaService) { }


  ngOnInit() {
    this.cinemaService.getCinema().subscribe((data) => {
      this.cinema = data;
      for (let i = 0; i < this.cinema.length; i++) {
        this.randomNumber = Math.floor(Math.random() * this.cinema[i].images.length);
    }

    });


  }





}
