import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AdminComponent } from './pages/admin/admin.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [AppComponent, LoginComponent, TestComponent, WelcomeComponent, MovieComponent, AdminComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    MatButtonModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
