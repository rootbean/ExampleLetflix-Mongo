import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UsersService } from './../users.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css'],
  providers: [
  	UsersService
  ]
})
export class UsersCreateComponent implements OnInit {

  user : any = {};
  botonActive: boolean;
  showMessage: boolean;

  constructor(
  	private router: Router,
  	public toastr: ToastsManager, 
    vcr: ViewContainerRef,
  	private _usersService: UsersService) { 
  		this.toastr.setRootViewContainerRef(vcr);
  	}

  ngOnInit() {
  	this.showMessage = false;
  	this.botonActive = true;
  }

  create(f : NgForm){
  	 if (f.valid) {
  	 	this.botonActive = false;
  	 	this
  	 	._usersService
  	 	.create(this.user)
  	 	.subscribe(data => {
  	 		this.showMessage = true;
  	 		this.toastr.success('Registro Correcto, por favor revise su email!', 'Success!');
  	 	}, err => {
  	 		this.botonActive = false;
  	 		console.log('err ', err);
  	 	});
  	 }
  }

}
