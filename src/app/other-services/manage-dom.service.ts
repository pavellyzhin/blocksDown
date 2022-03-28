import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ManageActionCollectionService } from '../action-services/manage-action-collection.service';

@Injectable({
  providedIn: 'root'
})
export class ManageDOMService {

  // тут то, внутри чего мы будет создавать элементы 
  public DOM: NodeListOf<HTMLDivElement>;
  public waitDom: any = new Subject();
  public actionRoute: ManageActionCollectionService;


  constructor() { 
    this.init();
  }

  // нужно будет прокидывать в DOM новые эелменты,
  // а которыми будет привязан объект
  public init(){
    let a = this;
   
    window.onload = function(){
      a.allElements();
      
    }
  }

  public allElements(){
    this.waitDom.subscribe((e:NodeListOf<HTMLDivElement>)=>{
      this.DOM = e;
    });

    this.waitDom.next(document.querySelectorAll('div.obj'));
    
  }

  public addELement(){
    // создаем новый DIV, который полетит вниз
    // задаем ему атрибуты и закидываем в DOM - коллекцию обрабатываемых элементов.
    
    
    let div = document.createElement('div');
    div.className = 'obj';
    div.style.position = 'absolute';
    div.style.left = Math.floor(Math.random() * 670) + 'px';
    div.textContent = Math.floor(Math.random() * 15)+'';
    div.style.top = "0px";
    div.style.lineHeight = "30px";
    div.style.width = "30px";
    div.style.height = "30px";
   
    div.style.textAlign = "center";
    div.style.fontSize = "18px";
    div.style.verticalAlign = "middle";
    div.style.border = "1px solid black";

    let container = document.querySelector('div#container');
    container.appendChild(div);
    this.actionRoute.actionRoute(this.actionRoute.ActionList.appear,div,div);
  }

  public setCoordinate(obj:HTMLDivElement,x,y){
    // хорошо, если каждый элемент будет содержать в себе этот метод
    //parseInt(obj.style.left.replace('px',''));
    obj.style.left = x + 'px';
    obj.style.top = y + 'px';
  }

  public changeCoordinate(obj:HTMLDivElement,x,y){
    let left = (parseInt(obj.style.left.replace('px','')) ) ? parseInt(obj.style.left.replace('px',''))  : 0;
    let top = (parseInt(obj.style.top.replace('px','')) ) ? parseInt(obj.style.top.replace('px',''))  : 0;

    obj.style.left = left + x + 'px';
    obj.style.top = top + y + 'px';
  }

  public join(obj:HTMLDivElement,target:HTMLDivElement){
    
    let list = document.querySelector('div#container');
    if(!this.isset(obj)){
      return;
    }

    

    if(parseInt(obj.textContent) > parseInt(target.textContent)){
      obj.textContent = (parseInt(obj.textContent) + parseInt(target.textContent)) + '';
      if(this.bColorEqually(obj,target)) {
        this.actionRoute.actionRoute(this.actionRoute.ActionList.Equally,obj,obj);
      }
      list.removeChild(target);
    }else{
      if(parseInt(obj.textContent) > parseInt(target.textContent)){
        this.actionRoute.actionRoute(this.actionRoute.ActionList.Equally,target,target);
      }
      if(this.bColorEqually(obj,target)) {
        this.actionRoute.actionRoute(this.actionRoute.ActionList.Equally,target,target);
      }
      target.textContent = (parseInt(obj.textContent) + parseInt(target.textContent)) + '';
      list.removeChild(obj);
    }
    
  }

  public bColorEqually(obj:HTMLDivElement,target:HTMLDivElement){
    return (obj.style.backgroundColor == target.style.backgroundColor);
  }

  public reColor(obj){
    let color: string[] = ['red','green','blue','purple','white','yellow','pink','gold','grey','orange'];
    obj.style.backgroundColor = color[Math.floor(Math.random() * (color.length-1))];
  }

  public communic(obj){
    
    let list: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.obj');
    let t = this;
    
    let intervalId = setInterval(function(){
      
      for(let i =0; i < list.length; i++){
        let target = list[i];
       
          if((t.objRightBottomAngleInTarget(obj,target)
          || t.objLeftBottomAngleInTarget(obj,target))
          
          || (t.objLeftEquallyTargetLeft(obj,target) && t.objBottomBelowTargetTop(obj,target))
            && target != obj) {
                // с чем то соприкоснулись
                
                clearInterval(intervalId);
                t.actionRoute.actionRoute(t.actionRoute.ActionList.communic,obj,target);
            } else {

            }

        }
    });
    
  }

