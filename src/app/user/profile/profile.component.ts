import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../../shared/users.service';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: any = {};
editedUser: any = {};
id: Number;
details: FormGroup;
editedPassword: any = {};
password: FormGroup;
  constructor(private http: HttpClient, private usersService: UsersService, public modal: NgxSmartModalService) { }

  ngOnInit() {
  this.user = JSON.parse(localStorage.getItem('user'));

  this.details = new FormGroup({
    userName: new FormControl(this.user.userName),
    firstName: new FormControl(this.user.firstName),
    lastName: new FormControl(this.user.lastName),
    address: new FormControl(this.user.address),
    phone: new FormControl(this.user.phone)
  });
    this.password = new FormGroup({
      oldPassword: new FormControl(''),
      password: new FormControl(''),
      newPassword: new FormControl('')
    });
  }

  save() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    this.editedUser = this.details.value;

    this.http.patch('http://localhost:3000/users/' + this.id, this.editedUser ).subscribe(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.user = JSON.parse(localStorage.getItem('user'));

        console.log('gjhg', res);
      },
      (error) => {
        console.log('7tyyy', error);
      }

    );




  }

  savePass() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.editedPassword = this.password.value;
    this.id = this.user.id;
    if (this.password.value.oldPassword !== this.user.password) {
      alert('Old password in incorrect');
      this.password.reset();
    } else if (this.password.value.oldPassword === this.user.password &&  this.password.value.password !== this.password.value.newPassword){
      alert("New passwords don't match");
      this.password.reset();
    } else if (this.password.value.oldPassword === this.user.password && this.password.value.password === this.password.value.newPassword) {
      this.http.patch('http://localhost:3000/users/' + this.id, {
        "password": this.editedPassword.password
      }).subscribe(
        (res: any) => {

          localStorage.setItem('user', JSON.stringify(res));
          this.password.reset();
          console.log('gjhg', res);
          console.log('99999', this.editedPassword);

        },
        (error) => {
          console.log('7tyyy', error);
        }
      );


    }
  }

}
