import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {User} from '../../models/users';
import {UserDetailsPage} from '../user-details/UserDetails';

import {HttpApiService} from '../../providers/http-api/http-api';
import {LoadingProvider} from '../../providers/loading';
import {ToastProvider} from '../../providers/toast';
/**
 * Generated class for the GitUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-git-users',
  templateUrl: 'git-users.html',
})
export class GitUsersPage {

  users: User[];
  cachedUsers: User[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpApi:HttpApiService,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider) {

    /* httpApi.loadUsers().subscribe(users=>{
      this.users=users;
      this.cachedUsers = users;
      console.log(users);
    }) */
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GitUsersPage');
    this.users=[];
    this.cachedUsers=[];
  }

  showDetailPage(login:String){
      this.navCtrl.push(UserDetailsPage,{login});
  }
  onInput(event){
     let value = event.target.value
     //alert(value);
     if(value === undefined){
      this.users= this.cachedUsers;
     }else{
      
    if (value.trim() === '' || value.trim().length < 4) {
     
      this.users = this.cachedUsers;
    } else {
      this.loadingProvider.show();
      this.httpApi.searchUsers(value).subscribe(users => {
        this.users = users;
        this.loadingProvider.hide();
      });

    }
  }
  }
  onCancel(event){
    this.users= this.cachedUsers;
 }

}
