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
  nombre: string = '';
  apellido: string = '';
  descripcion: string = '';
  profesion: string = '';
  img: string = '';
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

    if(this.router.url == '/signup' && this.isLogged == true) {
      this.router.navigate(['/']);
    };
  }

  // obtenerUsuarioActual(): void {
  //   this.usuarioService.getUsuarioById().subscribe(data => {
  //     this.usuarioActual = data;
  //   });
  // }  

  onSignup(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        console.log("Datos del usuario registrado: ", data);
        this.onCreate(() => {
          this.router.navigate(['/']);
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
    console.log("Creando nueva persona...");
    const persona = new Persona(this.nombre, this.apellido, this.descripcion, this.profesion, this.img, this.interceptServ.getUserId());
    console.log("Datos de la persona:", persona);
    this.personaServ.save(persona).subscribe(
      data => {
        console.log("Persona creada exitosamente:", data);
        this.notif.noti();
        callback(); // llamamos al callback una vez se completa la petición
      },
      err => {
        console.error("Error al crear la persona:", err);
        alert(err.error.mensaje);
        callback(); // llamamos al callback en caso de error
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
