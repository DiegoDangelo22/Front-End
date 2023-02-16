import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { interceptorProvider } from './services/interceptor-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { HysComponent } from './components/hys/hys.component';
import { EditHysComponent } from './components/hys/edit-hys.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AboutComponent } from './components/about/about.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { EditAboutComponent } from './components/about/edit-about.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { EditProyectosComponent } from './components/proyectos/edit-proyectos.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ExperienciaComponent,
    EditExperienciaComponent,
    EducacionComponent,
    EditEducacionComponent,
    HysComponent,
    EditHysComponent,
    AboutComponent,
    EditAboutComponent,
    SignupComponent,
    ProyectosComponent,
    EditProyectosComponent,
    NewProyectoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#171a21",
      "backgroundStrokeWidth": 0,
      "backgroundPadding": -8,
      "radius": 80,
      "space": -12,
      "toFixed": 0,
      "maxPercent": 100,
      "unitsFontSize": "45",
      "unitsColor": "#ffffff",
      "outerStrokeWidth": 13,
      "outerStrokeColor": "#ffc02f",
      "outerStrokeLinecap": "butt",
      "innerStrokeColor": "#000",
      "innerStrokeWidth": 12,
      "titleColor": "#ffc02f",
      "titleFontSize": "45",
      "subtitleColor": "#ff8040",
      "subtitleFontSize": "30",
      "animationDuration": 600,
      "showInnerStroke": true,
      "responsive": false,
      "showZeroOuterStroke": false,
      "lazy": true}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [interceptorProvider, NewProyectoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
