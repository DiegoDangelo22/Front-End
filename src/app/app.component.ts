import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterPreloader } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "";
  isLogged = false;
  loginUrl = this.router.url == "/login";

  constructor(private router:Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
      let resbarcont:HTMLElement = document.querySelector('.responsive-bar-content');
      let resbar:HTMLElement = document.querySelector('.responsive-bar');
      resbar.addEventListener("click", ()=>{
      resbarcont.classList.toggle('responsive-bar-content-toggleada');
      }, {passive:true, once:false});
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  // login(){
  //     this.router.navigate(['/login']);
  // }

  // goHome(){
  //     this.router.navigate(['/']);
  // }
  
  noti():any {

    let button:any = document.querySelector(".btn");
    let toast:any = document.querySelector(".toast");
    let closeIcon:any = document.querySelector(".close");
    let progress:any = document.querySelector(".progress");
  
      let timer1:any;
      let timer2:any;

      this.router.navigate(['/']);
      toast.classList.add("active");
      progress.classList.add("active");
    
      timer1 = setTimeout(() => {
        toast.classList.remove("active");
      }, 5000); //1s = 1000 milliseconds
    
      timer2 = setTimeout(() => {
        progress.classList.remove("active");
      }, 5300);

      closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");
        
        setTimeout(() => {
          progress.classList.remove("active");
        }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
      });
    
  }

}