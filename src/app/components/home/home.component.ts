import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    
    constructor() {    }
  
    ngOnInit(): void {
        

let circularProgress:any = document.querySelector(".circular_progress");
let circularProgress2:any = document.querySelector(".circular_progress_2");
let circularProgress3:any = document.querySelector(".circular_progress_3");
let circularProgress4:any = document.querySelector(".circular_progress_4");
let progressValue:any = document.querySelector(".progress_value");
let progressValue2:any = document.querySelector(".progress_value_2");
let progressValue3:any = document.querySelector(".progress_value_3");
let progressValue4:any = document.querySelector(".progress_value_4");

let progressStartValue = 0;
let progressStartValue2 = 0;
let progressStartValue3 = 0;
let progressStartValue4 = 0;
let progressEndValue = 90;
let progressEndValue2 = 50;
let progressEndValue3 = 40;
let progressEndValue4 = 15;
let speed = 15;

let progress = setInterval(()=> {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#ffc02f ${progressStartValue * 3.6}deg, #fff 0deg)`;
    if(progressStartValue == progressEndValue) {
        clearInterval(progress);
    }
}, speed);

let progress2 = setInterval(()=> {
    progressStartValue2++;
    progressValue2.textContent = `${progressStartValue2}%`;
    circularProgress2.style.background = `conic-gradient(#ffc02f ${progressStartValue2 * 3.6}deg, #fff 0deg)`;
    if(progressStartValue2 == progressEndValue2) {
        clearInterval(progress2);
    }
}, speed);

let progress3 = setInterval(()=> {
    progressStartValue3++;
    progressValue3.textContent = `${progressStartValue3}%`;
    circularProgress3.style.background = `conic-gradient(#ffc02f ${progressStartValue3 * 3.6}deg, #fff 0deg)`;
    if(progressStartValue3 == progressEndValue3) {
        clearInterval(progress3);
    }
}, speed);

let progress4 = setInterval(()=> {
    progressStartValue4++;
    progressValue4.textContent = `${progressStartValue4}%`;
    circularProgress4.style.background = `conic-gradient(#ffc02f ${progressStartValue4 * 3.6}deg, #fff 0deg)`;
    if(progressStartValue4 == progressEndValue4) {
        clearInterval(progress4);
    }
}, speed);

  }

}