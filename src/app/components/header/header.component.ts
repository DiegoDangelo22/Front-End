import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  loginUrl = this.router.url == "/login";

  constructor(private router:Router, private tokenService: TokenService) {  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
    setTimeout(() => {
      let resbarcont:HTMLElement = document.querySelector('.responsive-bar-content');
      let resbar:HTMLElement = document.querySelector('.responsive-bar');
      resbar.addEventListener("click", ()=>{
      resbarcont.classList.toggle('responsive-bar-content-toggleada');
    }, {passive:true, once:false});
    }, 1000);
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
      this.router.navigate(['/login']);
  }

  goHome(){
      this.router.navigate(['/']);
  }
}