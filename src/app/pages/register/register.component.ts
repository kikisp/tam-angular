import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../../core/app.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({
    new_username: new FormControl(),
    new_email: new FormControl(),
    new_password: new FormControl(),
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  successMessage = '';
  registerUser = {
    username : '',
    email: '',
    password: ''
  };

  ngOnInit(): void {
    window.sessionStorage.clear();
    this.registerUser.username = '';
    this.registerUser.email = '';
    this.registerUser.password = '';
    this.registerForm = this.formBuilder.group({
      new_username: ['', Validators.compose([Validators.required])],
      new_email: ['', Validators.required],
      new_password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerUser.username = this.registerForm.controls.new_username.value;
    this.registerUser.email = this.registerForm.controls.new_email.value;
    this.registerUser.password = this.registerForm.controls.new_password.value;

    this.appService.register(this.registerUser).subscribe(
      (data: any) => {
       // window.sessionStorage.setItem('token', JSON.stringify(data)); // token je set u session storage
        // console.log(window.sessionStorage.getItem('token'));
       // this.router.navigate(['welcome']);
        // window.sessionStorage.setItem('storageSuccessMessage', data);
        this.successMessage = data;
        this.registerUser.username = '';
        this.registerUser.email = '';
        this.registerUser.password = '';
        // console.log(data);
      }
    );
  }

}
