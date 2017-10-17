import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './login/auth-guard.service';

import { ShowsListComponent } from './shows/shows-list/shows-list.component';
import { ShowsIdComponent } from './shows/shows-id/shows-id.component';
import { AccountComponent } from './account/account.component';
import { UsersCreateComponent } from './users//users-create/users-create.component';

const routes: Routes = [
  {path: '', component: ShowsListComponent, pathMatch: 'full'},
  {path: 'shows/:id', component: ShowsIdComponent},
  {path: 'users-new', component: UsersCreateComponent},
  {path: 'secure/account', 
   component: AccountComponent,
   canActivate: [AuthGuard],
  },  
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
