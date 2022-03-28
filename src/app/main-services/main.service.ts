import { Injectable } from '@angular/core';
import { ManageActionService } from './manage-action.service';
import { ManageActionlistsService } from './manage-actionlists.service';
import { ManageElementsService } from './manage-elements.service';
import { ManageSpellsService } from './manage-spells.service';
import { ManageTypesService } from './manage-types.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private manageElements: ManageElementsService,
    private manageTypes: ManageTypesService,
    private manageActionLists: ManageActionlistsService,
    private manageSpells: ManageSpellsService,
    private manageAction: ManageActionService
  ) { 
    // точка входа
    let intervalId = setInterval(function(){
      if(manageElements.load && manageTypes.load && manageActionLists.load){
        clearInterval(intervalId);
        this.init();
        // все подгрузилось
      } else {
        // окно или надпись "Загрузка"
      }
    },200);
  }

  public init(){
    this.manageAction.manageActionLists = this.manageActionLists;
    this.manageAction.manageELements = this.manageElements;
    this.manageAction.manageTypes = this.manageTypes;
    this.manageAction.manageSpells = this.manageSpells;
  }
}
