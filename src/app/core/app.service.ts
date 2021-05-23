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
      Authorization: 'Basic ' + btoa('mobile:root'),
      'Content-type': 'application/x-www-form-urlencoded',
    };
    return this.http.post(
      'http://localhost:8080/' + 'oauth/token',
      loginPayload,
      { headers }
    );
  }

  searchMovies(title: String, year: String){
    if (title === null && year === null) {
      return this.http.get('http://www.omdbapi.com/?');
    }
    else if (year === null){
    return this.http.get(
      'http://www.omdbapi.com/?apikey=afd86cfc&t=' +
      title,{
        responseType: 'json'});
    }
    else if (title === null) {
      return this.http.get(
        'http://www.omdbapi.com/?apikey=afd86cfc&y=' +
        year, {
          responseType: 'json'}
      );
 }
    else { return  this.http.get(
        'http://www.omdbapi.com/?apikey=afd86cfc&t=' +
        title +
        '&y=' + year, {
          responseType: 'json'});
 }
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
  getWelcome(path: String) {
    var endpoint = 'public';
    if (path === 'private') {
      endpoint = 'private';
    }
    return this.http.get('http://localhost:8080/' + endpoint, {
      responseType: 'json',
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
