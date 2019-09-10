import {Component, Input, OnInit} from '@angular/core';
import {DialogComponent} from '../../admin/dialog/dialog.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../../shared/cinema.service';
import {MyDialogComponent} from '../../my-dialog/my-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {Subscription} from 'rxjs';
import {DialogMovieComponent} from '../../admin/dialog-movie/dialog-movie.component';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }


/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  private routeSub: Subscription;
  id2;
  index;
  movieId;
  @Input() dataSource: any;
  @Input() displayedColumns: any;
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //
  // }
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private cinemaService: CinemaService,
    private router: Router,
    private authService: AuthService,
    private active: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log('source', this.dataSource);
    this.routeSub = this.active.params.subscribe(params => {
      this.id2 = params['id'];
      this.index = --this.id2;
      this.id2 = ++this.id2;
    });
  }


  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     height: '250px',
  //     width: '500px',
  //
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.http.get('http://localhost:3001/cinema').subscribe((data) => {
  //         this.dataSource.push(data) ;
  //         // console.log(this.dataSource);
  //       });
  //     }
  //
  //   });
  // }

  edit(id) {
    const item = this.dataSource.find(obj => obj.id === id);
    if (item.description) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: item
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cinemaService.getCinema().subscribe((data) => {
            this.dataSource = data;
          });
        }
      });
    } else {
      const dialogRef = this.dialog.open(DialogMovieComponent, {
        data: item
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cinemaService.getMovies().subscribe((data) => {
            this.dataSource = data;
          });
        }
      });
    }
  }

  remove(id) {
    this.movieId = id;
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {name: 'Ok', text: 'Are U sure?', cancel: 'Cancel', data: this.dataSource.find(obj => obj.id === id)}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete('http://localhost:3001/cinema/' + this.movieId).subscribe(
          (res: any) => {
            this.cinemaService.getCinema().subscribe((data) => {
              this.dataSource = data;
            });
          },
          (error) => {
            console.log('error', error);
          }
        );
        this.http.delete('http://localhost:3002/movies/' + this.movieId).subscribe(
          (res: any) => {
            this.cinemaService.getMovies().subscribe((data) => {
              this.dataSource = data;
              this.dataSource = this.dataSource.filter((item) => {
                return item.cinemaId === this.id2;
              });
              console.log(this.dataSource);
            });
          },
          (error) => {
            console.log('error', error);
          }
        );
      }
    });

  }

  vvv = this.dataSource;
  www = new MatTableDataSource(this.vvv);

  applyFilter(filterValue: string) {

    this.www.filter = filterValue.trim().toLowerCase();

  }

  ok(id) {
    console.log(id);
    this.router.navigate(['/admin/cinema', id]);
  }

}

//   if(this.dataSource[--id].cinemaId){
//     const dialogRef = this.dialog.open(MyDialogComponent, {
//       data: {name: 'Ok', text: 'Are U sure?', cancel: 'Cancel', movie: this.dataSource[++id]}
//
//     });
//     // console.log(this.dataSource[id]);
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.cinemaService.getMovies().subscribe((data) => {
//           this.dataSource = data;
//           console.log(this.dataSource);
//         });
//       }
//     });
//   }else{
// console.log(this.dataSource[--id]);
// console.log(id);
// console.log(this.dataSource[--id]);





