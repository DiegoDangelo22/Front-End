import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged = false;

  constructor(private tokenServ: TokenService) {}

  ngOnInit(): void {
    if(this.tokenServ.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}