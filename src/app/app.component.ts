import { AfterViewInit, Component } from '@angular/core';
import { ManageActionCollectionService } from './action-services/manage-action-collection.service';
import { ManageMainService } from './main-services/manage-main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'game';

  constructor(
    private MainManage: ManageMainService
  ){
    this.MainManage.InitInnerInterval();
  }
  public addNew(){
    this.MainManage.addNew();
  }
  ngAfterViewInit(): void {
    
  }
}
