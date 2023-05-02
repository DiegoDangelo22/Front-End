import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

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
    .then(async () => {
      let img = await getDownloadURL(imgRef)
      this.url = img
    })
    .catch(error => console.log(error))
  }
}