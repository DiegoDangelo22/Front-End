import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAboutComponent } from './components/about/edit-about.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { EditHysComponent } from './components/hys/edit-hys.component';
import { LoginComponent } from './components/login/login.component';
import { EditProyectosComponent } from './components/proyectos/edit-proyectos.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
                        {path:'', component: HomeComponent},
                        {path:'login', component: LoginComponent},
                        {path:'signup', component: SignupComponent},
                        {path:'editexp/:id', component: EditExperienciaComponent},
                        {path:'editedu/:id', component: EditEducacionComponent},
                        {path:'editskill/:id', component: EditHysComponent},
                        {path:'editpersona/:id', component: EditAboutComponent},
                        {path:'editproyecto/:id', component: EditProyectosComponent},
                        {path:'newproyecto', component: NewProyectoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
