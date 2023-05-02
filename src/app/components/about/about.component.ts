import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  persona: Persona = null;
  persona2: Persona[] = [];
  nombre: string = '';
  apellido: string = '';
  profesion: string = '';
  img: string = '';
  descripcion: string = '';
  usuarioActual: Usuario;
  perso: Persona;

  constructor(public persoServ: PersonaService, private tokenService: TokenService, public imgServ:ImageService, private interceptServ: InterceptorService, private authService: AuthService) {  }
  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.authService.getAbout().subscribe(perso => {
      this.persona2 = perso || [];
    });
    if(this.tokenService.getUserName() === "test"){
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}