import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [  

{
  path: '',
  component: LandingPageComponent,
  canActivate: [AuthGuard],
},
{
  path: 'login',
  component: LoginPageComponent,
},
{
  path: '**',
  redirectTo: '',
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
