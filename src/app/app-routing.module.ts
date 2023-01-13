import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAboutComponent } from './components/about/edit-about.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { EditHysComponent } from './components/hys/edit-hys.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
                        {path:'', redirectTo:'login', pathMatch:'full'},
                        {path:'login', component: LoginComponent},
                        {path:'signup', component: SignupComponent},
                        {path:'portfolio', component: HomeComponent},
                        {path:'editexp/:id', component: EditExperienciaComponent},
                        {path:'editedu/:id', component: EditEducacionComponent},
                        {path:'editskill/:id', component: EditHysComponent},
                        {path:'editpersona/:id', component: EditAboutComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
