import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { elementFullModel } from '../interfaces/iblock-model.model';

@Injectable({
  providedIn: 'root'
})
export class ManageSpellsService {

  public items: elementFullModel[] = [];
  public wait: Subject<elementFullModel[]> = new Subject();
  public load: boolean = false;

  constructor(
    private http: HttpClient
  ) { 
    this.wait.subscribe((e)=>{
      this.load = true;
      this.items = e;
    });

    this.http.get('http://localhost:4200/assets/spells.json').subscribe((e:elementFullModel[])=>{
      this.wait.next(e);
    }); 
  }



}
