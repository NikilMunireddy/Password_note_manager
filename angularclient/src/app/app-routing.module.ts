import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/layout/landing/landing.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PasswordsComponent } from './components/pages/passwords/passwords.component'


const routes: Routes = [
  { path:'', component: LandingComponent },
  { path:'login', component: LoginComponent },
  { path:'passwords', component: PasswordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
