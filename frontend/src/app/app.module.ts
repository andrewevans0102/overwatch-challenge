import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './static/page-not-found/page-not-found.component';
import { HomeComponent } from './static/home/home.component';
import { LoginComponent } from './users/login/login.component';
import { ContentComponent } from './static/content/content.component';
import { CreateActivityComponent } from './activity/create-activity/create-activity.component';
import { ViewActivityComponent } from './activity/view-activity/view-activity.component';
import { HighScoresComponent } from './static/high-scores/high-scores.component';
import { AdminComponent } from './users/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    ContentComponent,
    CreateActivityComponent,
    ViewActivityComponent,
    HighScoresComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }