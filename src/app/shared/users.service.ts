import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }


  addUser(userName, password, firstName, lastName, address, phone, step, role ) {
    const newUser = {
      "userName": userName,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "address": address,
      "phone": phone,
      "step": step,
      "role": role
    };
     return this.http.post('http://localhost:3000/users', newUser);
  }

  delete(filteredUser) {
    return this.http.delete(`http://localhost:3000/users/${filteredUser.id}`);
  }

}
