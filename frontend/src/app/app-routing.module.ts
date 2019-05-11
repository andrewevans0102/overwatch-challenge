import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'content', component: ContentComponent },
  { path: 'create-activity', component: CreateActivityComponent },
  { path: 'view-activity', component: ViewActivityComponent },
  { path: 'view-scores', component: HighScoresComponent },
  { path: 'admin', component: AdminComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
