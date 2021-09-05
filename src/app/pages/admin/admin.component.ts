import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import {RoleUsername} from '../welcome/welcome.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {

  }
  users: RoleUsername[];


  ngOnInit(): void {
  }

  getUsers() {
    this.appService.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        window.sessionStorage.setItem('users', JSON.stringify(data));

        this.users = data;

        console.log(this.users);
        /*this.users = new Map()
          .set('username', data.username)
          .set('email', data.email)
          .set('role', data.role);*/
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }

  addNewUser() {

  }

  getMovies() {

  }

  changeUserRole() {

  }
}
