import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../../../core/app.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService,
  ) {}
  movie = '';
  public commentForm = new FormGroup({
    comment: new FormControl(),
  });

  newComment = '';

  ngOnInit(): void {
    this.movie =  JSON.parse(window.sessionStorage.getItem('movieToShow'));
    this.commentForm.reset();
  }

  commentMovie(newComment){
    if (this.commentForm.invalid) {
      return;
    }
    // create call to movie service and add comment to DB
    this.newComment = newComment.toString();

    const body = new HttpParams()
      .set('comment', this.newComment);

    this.appService.giveComment(body.toString()).subscribe(
      (data: any) => {
        window.sessionStorage.setItem('comm', JSON.stringify(data));
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );

    alert('clicked me!');
  }

}
