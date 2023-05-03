import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Persona } from 'src/app/model/persona.model';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  nombre: string = 'Nombre';
  apellido: string = 'Apellido';
  descripcion: string = '';
  profesion: string = 'Profesión';
  img: string = '../../../assets/public/newuseravatar.png';
  usuarioActual: Usuario;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private interceptServ: InterceptorService, private personaServ: PersonaService, private notif: AppComponent, private usuarioService: UsuarioService)
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

    if(this.router.url == '/signup' && this.tokenService.getUserName() == "test") {
      
    } else {
      this.router.navigate(['/']);
    }
  }

  onSignup(): void {
    this.nuevoUsuario = new NuevoUsuario(this.formSignup.value.nombreUsuario, this.formSignup.value.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.onCreate(() => {
          this.router.navigate(['/']);
          window.location.reload();
        });
      },
      err => {
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
      }
    );
  }
  
  onCreate(callback:any): void {
    const persona = new Persona(this.nombre, this.apellido, this.descripcion, this.profesion, this.img, this.interceptServ.getUserId());
    this.personaServ.save(persona).subscribe(
      data => {
        callback();
      },
      err => {
        console.error("Error al crear la persona:", err);
      }
    );
  }

  get NombreUsuario() {
    return this.formSignup.get('nombreUsuario');
  }

  get Password() {
    return this.formSignup.get('password');
  }
  
}
