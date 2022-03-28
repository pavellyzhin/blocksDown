import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageWorldService {

  public worldLaws: {
    gravity: number, // px/sec
    ground: number// px
  } = {gravity:1,ground:300}; // законы мира.
  // сервис управления миром.
  // в мире есть свои законы, например притяжения и здесь устанавливается или меняются значения
  // относительно которых существуют все элементы.

  constructor() { 
    this.init();
  }

  public init(){
    this.worldLaws.gravity = 1; // px/sec
    this.worldLaws.ground = 300;
  }
}
