import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password! : string;
  roles: string[] = [];
  errMsj!: string;
  formLogin: FormGroup;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder)
   {
    this.formLogin=this.formBuilder.group(
      {
        nombreUsuario:['',[Validators.required]],
        password:['',[Validators.required]]
      }
    )
   }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    
    if(this.router.url == '/login' && this.isLogged == true) {
      this.router.navigate(['/portfolio']);
    }
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password); 
    this.authService.login(this.loginUsuario).subscribe(data =>{
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/portfolio']);
      }, err =>{
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
        if(this.errMsj == undefined) {
          this.errMsj = "Datos incorrectos";
        }
      })
  }

  get NombreUsuario() {
    return this.formLogin.get('nombreUsuario');
  }

  get Password() {
    return this.formLogin.get('password');
  }

}
