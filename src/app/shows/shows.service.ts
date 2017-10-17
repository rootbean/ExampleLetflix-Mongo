import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions, RequestMethod ,Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { URL_GLOBAL } from '../config/constants';

@Injectable()
export class ShowsService {

  private _url : string;
  headers: Headers;
  options: RequestOptions;

  constructor(private _http : Http) {
    this._url = `${URL_GLOBAL.url}/shows`;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /**
   * Return shows
   */
  findAll() : Observable <any>{
      return this
      ._http
      .get(this._url)
      .map((result : Response) => {
        return result.json()
      })
      .catch(this.getError);
  }

  /**
   * Return show by id
   * @param {string} id
   */
  findById(id: string){
    return this
    ._http
    .get(`${this._url}/${id}`)
    .map((result: Response) => {
      return result.json();
    })
    .catch(this.getError);
  }

  /**
   * Search By Show Name or Rating
   * @param  {any}        queryParams query
   * @return {Observable} 
   */
  searchByShowName(query: any) : Observable < any > {
    return this
      ._http
      .get(`${this._url}/byName/${query}`)
      .map((result: Response) => {
        return result.json()
      })
      .catch(this.getError);
  }

  /**
   * Return err
   * @param  {Response}   error [description]
   * @return {Observable}       [description]
   */
  private getError(error : Response) : Observable < any > {
    console.log(error);
    return Observable.throw(error.json() || 'Server Issue');
  }

}
