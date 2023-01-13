import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  persona: Persona = null;

  constructor(public persoServ: PersonaService, private tokenService: TokenService, private activatedRoute:ActivatedRoute, private router:Router, public imgServ:ImageService) { }
  isLogged = false;
  ngOnInit(): void {
    this.cargarPersona();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  onUpdate():void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.persona.img = this.imgServ.url;
    this.persoServ.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['/portfolio']);
      }, err => {
        alert("Error al modificar la información");
        this.router.navigate(['/portfolio']);
      }
    )
  }

  cargarPersona(){
    this.persoServ.detail(1).subscribe(data => {
      this.persona = data;
    })
  }

  uploadImage($event:any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "perfil_" + id;
    this.imgServ.uploadImage($event, name);
  }

}
