import { Component, OnInit } from '@angular/core';
import {AppService} from '../../core/app.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';


interface MovieEx {

  Title: String;

  Year: String;

}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}
  name = '';
  movie = '';
  movies: MovieEx[];
  title = '';
  year  = '';
  items = [];

  public welcomeForm = new FormGroup({
    title: new FormControl(),
    year: new FormControl(),
  });


  invalidLogin = false;

  onSubmit() {
   if (this.welcomeForm.invalid) {
      return;
    }
   const body = new HttpParams()
      .set('movie', this.welcomeForm.controls.title.value)
      .set('year', this.welcomeForm.controls.year.value)
      .set('grant_type', 'password');
   this.title = this.welcomeForm.controls.title.value;
   this.year = this.welcomeForm.controls.year.value;

   this.appService.searchMovies(this.title, this.year).subscribe(
      (data: any) => {
        this.movie = data;
        window.sessionStorage.setItem('movieToShow', JSON.stringify(this.movie));
        // for(let key in data)
         // if(data.hasOwnProperty(key))
        this.items.push(data.Title);
        this.items.push(data.Year);


      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }


  ngOnInit(): void {
    this.appService.getUser().subscribe(
      (data: any) => {
        this.name = data;

      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }


  clickFunction() {
    // ovde treba da budemo prosledjeni na movie.html gde ce se prikazati svi detalji o filmu

    this.router.navigate(['movie']);

    // alert('clicked me!');
  }

/*  isShown: boolean = false ; // hidden by default

  toggleShow() {
   // this.isShown = ! this.isShown;
    if(this.movie != null) this.isShown =true;
  }*/





}
