/**
 * Created by balazs on 11/29/2016.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {PICS} from "./mock-pics";
import {instapic} from "./instapic";



@Injectable()
export class InstapicService {
    private url = 'IDE CIM';  // URL to web api

    constructor(private http: Http) { }

    /*getHeroes(): Promise<Hero[]> {
     return this.http.get(this.heroesUrl)
     .toPromise()
     .then(response => response.json() as Hero[])
     .catch(this.handleError);
     }*/
    getPics(tag): Promise<instapic[]> {
      return this.http.get("/api/tag/"+tag)
        .toPromise()
        .then(response => response.json() as instapic[])
        .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
