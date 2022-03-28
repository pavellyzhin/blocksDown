import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { elementFullModel } from '../interfaces/iblock-model.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageTypesService } from './manage-types.service';
import { ManageActionlistsService } from './manage-actionlists.service';
@Injectable({
  providedIn: 'root'
})
export class ManageElementsService {

  public elements: elementFullModel[] = [];
  public elementsWait: Subject<any> = new Subject();
  public load: boolean = false;

  public types: ManageTypesService;
  public actions: ManageActionlistsService;
  

  constructor(
    private http:HttpClient
  ) { 
    this.elementsWait.subscribe((e) => {
      this.load = true;
      this.elements = e;
    });

    this.http.get('http://localhost:4200/assets/elements.json').subscribe((e) => {
      this.elementsWait.next(e);
    });
  }

  public getById(id:number){
    this.elements.filter((item:elementFullModel)=>item.entity.id==id)[0];
  }

  public getByTypeId(typeId:number){

  }
}
