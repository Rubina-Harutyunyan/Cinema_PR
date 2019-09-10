import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../shared/users.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MyDialogComponent} from '../../my-dialog/my-dialog.component';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  rows: any = [] ;
  temp = [];
  users: any;
  table;
  newUser: FormGroup;
  editedUser: FormGroup;
  newUsers: any;
  filteredUser;
  newUserObj: any;
  id: any;
  user;
  change;
  index;
  text;
  columns = [ { name: 'id' }, { name: 'userName' }, { name: 'firstName' }, { name: 'lastName' }, { name: 'address' }, { name: 'phone'}, { name: 'actions'}];
  constructor( public modal: NgxSmartModalService, private usersService: UsersService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((data) => {
      this.newUsers = data;
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newUser = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      step: new FormControl(1),
      role: new FormControl('user')
    });

    this.editedUser = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      step: new FormControl(''),
      role: new FormControl(''),

    });
    this.fetch(data => {

      this.temp = [...data];

      this.rows = data;
      console.log(this.rows);
    });


}
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/users');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();


    const temp = this.temp.filter(function(d) {
      return d.userName.toLowerCase().indexOf(val) !== -1 || !val || d.address.toLowerCase().indexOf(val) !== -1 || !val;
    });



    this.rows = temp;

    this.table.offset = 0;
  }



  addUser() {
    this.usersService.addUser(this.newUser.get('userName').value, this.newUser.get('password').value, this.newUser.get('firstName').value, this.newUser.get('lastName').value, this.newUser.get('address').value, this.newUser.get('phone').value, this.newUser.get('step').value, this.newUser.get('role').value).subscribe(
      (res: any) => {
        this.newUser.reset();
        this.rows.push(res);
        this.rows = [...this.rows];

      },
      (error) => {
        console.log(error);
      }
    );

  }



  remove(newUser) {


      this.filteredUser = this.newUsers.filter((item) => {

        return item.id === newUser;

      });
      // if (this.filteredUser) {
        console.log('hghg', this.filteredUser);


        const dialogRef = this.dialog.open(MyDialogComponent, {

          data: {name: 'Ok', text: 'Are U sure?', cancel: 'Cancel', user: this.filteredUser[0]}

        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.usersService.getUsers().subscribe((data) => {
              this.newUsers = data;
              console.log('/////////', this.rows);
                    this.rows.splice(--newUser, 1);
            });
          }
        });


  }


  edit(user) {

    this.filteredUser = this.newUsers.filter((item) => {
      console.log('gjhgh', user);
      return this.id = user;
    });
    this.index = --this.id;
    this.change = this.filteredUser[this.id];
    this.id = ++this.id;
    this.editedUser.get('userName').setValue(this.change.userName) ;
    this.editedUser.get('password').setValue(this.change.password);
    this.editedUser.get('firstName').setValue(this.change.firstName) ;
    this.editedUser.get('lastName').setValue(this.change.lastName) ;
    this.editedUser.get('address').setValue(this.change.address) ;
    this.editedUser.get('phone').setValue(this.change.phone) ;
    this.editedUser.get('step').setValue(1) ;
    this.editedUser.get('role').setValue('user') ;
  }



  save(){
    if (this.filteredUser) {
      this.newUserObj = this.editedUser.value;
      console.log('hfhgf', this.newUserObj);

      this.http.patch('http://localhost:3000/users/' + this.id, this.newUserObj).subscribe(
        (res: any) => {
          console.log('------------', res);
          this.rows.splice(this.index, 1, res);
          this.rows = [...this.rows];
          this.editedUser.reset();

        },
        (error) => {
          console.log('xxxxxxxxx', error);
        }
      );
      }
    }

}
