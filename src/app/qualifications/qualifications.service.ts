import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { URL_GLOBAL } from './../config/constants';

@Injectable()
export class QualificationsService {

  private _url : string;
  headers: Headers;
  options: RequestOptions;

  constructor(private _http : Http, private _authHttp: AuthHttp) {
    this._url = `${URL_GLOBAL.url}/likes`;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /**
   * Return qualification by Id
   * @param {string} id
   */
  findById(idUser: string, idShow: string){
    return this
    ._authHttp
    .get(`${this._url}/shows/${idShow}/${idUser}`)
    .map((result: Response) => {
      return result.json();
    })
    .catch(this.getError);
  }


  /**
   * save qualification
   * @param {any} data
   */
  create(data : any) {
    return this
      ._authHttp
      .post(this._url, data)
      .map((result : Response) => {
        return result.json()
      })
      .catch(this.getError);
  }

  /**
   * update qualification
   * @param {any} data
   */
  countLike(showId: any){
    return this
    ._http
    .get(`${this._url}/cant/${showId}`)
     .map((result : Response) => {
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
