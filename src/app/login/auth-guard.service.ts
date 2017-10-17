import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router : Router) {}

    loggedIn() {
        return tokenNotExpired('letflixapp');
    }

    canActivate() {
        if (!this.loggedIn()) this.router.navigate(['']);
        
        return this.loggedIn();
    }
}