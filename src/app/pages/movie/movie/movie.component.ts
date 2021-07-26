import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../../core/app.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  movie = '';
  commentAndName = {
    username : '',
    movie: '',
    comment: ''
  };
  public commentForm = new FormGroup({
    comment: new FormControl(),
  });

  ngOnInit(): void {
    this.movie = JSON.parse(window.sessionStorage.getItem('movieToShow'));
    this.commentForm.reset();
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }
    // create call to movie service and add comment to DB
    this.commentAndName.comment = this.commentForm.controls.comment.value;
    this.commentAndName.username = sessionStorage.getItem('username');
    this.commentAndName.movie = sessionStorage.getItem('movieToShow');
    this.appService.giveComment(this.commentAndName).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: { error: { error_description: any } }) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}
