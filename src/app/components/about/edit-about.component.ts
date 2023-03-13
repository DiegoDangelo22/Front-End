import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { getStorage, Storage, ref, uploadBytes, list, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import Cropper from 'cropperjs';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  persona: Persona = null;
  url:string = "";
  constructor(public persoServ: PersonaService, private tokenService: TokenService, private activatedRoute:ActivatedRoute, private router:Router, public imgServ:ImageService, private storage:Storage, private interceptServ: InterceptorService, private authService: AuthService) {  }
  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.persoServ.detail(id).subscribe(data =>
    {if(data.usuario.id == this.interceptServ.getUserId()){

    } else {
      this.router.navigate(["/login"])
    }})
    if(this.tokenService.getUserName() === "test" && this.router.url == "/editpersona/1"){
      this.router.navigate(["/"])
    }
    this.cargarPersona();
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

    // if(this.router.url == '/editpersona/1' && this.isAdmin == false) {
    //   this.router.navigate(['/login']);
    // }


   
  }
    

  onUpdate():void{
    const id = this.activatedRoute.snapshot.params['id'];
    // if(this.imgServ.url === ""){
    //   this.persona.img;
    // } else if (this.imgServ.url !== "") {
    //   this.persona.img = this.imgServ.url;
    // }
    if (this.url !== "") {
      this.persona.img = this.url;
    }
    
    this.persoServ.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['/']);
      }, err => {
        alert("Error al modificar la información");
        this.router.navigate(['/']);
      }
    )
  }

  cargarPersona(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.persoServ.detail(id).subscribe(data => {
      this.persona = data;
    })
  }

  

  uploadImage($event:any){
    
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "perfil_" + id;

    const file = $event.target.files[0]

    
      const imgRef = ref(this.storage, `img/` + name)
      
      uploadBytes(imgRef, file)
    // .then(response => {this.getImages()})
    .then(async () => {let asd = await getDownloadURL(imgRef)
    this.url = asd;
    let image:any = document.querySelector("#koog");
    image.src = this.url;
    let cropper = new Cropper(image, {
      aspectRatio: 0,
      viewMode: 1,
      checkCrossOrigin: true,
      checkOrientation: false,
      crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    },
    
  })
  document.querySelector("#cropImgBtn").addEventListener('click', ()=>{
    let croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
    let output:any = document.querySelector("#output");
    let oo:any = document.querySelector("#myimg");
    let momo:any = document.querySelector("#momo");
  
    output.src = croppedImage;
    this.url = croppedImage;
    console.log(this.url)
    oo.src = croppedImage;
    momo.src = croppedImage;
    
  })


    console.log("La url es: " + this.url)
    
  })
    .catch(error => console.log(error))
    
    let imgvieja:HTMLImageElement = document.querySelector('#myimg');
    imgvieja.style.opacity = '0'
    

    var modalPP:HTMLElement = document.querySelector('.modalPP');

    modalPP.style.display = "flex";
    window.onclick = function(event) {
      if (event.target == modalPP) {
        modalPP.style.display = "none";
      }
    } 





        
        
    

        
        
        
  }

  

  
}
