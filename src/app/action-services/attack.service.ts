import { Injectable } from '@angular/core';
import { AttackMonsterService } from '../action-type-services/attack-monster.service';
import { AttackPlayerService } from '../action-type-services/attack-player.service';
import { ActionService } from '../interfaces/action.service';
import { elementFullModel } from '../interfaces/iblock-model.model';
import { ManageActionService } from '../main-services/manage-action.service';

@Injectable({
  providedIn: 'root'
})
export class AttackService implements ActionService {

  public actionRoute: ManageActionService;

  constructor(
    private attackPlayer: AttackPlayerService,
    private attackMonster: AttackMonsterService
  ){
    this.attackPlayer.actionRoute = this.actionRoute;
    this.attackMonster.actionRoute = this.actionRoute;
  }

  public default(obj: elementFullModel, target: elementFullModel): void {
      // значени по Default
      // никакой анимации не проигрываем а просто вызываем actionRoute
      let item = this.actionRoute.manageELements.getById(1);
  }

  public route(obj: elementFullModel, target: elementFullModel): void {
      
    switch(obj.type.entity.name){
      case 'player'  : this.attackPlayer.route(obj,target); break; // пошли
      case 'monster' : this.attackMonster.route(obj,target); break; // разветвления
      default: this.default(obj,target);
    }
  }

}
