import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class FavouriteUsersProvider {
  constructor(private storage: Storage) {}

  public load(): Observable<any> {
    return Observable.fromPromise(this.storage.get('users').then((users) => users || []));
  }

  public add(login: string, avatarUrl: string, isFav:any, inStack:any): Observable<any> {
    return this.load().flatMap(
      (users) => {
        users = users ? users : [];
        if(users.length>0){
          for(var i=0;i<users.length;i++){
               if(users[i].login === login){
                 users[i].isFav=isFav;
                 users[i].inStack=inStack;
               }else if((users[i].login != login) && (i== users.length-1)){
                users.push({ login, avatar_url: avatarUrl, isFav,inStack});
               }
          }
        }else{
          users.push({ login, avatar_url: avatarUrl, isFav,inStack});
        }

        return Observable.fromPromise(this.storage.set('users', users));
      }
    )
  }

  public update(login: string): Observable<any> {
    return this.load().flatMap((users) => {
      for (var i = 0; i < users.length; i++) {
        if (users[i].login === login) {
          users[i].isFav="false";
          users[i].inStack ="true";
          break;
        }
      }
      return Observable.fromPromise(this.storage.set('users', users));
    });
  }

  public count(): Observable<any> {
    return this.load().map(
      (users) => {
        return users.length;
      }
    );
  }
  public deleteAll(){
   this.storage.clear();
  }
}
