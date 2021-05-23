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
  name = 'Korisnice';
  movie = '';
  movies: MovieEx[];
  title = '';
  year  = '';

  public welcomeForm = new FormGroup({
    title: new FormControl(),
    year: new FormControl(),
  });

  public movieDetailsForm = new FormControl();

  invalidLogin = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}
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


   this.appService.searchMovies(this.title.toString(), this.year.toString()).subscribe(
      (data: any) => {
        this.movie = data;
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }


  ngOnInit(): void {
    this.appService.getWelcome('public').subscribe(
      (data: any) => {
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }


  clickFunction() {
    alert("clicked me!");
  }

  isShown: boolean = false ; // hidden by default

  toggleShow() {
   // this.isShown = ! this.isShown;
    if(this.movie != null) this.isShown =true;
  }





}
