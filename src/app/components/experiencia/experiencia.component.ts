import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Experiencia }from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  exp: Experiencia[] = [];
  nombreExp: string = '';
  descripcionExp: string = '';
  someSubscription: any;

  constructor(private expService: ExperienciaService, private tokenService: TokenService, private notif:AppComponent, private router:Router)
   {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.someSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Here is the dashing line comes in the picture.
        // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
        this.router.navigated = false;
      }
    });
   }

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.cargarExperiencia();
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
        var modalexp:HTMLElement = document.querySelector('.modalexp');
      var btnexp:HTMLElement = document.querySelector('.newexp');
      btnexp.addEventListener('click', ()=> {
        modalexp.style.display = "flex";
        window.onclick = function(event) {
          if (event.target == modalexp) {
            modalexp.style.display = "none";
          }
        } 
      })
      }, 1000);
    }
    
  }

  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  cargarExperiencia():void{
    this.expService.lista().subscribe(data => {this.exp = data});
  }

  delete(id?: number){
    if(id != undefined){
      this.expService.delete(id).subscribe(data => {
        this.cargarExperiencia();
      }, err => {
        alert("No se pudo borrar la experiencia");
      })
    }
  }

  onCreate(): void{
    const expe = new Experiencia(this.nombreExp, this.descripcionExp);
    this.expService.save(expe).subscribe(data => {
      this.notif.noti();
    }, err => {
      alert("Falló");
    })
  }


}