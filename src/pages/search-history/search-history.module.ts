import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchHistoryPage } from './search-history';

@NgModule({
  declarations: [
    SearchHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchHistoryPage),
  ],
})
export class SearchHistoryPageModule {}
