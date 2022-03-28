import { AnimateTimings } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ManageActionService } from '../main-services/manage-action.service';
import { elementFullModel } from './iblock-model.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  public actionRoute: ManageActionService;
  
  constructor() { }

  public default(obj:elementFullModel,target:elementFullModel):void {
    // выполняем какое-то действие
  }

  public route(obj:elementFullModel,target:elementFullModel):void {

    switch("asd"){
      default: this.default(obj,target);
    }
  }

}
