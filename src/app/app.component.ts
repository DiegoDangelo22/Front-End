import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "";

  constructor(private router:Router) {  }


  noti():any {

    let button:any = document.querySelector(".btn");
    let toast:any = document.querySelector(".toast");
    let closeIcon:any = document.querySelector(".close");
    let progress:any = document.querySelector(".progress");
  
      let timer1:any;
      let timer2:any;

      this.router.navigate(['/']);
      toast.classList.add("active");
      progress.classList.add("active");
    
      timer1 = setTimeout(() => {
        toast.classList.remove("active");
      }, 5000); //1s = 1000 milliseconds
    
      timer2 = setTimeout(() => {
        progress.classList.remove("active");
      }, 5300);
    
      

}
}