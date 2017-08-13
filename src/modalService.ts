/****
 *
 * Modal Service To communicate from Parent To Child Modal
 *
 */

import { DynamicComponentLoader ,Injectable , Promise} from 'angular2/core';
import {PromiseWrapper} from 'angular2/src/facade/async';

@Injectable()
export  class  ModalService{
    componentRef:any ;
    private _resultDefered: any;

    /***
     *
     * @param dynamicComponentLoader
     */

    constructor( public dynamicComponentLoader:DynamicComponentLoader ){

    }

    /***
     *
     * @param ChildComponent
     * @param elementRef
     * @param parentSelector
     * @returns {Promise<R>|Promise<T>|p|webdriver.promise.Promise<T>|PromiseObservable.promise}
     */

    openPopUp(ChildComponent, elementRef , parentSelector):Promise {
        this._resultDefered = PromiseWrapper.completer();

        this.dynamicComponentLoader.loadIntoLocation( ChildComponent , elementRef , parentSelector ).then(compRef => {
          this.componentRef = compRef;
          console.log(compRef);
      });

    return this._resultDefered.promise;

    }

    /**
     *
     * @param modalData : Data Return From Modal
     * @returns {any|void} any
     */
    closePopUp(modalData):any{

        if(modalData !="" && modalData != null){

            this._resultDefered.resolve(modalData);

        }else{

            this._resultDefered.reject();

        }

       this.componentRef._dispose();
    }
}