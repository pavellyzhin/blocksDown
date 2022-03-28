import { Injectable } from '@angular/core';
import { ActionService } from '../interfaces/action.service';
import { elementFullModel } from '../interfaces/iblock-model.model';
import { ManageActionService } from '../main-services/manage-action.service';

@Injectable({
  providedIn: 'root'
})
export class AttackMonsterService implements ActionService{

  public actionRoute: ManageActionService;

  constructor() { 
    
  }

  public default(obj: elementFullModel, target: elementFullModel): void {
      
  }

  public route(obj: elementFullModel, target: elementFullModel): void {
      
      switch(obj.type.entity.name){
        case 'weapon' : ''; break;
        default: this.default(obj,target); // кулачки
      }
  }
  
}
