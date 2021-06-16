import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public commentForm = new FormGroup({
    comment: new FormControl(),
  });

  newComment: string = '';
  test = 'test';

  ngOnInit(): void {
    this.movie = JSON.parse(window.sessionStorage.getItem('movieToShow'));
    this.commentForm.reset();
  }

  commentMovie(newComment) {
    if (this.commentForm.invalid) {
      return;
    }
    // create call to movie service and add comment to DB

    this.appService.giveComment(this.newComment).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: { error: { error_description: any } }) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}
