import { Injectable } from '@angular/core';
import { ActionService } from '../interfaces/action.service';
import { elementFullModel } from '../interfaces/iblock-model.model';
import { ManageActionService } from '../main-services/manage-action.service';

@Injectable({
  providedIn: 'root'
})
export class AttackPlayerService implements ActionService {

  public actionRoute: ManageActionService;

  constructor() {
    
   }

   public default(obj: elementFullModel, target: elementFullModel): void {
      this.actionRoute.route([],obj,target);
   }

   public route(obj: elementFullModel, target: elementFullModel): void {
       
      switch(obj.properties.race){
        case 'elf' : ''; break;
        case 'human' : ''; break;
        default: this.default(obj,target);
      }
   }


}
