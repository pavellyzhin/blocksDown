import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageActionlistsService {

  public load: boolean = false;
  public wait: Subject<any> = new Subject();
  public actionLists: [] = [];

  constructor(
    private http: HttpClient
  ) { 
    this.wait.subscribe((e)=>{
      this.load = true;
      this.actionLists = e;
    });

    this.http.get('http://localhost:4200/assets/actions.json').subscribe((e)=>{
      this.wait.next(e);
    })
  }
}
