import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { URL_GLOBAL } from './../config/constants';

@Injectable()
export class FavoritesShowsService {

  private _url : string;
  headers: Headers;
  options: RequestOptions;

  constructor(private _http : Http, private _authHttp: AuthHttp) {
    this._url = `${URL_GLOBAL.url}/favorites_shows`;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /**
   * Return show favorite by Id
   * @param {string} id
   */
  findById(idUser: string, idShow: string){
    return this
    ._authHttp
    .get(`${this._url}/all/${idUser}/${idShow}`)
    .map((result: Response) => {
      return result.json();
    })
    .catch(this.getError);
  }


  /**
   * save show favorite
   * @param {any} data
   */
  create(data: any) {
    return this
      ._authHttp
      .post(this._url, data)
      .map((result : Response) => {
        return result.json()
      })
      .catch(this.getError);
  }

  /**
   * update show favorite
   * @param {any} data
   */
  edit(idUser: string, idShow, active: boolean){
    return this
    ._authHttp
    .put(`${this._url}/${idUser}/${idShow}`, { active })
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
    //console.log(error);
    return Observable.throw(error.json() || 'Server Issue');
  }

}
