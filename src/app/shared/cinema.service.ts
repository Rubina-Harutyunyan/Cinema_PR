import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient) { }

  getCinema() {
    return this.http.get('http://localhost:3001/cinema');
  }
  getMovies() {
    return this.http.get('http://localhost:3002/movies');
  }
  postCinema(data) {
    return this.http.post('http://localhost:3001/cinema', data);
  }
  patchCinema(id, data) {
    return this.http.patch(`http://localhost:3001/cinema/${id}`, data);
  }

  // getMovie() {
  //   return this.http.get('http://localhost:3001/movie');
  // }
}
