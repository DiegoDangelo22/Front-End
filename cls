[33mcommit 8da817daf6c0cf161630c790ff876314da93223b[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m, [m[1;31mfront/master[m[33m)[m
Author: Kaxzark <dangelo.diego.gabriel@gmail.com>
Date:   Tue May 2 21:56:33 2023 -0300

    Nada

[1mdiff --git a/.firebase/hosting.ZGlzdFxhbmd1bGFyLXRlc3Q.cache b/.firebase/hosting.ZGlzdFxhbmd1bGFyLXRlc3Q.cache[m
[1mindex 12bb6bd..2ab6f8b 100644[m
[1m--- a/.firebase/hosting.ZGlzdFxhbmd1bGFyLXRlc3Q.cache[m
[1m+++ b/.firebase/hosting.ZGlzdFxhbmd1bGFyLXRlc3Q.cache[m
[36m@@ -15,11 +15,11 @@[m [massets/public/outrun-neon-dark-background-purple-1920x1080-4523.jpg,167539409500[m
 assets/public/portfolio.png,1675394095000,fcf0a95c4380fe7a8ab14dd155caa837213bccfc7e6c6502ea3db4b6254273bb[m
 assets/public/twitter-logo-60.png,1675394095000,1b1c0cc0a1a85dd4642cccba2930d2e424b9258c662f21d5e9cf5865df458934[m
 assets/public/typescript.png,1675394095000,974d788da6527537e67b05cd65a76e7b585f220dd21eefefa9c2f36ea5398677[m
[31m-index.html,1678749763567,f7cea47aebb2d0d68fdf10b95e8e7073ff15aef4a49b7a76190eed58f0758996[m
[31m-3rdpartylicenses.txt,1678749762757,5d2550a484d16d8d5fe4c971c54f90c0d7701df53d4b37469f7a71aaff458137[m
[31m-runtime.b15828a8516f52f1.js,1678749762757,a23b06b79680f06f455030784ee5b84ace4951399bdb49af6e70b3b1d783537e[m
[31m-polyfills.013c3f69e5389c53.js,1678749762756,1d017784240f624cac8632e99583d4c1c919924dc96f51e95ef0d2e50e048cf8[m
[31m-styles.a27a985cbaa09766.css,1678749762757,5ac79448a214fed3b64934acd3469520c5decec672e754ea5f7ad7d334ae4fb2[m
[31m-5344385.0f49bde96a59f888.jpg,1678749762757,2eb88f42d3a13895c6e4554419083f024df62e924a23625491bfcb33daa3ed7f[m
[31m-code_text_colorful_140555_3024x4032.6fb56e344b2502e6.jpg,1678749762757,0c241d7e257bbcd4f53bf0dcb6b61172de4737358b8f71a01bb7a22d42f93374[m
[31m-main.4dbd7fdfeeda4900.js,1678749762757,11f92ea2e088f870e6392020a53b254f0bae4255e795a0dd837aa844792ee6da[m
[32m+[m[32mindex.html,1683072549482,cbc372b874dd57dce42c399cb4749d09c0305236848b0fc5aaf4b78afdc6782f[m
[32m+[m[32m3rdpartylicenses.txt,1683072545234,5d2550a484d16d8d5fe4c971c54f90c0d7701df53d4b37469f7a71aaff458137[m
[32m+[m[32mruntime.b15828a8516f52f1.js,1683072545229,a23b06b79680f06f455030784ee5b84ace4951399bdb49af6e70b3b1d783537e[m
[32m+[m[32mpolyfills.013c3f69e5389c53.js,1683072545222,1d017784240f624cac8632e99583d4c1c919924dc96f51e95ef0d2e50e048cf8[m
[32m+[m[32mstyles.a27a985cbaa09766.css,1683072545223,5ac79448a214fed3b64934acd3469520c5decec672e754ea5f7ad7d334ae4fb2[m
[32m+[m[32m5344385.0f49bde96a59f888.jpg,1683072545222,2eb88f42d3a13895c6e4554419083f024df62e924a23625491bfcb33daa3ed7f[m
[32m+[m[32mmain.dd2ee8afba112f0a.js,1683072545224,e2d02057a9ebca5b693a8d2709680ecb6c6b078b4b53a2299ccc1b9dbffc12f9[m
[32m+[m[32mcode_text_colorful_140555_3024x4032.6fb56e344b2502e6.jpg,1683072545222,0c241d7e257bbcd4f53bf0dcb6b61172de4737358b8f71a01bb7a22d42f93374[m
[1mdiff --git a/src/app/app.component.html b/src/app/app.component.html[m
[1mindex 1a770d4..c0974fd 100644[m
[1m--- a/src/app/app.component.html[m
[1m+++ b/src/app/app.component.html[m
[36m@@ -45,8 +45,8 @@[m
         <nav class="nav">[m
           <ul class="nav_ul">[m
             <li class="nav_ul_li">[m
[31m-              <a (click)="onLogOut()" *ngIf="loggedIn">{{buttonText}}</a>[m
[31m-              <a (click)="login()" *ngIf="!loggedIn">{{buttonText}}</a>[m
[32m+[m[32m              <a (click)="onLogOut()" *ngIf="loggedIn">Log out</a>[m
[32m+[m[32m              <a (click)="login()" *ngIf="!loggedIn">Log in</a>[m
             </li>[m
           </ul>[m
         </nav>[m
[36m@@ -62,8 +62,8 @@[m
           <nav>[m
             <ul class="nav_ul_res">[m
               <li class="nav_ul_li_res">[m
[31m-                                    <a (click)="onLogOut()" *ngIf="loggedIn">{{buttonText}}</a>[m
[31m-                                    <a routerLink="/login" *ngIf="!loggedIn">{{buttonText}}</a>[m
[32m+[m[32m                <a (click)="onLogOut()" *ngIf="loggedIn">Log out</a>[m
[32m+[m[32m                <a (click)="login()" *ngIf="!loggedIn">Log in</a>[m
               </li>[m
             </ul>[m
           </nav>[m
[1mdiff --git a/src/app/app.component.ts b/src/app/app.component.ts[m
[1mindex 30cdf76..9c08d47 100644[m
[1m--- a/src/app/app.component.ts[m
[1m+++ b/src/app/app.component.ts[m
[36m@@ -1,41 +1,32 @@[m
[31m-import { Component, OnInit } from '@angular/core';[m
[31m-import { NavigationEnd, Router, RouterPreloader } from '@angular/router';[m
[31m-import { InvalidTokenError } from 'jwt-decode';[m
[31m-import { AuthService } from './services/auth.service';[m
[32m+[m[32mimport { AfterContentChecked, Component, OnInit } from '@angular/core';[m
[32m+[m[32mimport { Router } from '@angular/router';[m
 import { TokenService } from './services/token.service';[m
[31m-import { UsuarioService } from './services/usuario.service';[m
 [m
 @Component({[m
   selector: 'app-root',[m
   templateUrl: './app.component.html',[m
   styleUrls: ['./app.component.css'][m
 })[m
[31m-export class AppComponent implements OnInit {[m
[32m+[m[32mexport class AppComponent implements OnInit, AfterContentChecked {[m
   title = "";[m
[31m-  isLogged = false;[m
[32m+[m[32m  loggedIn: boolean = false;[m
 [m
[31m-  loggedIn: boolean;[m
[31m-  buttonText: string;[m
[31m-[m
[31m-  constructor(private router:Router, private tokenService: TokenService, private authService: AuthService) { }[m
[32m+[m[32m  constructor(private router:Router, private tokenService: TokenService) { }[m
 [m
   ngOnInit(): void {[m
[31m-    if(this.tokenService.getUserName() == "test"){[m
[31m-      this.loggedIn = false;[m
[31m-      this.buttonText = "Log in"[m
[31m-    } else {[m
[31m-      this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {[m
[31m-      this.loggedIn = isAuthenticated;[m
[31m-      this.buttonText = this.loggedIn ? 'Log out' : 'Log in';[m
[31m-      });[m
[31m-    }[m
[31m-    [m
[31m-[m
       let resbarcont:HTMLElement = document.querySelector('.responsive-bar-content');[m
       let resbar:HTMLElement = document.querySelector('.responsive-bar');[m
       resbar.addEventListener("click", ()=>{[m
       resbarcont.classList.toggle('responsive-bar-content-toggleada');[m
[31m-      }, {passive:true, once:false});[m
[32m+[m[32m      }, {passive:true, once:false});[m[41m  [m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  ngAfterContentChecked(): void {[m
[32m+[m[32m    if(this.tokenService.getUserName() == "test"){[m
[32m+[m[32m      this.loggedIn = false;[m
[32m+[m[32m    } else {[m
[32m+[m[32m      this.loggedIn = true;[m
[32m+[m[32m    }[m
   }[m
 [m
   onLogOut():void{[m
[36m@@ -43,7 +34,7 @@[m [mexport class AppComponent implements OnInit {[m
       this.tokenService.logOut();[m
       window.location.reload();[m
     } else {[m
[31m-      console.log("pepito clavo un clavito")[m
[32m+[m[41m      [m
     }[m
   }[m
 [m
[36m@@ -71,7 +62,7 @@[m [mexport class AppComponent implements OnInit {[m
     [m
       timer1 = setTimeout(() => {[m
         toast.classList.remove("active");[m
[31m-      }, 5000); //1s = 1000 milliseconds[m
[32m+[m[32m      }, 5000);[m
     [m
       timer2 = setTimeout(() => {[m
         progress.classList.remove("active");[m
[36m@@ -87,7 +78,5 @@[m [mexport class AppComponent implements OnInit {[m
         clearTimeout(timer1);[m
         clearTimeout(timer2);[m
       });[m
[31m-    [m
   }[m
[31m-[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/app/components/about/edit-about.component.ts b/src/app/components/about/edit-about.component.ts[m
[1mindex 1b33925..d5b1ff7 100644[m
[1m--- a/src/app/components/about/edit-about.component.ts[m
[1m+++ b/src/app/components/about/edit-about.component.ts[m
[36m@@ -64,6 +64,10 @@[m [mexport class EditAboutComponent implements OnInit {[m
     const id = this.activatedRoute.snapshot.params['id'];[m
     this.persoServ.detail(id).subscribe(data => {[m
       this.persona = data;[m
[32m+[m[32m      this.per