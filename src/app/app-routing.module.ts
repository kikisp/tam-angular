import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TestComponent } from './pages/test/test.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {MovieComponent} from './pages/movie/movie/movie.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'movie', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
