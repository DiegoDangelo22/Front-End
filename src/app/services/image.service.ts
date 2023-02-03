import { Injectable } from '@angular/core';
import { getStorage, Storage, ref, uploadBytes, list, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url:string = "";


  constructor(private storage:Storage) { }

  public uploadImage($event:any, name:string){
    const file = $event.target.files[0]

    
      const imgRef = ref(this.storage, `img/` + name)
      
      uploadBytes(imgRef, file)
    // .then(response => {this.getImages()})
    .then(async () => {let asd = await getDownloadURL(imgRef)
    this.url = asd
    console.log("La url es: " + this.url)
  })
    .catch(error => console.log(error))








  
}



  // getImages(){
  //   const imagesRef = ref(this.storage, 'img')
  //   list(imagesRef)
  //   .then(async response => {
  //     for(let item of response.items){
  //        this.url = await getDownloadURL(item);
  //       console.log("La url es: " + this.url)
  //     }
  //   })
  //   .catch(error => console.log(error))
  // }

  //  getImagesPrueba($event:any){
    // // const storage = getStorage();

    //   const metadata = {
    //     contentType: 'image/jpeg'
    //   }
    // const file = $event.target.files[0]
    // const storageRef = ref(this.storage, `img/`);
    //   const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    //    getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
    //     this.url = await getDownloadURL(storageRef);
    //       console.log('File available at', downloadURL);
    //     }).catch(error => console.log(error))
      
    // const imagesRef = ref(this.storage, 'img')
    // list(imagesRef)
    // .then(async response: => {

    //     this.url = await getDownloadURL(response);
    //     console.log("La url es: " + this.url)
      
    // })
    // .catch(error => console.log(error))
// }
}