import {Component, OnInit} from '@angular/core';
import {CinemaService} from '../../shared/cinema.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})


export class CinemaComponent implements OnInit {
  // data: any = [];
  name: string;
  public dataSource;
  displayedColumns: string[] = ['id', 'name', 'address', 'description', 'actions'];

  constructor(public dialog: MatDialog, private cinemaService: CinemaService, private http: HttpClient) { }
  ngOnInit() {
    this.http.get('http://localhost:3001/cinema').subscribe(
      (res: any) => {
        // this.data = res;
        this.dataSource = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openDialog() {
     const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
           this.http.get('http://localhost:3001/cinema').subscribe((data) => {
          this.dataSource.push(data) ;
        });
        console.log(this.dataSource);
      }
      // console.log('sdsd', this.data);
    });
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}




