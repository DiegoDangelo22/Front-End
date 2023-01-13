import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  expLab: Experiencia = null;
  nombreExp: string = '';
  descripcionExp: string = '';
  isAdmin = false;

  constructor(private expService: ExperienciaService, private tokenService: TokenService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];
    this.expService.detail(id).subscribe(data => {
      this.expLab = data;
    }, err => {
      alert("Error al modificar experiencia");
      this.router.navigate(['']);
    })
    if(this.tokenService.getAuthorities()[1] === 'ROLE_ADMIN'){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.expService.update(id, this.expLab).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert("Error al modificar experiencia");
      this.router.navigate(['']);
    })
  }

}
