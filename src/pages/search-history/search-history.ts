import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, FabContainer } from 'ionic-angular';

import {UserHistory} from '../../models/history';

import {UserDetailsPage} from '../user-details/UserDetails';

import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';
import { FavouriteUsersProvider } from '../../providers/favourite-users';

/**
 * Generated class for the SearchHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-history',
  templateUrl: 'search-history.html',
})
export class SearchHistoryPage {

  public users: UserHistory[];
  public usersCopy: UserHistory[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private favouriteUsersProvider: FavouriteUsersProvider, 
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private events: Events) 
    {
      this.events.subscribe('favourite-users:refresh', () => {
        this.fetchFavouriteUsers();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchHistoryPage');
    this.loadfavouriteUsers();
  }
  public goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  private loadfavouriteUsers() {
    this.loadingProvider.show().then(() => {
      this.fetchFavouriteUsers(this.loadingProvider);
    });
  }

  clearHistory(){
    this.favouriteUsersProvider.deleteAll();
    this.users=[];
  }
  private fetchFavouriteUsers(loading = null) {
    this.favouriteUsersProvider.load().finally(
      () => {
        loading && loading.hide();
      }
    ).subscribe(
      (users) => {
        this.users = users;
        this.usersCopy=users;
        console.log(this.users);
      },
      (error) => {
        this.toastProvider.error('Error occured.');
      }
    );
  }
  sortByName(fab: FabContainer){
    this.users=this.usersCopy;
    this.users.sort(function(a, b){
      var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
     fab.close();
  }
  sortByFav(fab: FabContainer){
    this.users=this.usersCopy;
    var favArray=[];
    for(var i=0;i<this.users.length;i++){
      var value=JSON.parse(this.users[i].isFav.toString());
      console.log(value);
           if(value){
              favArray.push(this.users[i]);
           }
    }
    this.users=favArray;
    fab.close();
   
  }

}
