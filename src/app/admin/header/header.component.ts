import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

rrr: any = [];
  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.rrr = data;

    });
  }
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
