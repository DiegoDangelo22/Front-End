import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  nuevoUsuario!: NuevoUsuario;
  nombreUsuario!: string;
  password! : string;
  roles: string[] = [];
  errMsj!: string;
  formSignup: FormGroup;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder)
  {
    this.formSignup=this.formBuilder.group(
      {
        nombreUsuario:['',[Validators.required,Validators.minLength(3)]],
        password:['',[Validators.required,Validators.minLength(4)]]
      }
    )
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    };

    if(this.router.url == '/signup' && this.isLogged == true) {
      this.router.navigate(['/portfolio']);
    };
  }

  onSignup(): void{
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.password); 
    this.authService.nuevo(this.nuevoUsuario).subscribe(data =>{
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
      })
  }

  get NombreUsuario() {
    return this.formSignup.get('nombreUsuario');
  }

  get Password() {
    return this.formSignup.get('password');
  }
  
}