  public isset(obj):boolean{
    let list: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.obj');

    for(let i =0; i < list.length;i++){
      if(list[i] != obj){
        if(i+1 == list.length){
          return false;
        }
      }else{
        return true;
      }
    }
  }

  private objRightBottomAngleInTarget(obj,target){
    return (
        this.objRightRightTargetLeft(obj,target) 
        && this.objRightLeftTargetRight(obj,target)
        && this.objLeftLeftTargetLeft(obj,target)
        && this.objLeftLeftTargetRight(obj,target)
        && this.objBottomBelowTargetTop(obj,target)
        && this.objBottomHeigerTargetBottom(obj,target)
        && this.objTopHeigerTargetTop(obj,target)
        && this.objTopHeigerTargetBottom(obj,target)
        );
  }
  private objRightTopAngleInTarget(obj,target){
    return (
      this.objTopBelowTargetTop(obj,target)
        && this.objTopHeigerTargetBottom(obj,target)
        && this.objBottomBelowTargetBottom(obj,target)
        && this.objBottomBelowTargetTop(obj,target)
        && this.objLeftLeftTargetLeft(obj,target)
        && this.objLeftLeftTargetRight(obj,target)
        && this.objRightLeftTargetRight(obj,target)
        && this.objRightRightTargetLeft(obj,target)
    );
  }
  private objLeftTopAngleInTarget(obj,target){
    return (
      this.objTopBelowTargetTop(obj,target)
        && this.objTopHeigerTargetBottom(obj,target)
        && this.objBottomBelowTargetTop(obj,target)
        && this.objBottomBelowTargetBottom(obj,target)
        && this.objLeftLeftTargetRight(obj,target)
        && this.objLeftRightTargetLeft(obj,target)
        && this.objRightRightTargetLeft(obj,target)
        && this.objRightRightTargetRight(obj,target)
    );
  }
  private objLeftBottomAngleInTarget(obj,target){
  
  ////////////////////////////////////////////////
  
    return (
      this.objLeftLeftTargetRight(obj,target)
        && this.objLeftRightTargetLeft(obj,target)
        && this.objRightRightTargetRight(obj,target)
        && this.objRightRightTargetLeft(obj,target)
        && this.objTopHeigerTargetTop(obj,target)
        && this.objTopHeigerTargetBottom(obj,target)
        && this.objBottomHeigerTargetBottom(obj,target)
        && this.objBottomBelowTargetTop(obj,target)
    );
  }

