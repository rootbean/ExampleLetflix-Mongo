import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [
  	LoginService
  ]
})
export class HeaderComponent implements OnInit {

  user:any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private _loginService: LoginService) { 

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  isAuthenticated(){
  	return this._loginService.isAuthenticated();
  }

  getAliasUser(){
  	return this._loginService.getUserName();
  }

  login(){
       this
       ._loginService
       .login(this.user.email, this.user.password)
       .subscribe(data => {
           this.user = {};
           this.toastr.success('Bienvenido a Letflix!', 'Success!');
           this.router.navigate(['/']);
          }, err => this.toastr.error('Oops!', err.message));
    }

  logout(){
    this.toastr.success('Regresa pronto!', 'Success!');
  	return this._loginService.logout();
  }

}
