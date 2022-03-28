import { ManageActionService } from "../main-services/manage-action.service";

export class ActionInterface {

    public actionRoute: ManageActionService;
    public obj: {};
    public target: {};

    constructor(){

    }

    public please(obj:{},target:{}){

    }

    public route(actions:any[],obj:{},target:{}){
        switch(actions[0]){
            default: this.please(obj,target);
        }
    }
}