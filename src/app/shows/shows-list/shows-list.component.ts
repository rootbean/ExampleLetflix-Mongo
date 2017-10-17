import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css'],
  providers: [
  	ShowsService
  ]
})
export class ShowsListComponent implements OnInit {

  showsList: any[] = [];
  show: any = {};
  searchByName: string;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _showsService: ShowsService) { }

  ngOnInit() {
  	this.getAllShows();
  	//this.getShowById();
  }

  getAllShows(){
  	return this
       ._showsService
       .findAll()
       .subscribe(data => {
           this.showsList = data;
        }, error => {
            console.log('error ', error);
        });
  }

  getShowById(){
  	return this
       ._showsService
       .findById(String(10))
       .subscribe(data => {
           this.show = data;
        }, error => {
            console.log('error ', error);
        });
  }

  searchByShowName(){
    this.showsList = [];
    return this
          ._showsService
          .searchByShowName(this.searchByName)
          .subscribe(data => {
               this.showsList = data;
          }, error => {
            console.log('error ', error);
          });
  }

  clear(){
    this.searchByName = '';
    this.getAllShows();
  }

  redirectShowById(id: string){
    this.router.navigate([`/shows/${id}`]);
  }

}
