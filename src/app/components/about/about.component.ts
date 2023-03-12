import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(public persoServ: PersonaService, private tokenService: TokenService, private activatedRoute:ActivatedRoute, private router:Router, public imgServ:ImageService, private interceptServ: InterceptorService, private usuarioService: UsuarioService, private authService: AuthService) {  }
  isLogged = false;
  isAdmin = false;
  userId = this.interceptServ.getUserId();

  ngOnInit(): void {
    this.authService.getAbout().subscribe(perso => {
      this.persona2 = perso || []; // asegurarse de manejar el caso en que edu es null
    });
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
  }

  // cargarPersona(){
  //   this.persoServ.detail(this.interceptServ.getUserId()).subscribe(data => {
  //     this.persona = data;
  //   })
  // }

  // cargarPersona(): void {
  //   this.persoServ.lista().subscribe(
  //     data =>{
  //       this.persona2 = data;
  //       console.log(this.persona2 + "pepe")
  //     }
  //   )
  // }


  mostrarPersona(persona: Persona): any {
    if(persona && this.tokenService.getToken()){
      const persoUser = this.persona2.find(perso => perso.usuario.id === 27);
      return persoUser;
    } else {
      return true;
    }
  }

  onUpdate():void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.persona.img = this.imgServ.url;
    this.persoServ.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la educación");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event:any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "perfil_" + id;
    this.imgServ.uploadImage($event, name);
  }

}