import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

export class RoleUsername {
  username: string;
  role: string;
}
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public welcomeForm = new FormGroup({
    title: new FormControl(),
    year: new FormControl(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  namerole: RoleUsername;
  name = '';
  movie = '';

  items;
  ngOnInit(): void {
    this.welcomeForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      year: [''],
    });
    this.appService.getUser().subscribe(
      (data: any) => {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('role', data.role);
        if ()
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }

  onSubmit() {
    if (this.welcomeForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('movie', this.welcomeForm.controls.title.value)
      .set('year', this.welcomeForm.controls.year.value)
      .set('grant_type', 'password');
    this.appService
      .searchMovies(
        this.welcomeForm.controls.title.value,
        this.welcomeForm.controls.year.value
      )
      .subscribe(
        (data: any) => {
          this.movie = data;
          window.sessionStorage.setItem('movieToShow', JSON.stringify(data));

          this.items = new Map()
            .set('YEAR', data.Year)
            .set('TITLE', data.Title);
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
}
