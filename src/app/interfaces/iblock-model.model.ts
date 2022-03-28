export class elementModel {
    public  id: number;
    public hook: number;
    public type: number;
}

export class elementShortModel {
    public entity: elementModel = new elementModel();
    public hook: elementModel = new elementModel();
    public type: typeShortModel = new typeShortModel();
    public properties: propertyModel[];
}

export class elementFullModel {
    public entity: elementModel = new elementModel();
    public hook: elementShortModel = new elementShortModel();
    public type: typeShortModel = new typeShortModel();
    public child: elementFullModel[] = [];
    public properties: any = {};
}

export class metaModel {
    public hook: number;
    public title: string;
    public keywords: string;
    public description: string;
}

export class typeShortModel {
    public  entity: typeModel = new typeModel();
    public typeType: typeTypeModel[] = [];
    public typeProperty: typePropertyModel[] = [];
    public typePropertyValue: typePropertyValueModel[] = [];
}

export class typeModel {
    public id: number|null;
    public title: string|null;
    public name: string|null;
    public basic: boolean

  
}

export class typeTypeModel{
    public   hook: number;
    public type: number;
}

export class typeTypeShortModel{
    public hook: typeModel = new typeModel();
    public type: typeModel = new typeModel();

}

export class typePropertyModel{
    public hook: number;
    public property: number;
}


export class typePropertyValueModel{
    public hook: number;
    public property: number;
    public value:number;
}
export class propertyModel{
    public id: number|null;
    public title: string|null;
    public name: string|null;
    

    constructor(obj:{id:number|null,title:string|null,name:string|null} = {id:null,title:null,name:null}){
        this.id = (obj.id) ? obj.id : null;
        this.title = (obj.title) ? obj.title : null;
        this.name = (obj.name) ? obj.name : null;
    
    }
}

export class valueModel {
    public id: number|null;
    public title: string|null;
    public name: string|null;

    constructor(obj:{id:number|null,title:string|null,name:string|null} = {id:null,title:null,name:null}){
        this.id    = (obj.id)    ? obj.id    : null ;
        this.title = (obj.title) ? obj.title : null ;
        this.name  = (obj.name)  ? obj.name  : null ;
    }
}

export class postRequestModel {
    public success: boolean;
    public data: any;
    public errors: {key:string,message:string}[];
}

export class postResponceModel {
    public key: string;
    public action:string;
    public data: {};
}

export class communicModel {
    public id?: number;
    public hook?: number;
    public target?: number;
    public pattern?: number;
    public type?: number;
}

export class patternCommunicModel{
    public id: number|null;
    public title: string|null;
    public name: string|null;
    
    constructor(obj:{id:number|null,title:string|null,name:string|null} = {id:null,title:null,name:null}){
        this.id = (obj.id) ? obj.id : null;
        this.title = (obj.title) ? obj.title : null;
        this.name = (obj.name) ? obj.name : null;
    
    }
}

export class typeCommpatternTypeModel {
    public hook: number;
    public pattern:number;
    public type: number;
    
}

export class propertyContentModel{
    public content: string;
    public hook: number;
}

export class propertyVideoModel {
    public url: string;
    public hook: number;
    public type?:number;
}

export class propertyImageModel{
    public path: string;
    public hook: number;
    public file?: File;
}

export class propertyCoordinateModel {
    public id?:number;
    public hook:number;
    public x:number =0;
    public y:number =0;
    public z:number =0;
}

export class propertyDateModel {
    public id?:number;
    public hook: number;
    public year: number = 0;
    public month: number = 0;
    public day: number = 0;
    public hour: number = 0;
    public minute: number = 0;
    public second?: number = 0;
}


export class typeCommunicPatternPattern {
    public type: number;
    public communicPattern: number;
    public pattern: number;
    
}

export class typeCommunicPatternPatternStruct {
    public list: {}[];

}