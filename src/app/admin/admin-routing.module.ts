import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {CinemaComponent} from './cinema/cinema.component';
import {DashboredComponent} from './dashbored/dashbored.component';
import {UsersComponent} from './users/users.component';
import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MoviesComponent} from './movies/movies.component';

const adminRoutes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: 'cinema', component: CinemaComponent},
      {path: 'cinema/:id', component: MoviesComponent},
      {path: 'dashbored', component: DashboredComponent},
      {path: 'users', component: UsersComponent},
      {path: 'myProfile', component: MyProfileComponent}
    ]},

];

@NgModule({

  imports: [
  RouterModule .forChild(adminRoutes)

  ],
  exports: [
    RouterModule
  ]

})
export class AdminRoutingModule { }


