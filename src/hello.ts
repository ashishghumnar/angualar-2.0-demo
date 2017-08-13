import { Component, View ,DynamicComponentLoader , ElementRef ,ComponentRef   } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {citiesData} from './mock-cities';
import {CityService} from './cityService';
import {Http, Headers , HTTP_PROVIDERS} from 'angular2/http';
import {PersonClass} from './person'
import {ChildComponent} from './modal';
import {ModalService} from './modalService'

@Component({
    selector: 'hello-app',
    providers: [CityService, PersonClass  , ChildComponent ],
})

@View({
     template: `
        <div class="container-fluid">
            <div class="jumbotron">
                <h1>Futurism Angular 2.0 Demo</h1>
            </div>
        <hr>

        <button (click)="openModal()" class="btn btn-primary">OpenPopUp</button>
         <button (click)="postName()" class="btn btn-primary">Post to Server</button>
         <button (click)="getData()" class="btn btn-primary">Get Data</button>
         <hr>
            <div class="">Data Enter From Pop Up will Be here..</div>
            <div class="header">{{modalData}}</div>
            <div #child></div>

       </div>
          `,
    directives: [],
})

export class HelloApp {

    modalData: string = '';
    city:string = 'Pune';
    selected:string = 'audi';
    mobileNumber:number;
    empId:string;
    data:any;
    childComp:any;
    popUpData:string;


    constructor( public cityService:CityService, public personObj:PersonClass , public modalService : ModalService ,public elementRef : ElementRef ){

        this.mobileNumber= 123;
        this.empId = 1234;
        this.data = citiesData;
        this.cityService.setCity(this.city);
        personObj.setAttributes({'name' : 'ashish', 'lastName' :'ghumnar', 'address' :'Pune'});

    }

    /**
     * Post Data To Server
     */

    postName(){

        var data= {
            'name':'ashish'
        };

        var dataToSend = JSON.stringify(data);
        this.cityService.postData('http://localhost:4000/formData',dataToSend).subscribe(
            next => console.log(next._body),
            error => console.log(error),
            completed => console.log("Completed Request")
        );

    }

    /**
     * Get Server Data
     */
    getData(){

        var dataToSend = JSON.stringify(this.personObj);
        console.log(this.personObj);
        this.cityService.getData('http://localhost:4000/name',dataToSend).subscribe(
            next => console.log(next._body),
            error => console.log(error),
            completed => console.log("completed")
        )

    }

    /**
     * Open Modal
     * @params : ChildComponent:Modal Component ,  elementRef : Current Page Reference , 'child': Container Name where pop up will load
     *
     */
    openModal(){

         var modalPromise =  this.modalService.openPopUp(ChildComponent, this.elementRef , 'child')
         modalPromise.then(modalData => {
             this.modalData = JSON.stringify(modalData);

         });

    }



}

bootstrap(HelloApp,[HTTP_PROVIDERS , ModalService]);