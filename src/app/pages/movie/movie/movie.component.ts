import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../../../core/app.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie = '';
  public commentForm = new FormGroup({
    comment: new FormControl(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService,
  ) {}

  ngOnInit(): void {
    this.movie =  JSON.parse(window.sessionStorage.getItem('movieToShow'));
    this.commentForm.reset();
  }
  commentMovie(){
    //create call to movie service and add comment to DB
    this.commentForm.reset();
    alert('clicked me!');
  }

}
