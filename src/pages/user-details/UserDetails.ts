import { Component } from '@angular/core';
import { IonicPage, Events,NavController, NavParams } from 'ionic-angular';
import {HttpApiService} from '../../providers/http-api/http-api';
import {User} from '../../models/users';
import { FavouriteUsersProvider } from '../../providers/favourite-users';

import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
  providers:[FavouriteUsersProvider]
})
export class UserDetailsPage {
  userDetails={};
  userName:string;
  avtarUrl:any;
  private storedUsers=[];
  public inFavourites: string='false'; // Tried to do using boolean but some hindrances where coming while implementing it
  private login: string;
  private noAction: boolean=true;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpApi:HttpApiService,
    private favouriteUsersProvider: FavouriteUsersProvider,
   
    private loadingProvider: LoadingProvider,
    private toastProvider:ToastProvider,
    private events:Events) {
    this.userName=navParams.get('login');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
    this.favouriteUsersProvider.load().subscribe(
      (users) => {
        this.storedUsers = users;
        console.log(this.storedUsers);
        for(var i=0;i<this.storedUsers.length;i++){
            if(this.storedUsers[i].login === this.userName){
             // alert(this.storedUsers[i].isFav);
              this.inFavourites=this.storedUsers[i].isFav;
            //  alert(this.inFavourites);
            }
        }
        this.loadUserProfile();
      },
      (error) => {
        this.toastProvider.error('Error occured.');
      }
    );
    
  }
  private loadUserProfile(){
    this.loadingProvider.show();
    this.httpApi.userDetails(this.userName).subscribe(users=>{
      this.userDetails=users;
      this.loadingProvider.hide();
    });
  }
  public addToFavourites(login: string, avatarUrl: string) {
    this.favouriteUsersProvider.add(login, avatarUrl, "true", "true").subscribe(() => {
      this.inFavourites = "true";
      this.publishFavouriteUsersRefreshEvent();
      this.toastProvider.info('User added to favourites.');
    });
  }

  public removeFromFavourites(login: string) {
    this.favouriteUsersProvider.update(login).subscribe(() => {
      this.inFavourites = "false";
      this.noAction=false;
      this.publishFavouriteUsersRefreshEvent();
      //this.toastProvider.info('User removed from favourites.');
    });
  }
  ionViewDidLeave(){
    if((this.inFavourites === 'false') && (this.noAction)){
      this.favouriteUsersProvider.add(this.userName, this.userDetails['avatar_url'], "false", "true").subscribe(() => {
        //this.inFavourites = true;
        this.publishFavouriteUsersRefreshEvent();
        //this.toastProvider.info('User added to favourites.');
      });
    }
  }
  private publishFavouriteUsersRefreshEvent() {
    this.events.publish('favourite-users:refresh');
  }


}
