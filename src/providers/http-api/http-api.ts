import { Http,Headers,RequestOptions} from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import{ User} from '../../models/users';

/*
  Generated class for the HttpApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpApiService {
  gitHubApiUrl = 'https://api.github.com';
  constructor(public http: Http) {
    console.log('Hello HttpApiProvider Provider');
  }
  loadUsers():Observable<User[]>{
    return this.http.get(`${this.gitHubApiUrl}/users`).map(res => <User[]>res.json());
  }
  userDetails(login: string): Observable<User> {
    return this.http.get(`${this.gitHubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }
  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.gitHubApiUrl}/search/users?q=${searchParam}`) 
      .map(res => <User[]>(res.json().items))
  }


}
