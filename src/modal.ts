/*
* Modal Component
 */
import { Component, View , Injector , provide ,DynamicComponentLoader } from 'angular2/core';
import { ModalService }  from './modalService'

@Component({
    selector: 'child-component',
    providers:[]
})

@View({
    template: `
    <div class="modal-back"></div>
    <div class="modal-component">
        <div class="modal-component-body">
            <div class="modal-header">
                <h3 class="modal-title">Please Enter Your Detail..!</h3>
            </div>
            <div class="modal-body">

             <form role="form">
                <div class="form-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" name="firstName" [(ngModel)]="firstName" class="form-control" placeholder="Enter First Name" />
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" name="lastName" [(ngModel)]="lastName" class="form-control" placeholder="Enter Last Name"  />
                </div>
                <div class="form-group">
                    <label for="address">Address:</label>
                    <textarea type="text" name="address" [(ngModel)]="address" class="form-control" placeholder="Enter Your Address" ></textarea>
                </div>
             </form>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" type="button" (click)="ok($event)">OK</button>
                <button class="btn btn-warning" type="button" (click)="cancel()">Cancel</button>
            </div>

       </div>
    </div>
    `,
})

export class ChildComponent {

    modalProvider:ModalService;
    firstName:string;
    lastName:string;
    address:string;

    /***
     *
     * @param modalProvider
     */

   constructor(public modalProvider:ModalService){

    }

    /***
     *
     * @param $event
     */

    ok($event) {
        $event.stopPropagation();
       // var data = JSON.stringify();
       // console.log(data)
        this.modalProvider.closePopUp({'firstName':this.firstName,'lastName':this.lastName,'address':this.address});
    }

    /***
     *
     */
    cancel() {

         this.modalProvider.closePopUp();
      //  this.popup.closePopUp();
    }
}