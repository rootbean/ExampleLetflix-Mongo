import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LoginService } from '../../login/login.service';
import { UsersService } from '../../users/users.service';
import { ShowsService } from '../shows.service';
import { QualificationsService } from '../../qualifications/qualifications.service';
import { CommentsService } from '../../comments/comments.service';

import { URL_GLOBAL } from '../../config/constants';

@Component({
  selector: 'app-shows-id',
  templateUrl: './shows-id.component.html',
  styleUrls: ['./shows-id.component.css'],
  providers: [
  	ShowsService,
    LoginService,
    UsersService,
    QualificationsService,
    CommentsService
  ]
})
export class ShowsIdComponent implements OnInit {

  show: any = {};
  user: any = {};
  idShow: string;
  showFavorite: boolean = false;
  commentsList: any[] = [];
  comment: any = {};
  like: any = {};
  cantLikes: any = {};
  private socket: SocketIOClient.Socket;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private _loginService: LoginService,
    private _usersService: UsersService,
    private _commentsService: CommentsService,
    private _likesService: QualificationsService,
    private _showsService: ShowsService) {
      this.toastr.setRootViewContainerRef(vcr);
      //this.socket = io.connect('127.0.0.1:3000/api/comments');

      //this.socket.on('save', (data) => console.log('aqui ', data));

    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.idShow = params['id'];
        this.getShowById(this.idShow);
        this.getCantLikes();
        this.getLikeUser();
      }
    });
    this.getUserById();
  }

  getShowById(id: string){
  	return this 
       ._showsService
       .findById(id)
       .subscribe(data => {
         this.show = data,
         this.getCommentsShow();
       }, error => console.log('error ', error));
  }

  isAuthenticated(){
    return this._loginService.isAuthenticated();
  }

  getUserById(){
    return this
           ._usersService
           .findById(this._loginService.getIdUser())
           .subscribe(data => {
             let favorites = [];
             favorites = data.showsFavorites;

             favorites.forEach( (value, index, array) => {
              if(String(value) === this.idShow){
                 this.showFavorite = true;
              }
             });
             this.user = data;
              
           }, err => console.log('err ', err));
  }

  addComment(){
    this.comment.show = this.idShow;
    this.comment.user = this._loginService.getIdUser();
    return this
           ._commentsService
           .create(this.comment)
           .subscribe(data =>{
             this.toastr.success('Se realizó  el comentario!', 'Success!');
             this.comment = {};
           } , 
             err => console.log('err ', err));
  }

  getCommentsShow(){
    return this
           ._commentsService
           .findAll(this.idShow)
           .subscribe(data => this.commentsList = data,
            err => console.log('err ', err));
  }

  updateShowFavorite(addFavorite: boolean){
    let data = {
      show: this.idShow,
      active: addFavorite
    };
    return this
           ._usersService
           .updateFavorites(
             this._loginService.getIdUser(),
             data)
           .subscribe(data => {
             this.showFavorite = addFavorite;
             this.toastr.success('Favoritos Actualizados!', 'Success!');
           }, err => console.log('err ', err));        
  }

  getCantLikes(){
    return this
             ._likesService
             .countLike(this.idShow)
             .subscribe(data => {
               this.cantLikes = data;
           }, err => console.log('err ', err));          
  }

  getLikeUser(){
    return this
            ._likesService
            .findById(this._loginService.getIdUser(), this.idShow)
             .subscribe(data => {
               this.like = data;
               if(!this.like.user) {
                 this.like.user = this._loginService.getIdUser();
                 this.like.show = this.idShow;
               }
           }, err => console.log('err ', err));     
  }
  
  getUpdateLikeUser(){
    return this
            ._likesService
            .create(this.like)
            .subscribe(data => {
             this.toastr.success('OK!', 'Success!');
           }, err => console.log('err ', err));     
  }

  onLike(value: boolean){
    this.like.like = value;
    if(this.like.like) this.like.unlike = false

    this.getUpdateLikeUser();
  }

  onUnLike(value: boolean){
    this.like.unlike = value;
    if(this.like.unlike) this.like.like = false

    this.getUpdateLikeUser();  
  }
  

}
