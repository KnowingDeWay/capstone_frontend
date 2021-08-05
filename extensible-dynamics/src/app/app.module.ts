import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
