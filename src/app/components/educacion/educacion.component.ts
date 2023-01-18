import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  nombreEdu: string = '';
  descripcionEdu: string = '';

  constructor(private educacionService: EducacionService, private tokenService: TokenService, private notif:AppComponent) { }
  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    if((this.tokenService.getAuthorities()[0] && this.tokenService.getAuthorities()[1])){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    if(this.isAdmin == true) {
      setTimeout(() => {
        var modaledu:HTMLElement = document.querySelector('.modaledu');
      var btnedu:HTMLElement = document.querySelector('.newedu');
      btnedu.addEventListener('click', ()=> {
        modaledu.style.display = "flex";
        window.onclick = function(event) {
          if (event.target == modaledu) {
            modaledu.style.display = "none";
          }
        } 
      })
      }, 1000);
    }
    
  }

  cargarEducacion(): void {
    this.educacionService.lista().subscribe(
      data =>{
        this.educacion = data;
      }
    )
  }

  onCreate(): void {
    const educacion = new Educacion(this.nombreEdu, this.descripcionEdu);
    this.educacionService.save(educacion).subscribe(
      data => {
        this.notif.noti();
      }, err => {
        alert("Falló");
      }
    )
  }

  borrar(id?: number){
    if(id != undefined){
      this.educacionService.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo eliminar");
        }
      )
    }
  }
}