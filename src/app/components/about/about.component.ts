import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  persona: Persona = null;

  constructor(public persoServ: PersonaService, private tokenService: TokenService, private activatedRoute:ActivatedRoute, private router:Router, public imgServ:ImageService) {  }
  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.cargarPersona();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    if(this.tokenService.getAuthorities()[1] === 'ROLE_ADMIN'){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  cargarPersona(){
    this.persoServ.detail(1).subscribe(data => {
      this.persona = data;
    })
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
    const name = "perfil_" + id
    this.imgServ.uploadImage($event, name)
  }

}