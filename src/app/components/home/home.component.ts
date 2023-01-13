import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isLogged = false;
    isAdmin = false;
    
    constructor(private tokenServ:TokenService, private router:Router) {    }
  
    ngOnInit(): void {
      if(this.tokenServ.getToken()){
        this.isLogged = true;
      } else {
        this.isLogged = false;
        this.router.navigate(['']);
      }
      if(this.tokenServ.getAuthorities()[1] === 'ROLE_ADMIN'){
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

  }

}