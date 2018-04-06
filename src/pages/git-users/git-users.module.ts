import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GitUsersPage } from './git-users';

@NgModule({
  declarations: [
    GitUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(GitUsersPage),
  ],
})
export class GitUsersPageModule {}
