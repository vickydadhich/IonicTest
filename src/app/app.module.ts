import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

import { GitUsersPage} from '../pages/git-users/git-users';
import { UserDetailsPage } from '../pages/user-details/UserDetails';
import { SearchHistoryPage} from '../pages/search-history/search-history';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpApiService } from '../providers/http-api/http-api';
import { HttpModule } from '@angular/http';

import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { FavouriteUsersProvider } from '../providers/favourite-users';


@NgModule({
  declarations: [
    MyApp,
    GitUsersPage,
    UserDetailsPage,
    SearchHistoryPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GitUsersPage,
    SearchHistoryPage,
    UserDetailsPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpApiService,
    LoadingProvider,
    ToastProvider, 
    FavouriteUsersProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
