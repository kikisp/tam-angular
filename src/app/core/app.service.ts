import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:8080/users/';

  login(loginPayload: any) {
    const headers = {
      Authorization: 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded',
    };
    return this.http.post(
      'http://localhost:8080/' + 'oauth/token',
      loginPayload,
      { headers }
    );
  }

  getUsers() {
    return this.http.get(
      this.baseUrl +
        'user?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  getTest(path: String) {
    var endpoint = 'public';
    if (path === 'private') {
      endpoint = 'private';
    }
    return this.http.get('http://localhost:8080/' + endpoint, {
      responseType: 'text',
    });
  }

  getUserById(id: number) {
    return this.http.get(
      this.baseUrl +
        'user/' +
        id +
        '?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  createUser(user: User) {
    return this.http.post(
      this.baseUrl +
        'user?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token,
      user
    );
  }

  updateUser(user: User): Observable<Object> {
    return this.http.put(
      this.baseUrl +
        'user/' +
        user.id +
        '?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token,
      user
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      this.baseUrl +
        'user/' +
        id +
        '?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }
}
