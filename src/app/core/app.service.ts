import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {RegisterUser} from '../model/registerUser';
import {tap} from 'rxjs/operators';
import {RoleUsername} from './service-config';
import {Movie, UserData} from '../pages/welcome/welcome.component';
@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:8080/users/';

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

  getUser() {
    const endpoint =
      'user/me?access_token=' +
      JSON.parse(window.sessionStorage.getItem('token')).access_token;
    const base = 'http://localhost:8080/';
    const url = base + endpoint;
    return this.http.get(url, {
      responseType: 'json',
    });
  }

  getAllMovies(): Observable<Movie[]>{
    /*    const endpoint =
          'users?access_token=' +
          JSON.parse(window.sessionStorage.getItem('token')).access_token;*/
    const endpoint = 'allMovies';
    const base = 'http://localhost:8088/';
    const url = base + endpoint;
    return this.http.get<Movie[]>(url, {
      responseType: 'json',
    })
    .pipe(
      tap(x => console.log('getMovies, x:', x))
    );
  }
  public getUsers(): Observable<UserData[]> {
    const endpoint =
      'users?access_token=' +
      JSON.parse(window.sessionStorage.getItem('token')).access_token;
    const base = 'http://localhost:8080/';
    const url = base + endpoint;
    return this.http.get<UserData[]>(url, {
      responseType: 'json',
    })
    .pipe(
      tap(x => console.log('getUsers, x:', x))
    );
  }

  searchMovieOmdbApi(title, year) {
    if (title === null && year === null) {
      return this.http.get('http://www.omdbapi.com/?');
    } else if (year === null) {
      return this.http.get(
        'http://www.omdbapi.com/?apikey=afd86cfc&t=' + title,
        {
          responseType: 'json',
        }
      );
    } else if (title === null) {
      return this.http.get(
        'http://www.omdbapi.com/?apikey=afd86cfc&y=' + year,
        {
          responseType: 'json',
        }
      );
    } else {
      return this.http.get(
        'http://www.omdbapi.com/?apikey=afd86cfc&t=' + title + '&y=' + year,
        {
          responseType: 'json',
        }
      );
    }
  }

  giveComment(commName) {
    const headers = { 'content-type': 'application/json' };
    return this.http.post('http://localhost:8088/comment', commName, {
      headers,
      responseType: 'text',
    });
  }


  getTest(path: String) {
    let endpoint = 'public';
    if (path === 'private') {
      endpoint = 'private';
    }
    return this.http.get('http://localhost:8088/' + endpoint, {
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

  register(registerUser: RegisterUser) {
    return this.http.post('http://localhost:8080/user/add', registerUser, {
      responseType: 'text',
    });
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



  getMovieComments() {
    const endpoint =
      '?movieTitle=' +
      JSON.parse(window.sessionStorage.getItem('token')).access_token;
    const base = 'http://localhost:8088/comments';
    const url = base + endpoint;
    return this.http.get(url, {
      responseType: 'json',
    });
  }


}
