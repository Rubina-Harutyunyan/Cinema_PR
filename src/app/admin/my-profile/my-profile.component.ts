import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../shared/users.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  info: FormGroup;
  password: FormGroup;
  admin: any = {};
  users: any = [];
  editedAdmin: any = {};
  editedPassword: any = {};
  id: number;

  constructor(private usersService: UsersService, public modal: NgxSmartModalService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('user'));
    console.log('dvcec', this.admin);
    this.info = new FormGroup({
      userName: new FormControl(this.admin.userName),
      firstName: new FormControl(this.admin.firstName),
      lastName: new FormControl(this.admin.lastName),
      address: new FormControl(this.admin.address),
      phone: new FormControl(this.admin.phone)
    });
    this.password = new FormGroup({
      oldPassword: new FormControl(''),
      password: new FormControl(''),
      newPassword: new FormControl('')
    });
  }


  save() {
    this.admin = JSON.parse(localStorage.getItem('user'));
    this.editedAdmin = this.info.value;
    this.id = this.admin.id;
    this.http.patch('http://localhost:3000/users/' + this.id, this.editedAdmin).subscribe(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.admin = JSON.parse(localStorage.getItem('user'));
        console.log('gjhg', res);
      },
      (error) => {
        console.log('7tyyy', error);
      }
    );
  }


  savePass() {
    this.admin = JSON.parse(localStorage.getItem('user'));
    this.editedPassword = this.password.value;
    this.id = this.admin.id;
    if (this.password.value.oldPassword !== this.admin.password) {
      alert('Old password in incorrect');
      this.password.reset();
    } else if (this.password.value.oldPassword === this.admin.password && this.password.value.password !== this.password.value.newPassword) {
      alert('New passwords don\'t match');
      this.password.reset();
    } else if (this.password.value.oldPassword === this.admin.password && this.password.value.password === this.password.value.newPassword) {
      this.http.patch('http://localhost:3000/users/' + this.id, {
        'password': this.editedPassword.password
      }).subscribe(
        (res: any) => {

          localStorage.setItem('user', JSON.stringify(res));
          this.password.reset();
          console.log(res);
          console.log(this.editedPassword);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

}
