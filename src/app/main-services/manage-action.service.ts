import { Injectable } from '@angular/core';
import { AttackService } from '../action-services/attack.service';
import { ActionService } from '../interfaces/action.service';
import { elementFullModel, typeCommunicPatternPatternStruct } from '../interfaces/iblock-model.model';
import { ManageActionlistsService } from './manage-actionlists.service';
import { ManageElementsService } from './manage-elements.service';
import { ManageSpellsService } from './manage-spells.service';
import { ManageTypesService } from './manage-types.service';

@Injectable({
  providedIn: 'root'
})
export class ManageActionService{

  public manageELements: ManageElementsService;
  public manageTypes: ManageTypesService;
  public manageActionLists: ManageActionlistsService;
  public manageSpells: ManageSpellsService;

  constructor(
    private attack: AttackService
  ) { 
    this.attack.actionRoute = this;
  }

  public default(obj: elementFullModel, target: elementFullModel): void {
      
  }

  public route(actionList:any[],obj: elementFullModel, target: elementFullModel): void {
      
    for(let i =0; i < actionList.length; i++){
      switch(actionList[i]){
        case 'go' : ''; break;
        case 'attack' : this.attack.route(obj,target); break;
      }
    }
  }

}