          ////// SIDES   //////
  ///////////////// EQUALLY ////////////////////
  private objBottomEquallyTargetTop(obj,target){
    return (parseInt(obj.style.top.replace('px','')) + parseInt(obj.style.height.replace('px',''))
        == 
        parseInt(target.style.top.replace('px',''))
    );
  }
  private objBottomEquallyTargetBottom(obj,target){
    return (parseInt(obj.style.top.replace('px','')) + parseInt(obj.style.height.replace('px',''))
        == 
        parseInt(target.style.top.replace('px','')) + parseInt(target.style.height.replace('px',''))
    );
  }
  private objTopEquallyTargetTop(obj,target){
    return (parseInt(obj.style.top.replace('px',''))
        == 
        parseInt(target.style.top.replace('px',''))
    );
  }
  private objTopEquallyTargetBottom(obj,target){
    
    return (parseInt(obj.style.top.replace('px',''))
        == 
        parseInt(target.style.top.replace('px','')) + parseInt(target.style.height.replace('px',''))
    );
  }
  private objLeftEquallyTargetLeft(obj,target){
    return (parseInt(obj.style.left.replace('px',''))
        == 
        parseInt(target.style.left.replace('px',''))
    );
  }
  private objLeftEquallyTargetRight(obj,target){
    return (parseInt(obj.style.left.replace('px',''))
        == 
        parseInt(target.style.left.replace('px','')) + parseInt(target.style.width.replace('px',''))
    );
  }
  private objRightEquallyTargetRight(obj,target){
    return (parseInt(obj.style.left.replace('px','')) + parseInt(obj.style.width.replace('px',''))
        == 
        parseInt(target.style.left.replace('px','')) + parseInt(target.style.width.replace('px',''))
    );
  }
  private objRightEquallyTargetLeft(obj,target){
    return (parseInt(obj.style.left.replace('px',''))  + parseInt(obj.style.width.replace('px',''))
        == 
        parseInt(target.style.left.replace('px','')) 
    );
  }
  /// LEFT RIGHT BELOW HEIGER ///
  private objBottomBelowTargetTop(obj,target){
    return (parseInt(obj.style.top.replace('px','')) + parseInt(obj.style.height.replace('px','')) 
        >
        parseInt(target.style.top.replace('px','')));
  }
  private objBottomHeigerTargetTop(obj,target){
    
    return (parseInt(obj.style.top.replace('px','')) + parseInt(obj.style.height.replace('px','')) 
        <
        parseInt(target.style.top.replace('px','')));
  }
  private objBottomBelowTargetBottom(obj,target){
    return (parseInt(obj.style.top.replace('px','')) + parseInt(obj.style.height.replace('px','')) 
        >
        parseInt(target.style.top.replace('px','')) + parseInt(target.style.height.replace('px','')));
  }
  private objBottomHeigerTargetBottom(obj,target){
    return (parseInt(obj.style.top.replace('px','')) + parseInt(obj.style.height.replace('px','')) 
        <
        parseInt(target.style.top.replace('px','')) + parseInt(target.style.height.replace('px','')));
  }
  private objTopBelowTargetTop(obj,target){
    return (parseInt(obj.style.top.replace('px',''))
        >
        parseInt(target.style.top.replace('px','')));
  }
  private objTopHeigerTargetTop(obj,target){
    return (parseInt(obj.style.top.replace('px',''))
        <
        parseInt(target.style.top.replace('px','')));
  }
  private objTopBelowTargetBottom(obj,target){
    return (parseInt(obj.style.top.replace('px',''))
        >
        parseInt(target.style.top.replace('px','')) + parseInt(target.style.height.replace('px','')));
  }
  private objTopHeigerTargetBottom(obj,target){
    return (parseInt(obj.style.top.replace('px',''))
        <
        parseInt(target.style.top.replace('px','')) + parseInt(target.style.height.replace('px','')));
  }			
  private objLeftLeftTargetLeft(obj,target){
    return (parseInt(obj.style.left.replace('px',''))
        <
        parseInt(target.style.left.replace('px','')));
  }
  private objLeftRightTargetLeft(obj,target){
    return (parseInt(obj.style.left.replace('px',''))
        >
        parseInt(target.style.left.replace('px','')));
  }
  private objLeftLeftTargetRight(obj,target){
    return (parseInt(obj.style.left.replace('px',''))
        <=
        parseInt(target.style.left.replace('px','')) + parseInt(target.style.width.replace('px','')));
  }
  private objLeftRightTargetRight(obj,target){
    return (parseInt(obj.style.left.replace('px',''))
        >
        parseInt(target.style.left.replace('px','')) + parseInt(target.style.width.replace('px','')));
  }
  private objRightLeftTargetLeft(obj,target){
    return (parseInt(obj.style.left.replace('px','')) + parseInt(obj.style.width.replace('px',''))
        <
        parseInt(target.style.left.replace('px','')));
  }
  private objRightRightTargetLeft(obj,target){
    return (parseInt(obj.style.left.replace('px','')) + parseInt(obj.style.width.replace('px',''))
        >
        parseInt(target.style.left.replace('px','')));
  }
  private objRightLeftTargetRight(obj,target){
    return (parseInt(obj.style.left.replace('px','')) + parseInt(obj.style.width.replace('px',''))
        <
        parseInt(target.style.left.replace('px','')) + parseInt(target.style.width.replace('px','')));
  }
  private objRightRightTargetRight(obj,target){
    return (parseInt(obj.style.left.replace('px','')) + parseInt(obj.style.width.replace('px',''))
        >
        parseInt(target.style.left.replace('px','')) + parseInt(target.style.width.replace('px','')));
  }
  /// FROM ///
  private fromLeft(obj,target){
    return (
      this.objRightLeftTargetLeft(obj,target)
        && this.objRightLeftTargetRight(obj,target)
    );
  }
  private fromRight(obj,target){
    return (
      this.objLeftRightTargetRight(obj,target)
        && this.objRightRightTargetRight(obj,target)
    );
  }
  private fromTop(obj,target){
    return (
      this.objTopHeigerTargetTop(obj,target)
        && this.objBottomHeigerTargetTop(obj,target)
    );
  }
  private fromBottom(obj,target){
    return (
      this.objBottomBelowTargetBottom(obj,target)
        && this.objTopBelowTargetBottom(obj,target)
    );
  }

}
