import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  skill:Skill[] = [];
  name:string;
  percentage:number;

  constructor(private skillServ:SkillService, private notif:AppComponent, private tokenServ:TokenService) { }
  isLogged = false;
  isAdmin = false;
  

  ngOnInit(): void {
    this.cargarSkills();
    if(this.tokenServ.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    if(this.tokenServ.getAuthorities()[1] === 'ROLE_ADMIN'){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    if(this.isAdmin == true) {
      setTimeout(() => {
        var modalhys:HTMLElement = document.querySelector('.modalhys');
      var btnhys:HTMLElement = document.querySelector('.newhys');
      btnhys.addEventListener('click', ()=> {
        modalhys.style.display = "flex";
        window.onclick = function(event) {
          if (event.target == modalhys) {
            modalhys.style.display = "none";
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

  onCreate(): void {
    const skill = new Skill(this.name, this.percentage);
    this.skillServ.save(skill).subscribe(
      data => {
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