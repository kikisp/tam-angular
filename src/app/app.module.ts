import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './core/app.service';
import { TestComponent } from './pages/test/test.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MovieComponent } from './pages/movie/movie/movie.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, TestComponent, WelcomeComponent, MovieComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
