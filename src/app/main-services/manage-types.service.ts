import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { typeShortModel } from '../interfaces/iblock-model.model';

@Injectable({
  providedIn: 'root'
})
export class ManageTypesService {

  public types: typeShortModel[] = [];
  public typeWait: Subject<typeShortModel[]> = new Subject();
  public load:boolean = false;

  constructor(
    private http:HttpClient
  ) { 
    this.typeWait.subscribe((e)=>{
      this.load = true;
      this.types = e;
    });

    this.http.get('http://localhost:4200/assets/types.json').subscribe((e:typeShortModel[])=>{
      this.typeWait.next(e);
    });

  }

  public getByTypeId(typeId:number):typeShortModel{
    return this.types.filter((item:typeShortModel)=>item.entity.id==typeId)[0];
  }

  public getByTypeName(typeName:string):typeShortModel{
    return this.types.filter((item:typeShortModel)=>item.entity.name==typeName)[0];
  }
}
