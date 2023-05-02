import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Cropper from 'cropperjs';
import { InterceptorService } from 'src/app/services/interceptor-service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  persona: Persona = null;
  url:string = "";
  constructor(public persoServ: PersonaService, private tokenService: TokenService, private activatedRoute:ActivatedRoute, private router:Router, public imgServ:ImageService, private storage:Storage, private interceptServ: InterceptorService) {  }
  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.persoServ.detail(id).subscribe(data => {
      if(data.usuario.id == this.interceptServ.getUserId()) {

      } else {
        this.router.navigate(["/login"])
      }
    })
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
  }

  onUpdate():void{
    const id = this.activatedRoute.snapshot.params['id'];
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
    .then(async () => {let data = await getDownloadURL(imgRef)
    this.url = data;
    let image:any = document.querySelector("#input");
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
    let myImg:any = document.querySelector("#myimg");
    let newImg:any = document.querySelector("#newimg");
  
    output.src = croppedImage;
    this.url = croppedImage;
    myImg.src = croppedImage;
    newImg.src = croppedImage;
  })
    console.log("La url es: " + this.url)
  })
    .catch(error => console.log(error))
    
    let imgvieja:HTMLImageElement = document.querySelector('#myimg');
    imgvieja.style.opacity = '0'
    

    var modal:HTMLElement = document.querySelector('.modal');

    modal.style.display = "flex";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
}