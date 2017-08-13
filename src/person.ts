interface  PersonInterface{
    name:string;
    lastName:string;
    address:string;
}

export class PersonClass implements  PersonInterface{

    name:string;
    lastName:string;
    address:string;

    constructor(){

    }
    setAttributes(personObj:PersonInterface){

        this.name = personObj.name || "";
        this.lastName = personObj.lastName || "";
        this.address = personObj.address || "";

    }

    getAttributes(){
        return this;
    }

};