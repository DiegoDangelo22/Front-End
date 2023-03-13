import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  skill:Skill[] = [];
  name:string;
  percentage:number;
  usuarioActual: Usuario;

  constructor(private skillServ:SkillService, private notif:AppComponent, private tokenServ:TokenService, private interceptServ: InterceptorService, private usuarioService: UsuarioService) { }
  isLogged = false;
  isAdmin = false;
  

  ngOnInit(): void {
    this.cargarSkills();
    if(this.tokenServ.getUserName() === "test"){
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    if(this.tokenServ.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    // if((this.tokenServ.getAuthorities()[0] && this.tokenServ.getAuthorities()[1])){
    //   this.isAdmin = true;
    // } else {
    //   this.isAdmin = false;
    // }

    if(this.isLogged == true) {
      setTimeout(() => {
        var modalhys:HTMLElement = document.querySelector('.modalhys');
      var btnhys:HTMLElement = document.querySelector('.newhys');
      btnhys.addEventListener('click', ()=> {
        modalhys.style.display = "flex";
        window.onclick = function(event) {
          if (event.target == modalhys) {
            modalhys.style.display = "none";
            // location.reload();
          }
        } 
      })
      }, 1000);
    }
    
 }
       
  cargarSkills(): void {
    this.skillServ.lista().subscribe(
      data => {
        this.skill = data;
      }
    )
  }

  // obtenerUsuarioActual(): void {
  //   this.usuarioService.getUsuarioById().subscribe(data => {
  //     this.usuarioActual = data;
  //   });
  // }

  mostrarHyS(hys: Skill): boolean {
    return hys.usuario.id === this.interceptServ.getUserId();
  }

  onCreate(): void {
    const skill = new Skill(this.name, this.percentage, this.interceptServ.getUserId());
    this.skillServ.save(skill).subscribe(
      data => {
        this.cargarSkills();
        this.notif.noti();
      }, err => {
        alert("Falló al añadir la skill");
      }
    )
  }

  delete(id:number){
    if(id != undefined) {
      this.skillServ.delete(id).subscribe(
        data => {
          this.cargarSkills();
        }, err => {
          alert("No se pudo borrar la skill");
        }
      )
    }
  }
}