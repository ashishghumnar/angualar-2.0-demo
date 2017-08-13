import {Http, Headers , HTTP_PROVIDERS , Request, RequestMethod ,RequestOptions } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

@Injectable()
export class CityService{

    cityName:string;

    constructor(public http:Http){

    }

    getCity(){
        return this.cityName;
    }

    setCity(name){
        this.cityName = name;

    }
    postData(url:string,data:any){

        var header =  new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');

        var respdata =  this.http.post(url,data ,{
            headers:header
        });

        //filter data before send to subscriber
        //respdata.forEach(data => console.log("data::",data),ara=>console.log("eerro",ara),pro => console.log("pro::"+pro));

         return respdata;
    }

    getData(url:string,data:any){

        var headers =  new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        var options = new RequestOptions({
            method: RequestMethod.Get,
            headers : headers,
            body:data,
            url:url,
            search:'13'
        });

        var req = new Request(options);
        var respdata = this.http.request(req);
        //filter data before send to subscriber
        //respdata.forEach(data => console.log("data::",data),ara=>console.log("eerro",ara),pro => console.log("pro::"+pro));
        return respdata;
    }

    private logAndPassOn (error: Error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);

    }


}