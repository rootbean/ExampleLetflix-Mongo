import {Injectable} from '@angular/core';
import {Http, Request, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {URL_GLOBAL} from '../config/constants';

@Injectable()
export class LoginService {

  private _url : string;
  userName : string
  idUser: string;
  authenticated: boolean;

  jwtHelper : JwtHelper = new JwtHelper();

  constructor(private http : Http) {
    this.getResetDatosAuth();
    this._url = `${URL_GLOBAL.url}/auth/local`;
    let token = localStorage.getItem('letflixapp');
    if (token) {
      this.getDatosAuthToken(token);
    }
  }

  login(email : string, password : string) : Observable < Response > {
    return this
      .http
      .post(this._url, {email, password})
      .map((result : Response) => {
          this.extractData(result);
        return result.json();
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('letflixapp');
    this.getResetDatosAuth();
  }

  getUserName(){
    return this.userName;
  }

  getIdUser(){
    return this.idUser;
  }

  getDatosAuthToken(token: string){
      this.idUser = this.jwtHelper.decodeToken(token).id;
      this.userName = this.jwtHelper.decodeToken(token).alias;
      this.authenticated = !this.jwtHelper.isTokenExpired(token);
  }

  getResetDatosAuth(){
    this.userName = null;
    this.idUser = null;
    this.authenticated = false;
  }

  isAuthenticated(){
    return this.authenticated;
  }

  private extractData(res: Response) {
    localStorage.setItem('letflixapp', res.json().token);
    let token = localStorage.getItem('letflixapp');
    this.getDatosAuthToken(token);
    this.authenticated = true;
  }

  private handleError(error : any) {
    let errMsg = error.json();
    return Observable.throw(errMsg);
  }

}
