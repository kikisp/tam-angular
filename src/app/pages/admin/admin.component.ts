import {Component, OnInit} from '@angular/core';
import {AppService} from '../../core/app.service';
import {Movie, UserData} from '../welcome/welcome.component';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private appService: AppService,
    private router: Router
  ) {

  }

  readonly displayedColumns = ['username', 'email', 'role', 'actions'];
  readonly displayedColumnsMovies: ['id_imdb', 'title', 'year', 'genre',
    'type', 'language', 'country', 'averageMark', 'viewComments'];
  users: UserData[];
  allMovies: Movie[];
  loggedUser: string;


  ngOnInit(): void {
    this.loggedUser = window.sessionStorage.getItem('username');
  }

  getUsers() {
    this.appService.getUsers()
      .pipe(
        tap(() => this.allMovies = null),
      )
      .subscribe((data: any) => {
          this.users = data;
        },
        (error: { error: { error_description: any } }) => {
          alert(error.error.error_description);
        }
      );
  }

  getAllMovies() {
    this.appService.getAllMovies()
      .pipe(
        tap(() => this.users = null),
      )
      .subscribe(
        (data: any) => {
          this.allMovies = data;
          },
        (error: { error: { error_description: any } }) => {
          alert(error.error.error_description);
        }
      );
  }

  addComment(user) {
    console.log(' user: ', user);
  }

  seeCommentsForMovie() {
    this.appService.getMovieComments().subscribe(
      (data: any) => {
        console.log(data);
        window.sessionStorage.setItem('allMovies', JSON.stringify(data));

        this.allMovies = data;

        console.log(this.allMovies);
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

  filterMovies() {

  }

  getAverageMarkForMovie() {
}

getAllCommentsForMovie()
{

}
}
