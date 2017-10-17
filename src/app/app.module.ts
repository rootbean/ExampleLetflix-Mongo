import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

 import {ToastModule} from 'ng2-toastr/ng2-toastr';

//Auth Module
import { AuthModule } from './login/auth';
import { AuthGuard } from './login/auth-guard.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ShowsListComponent } from './shows/shows-list/shows-list.component';
import { ShowsIdComponent } from './shows/shows-id/shows-id.component';
import { AccountComponent } from './account/account.component';


// custom-option.ts
import {ToastOptions} from 'ng2-toastr';
import { UsersCreateComponent } from './users/users-create/users-create.component';

export class CustomOption extends ToastOptions {
  newestOnTop = false;
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ShowsListComponent,
    ShowsIdComponent,
    AccountComponent,
    UsersCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ToastModule.forRoot(),
    AuthModule
  ],
  providers: [AuthGuard, {provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule { }
