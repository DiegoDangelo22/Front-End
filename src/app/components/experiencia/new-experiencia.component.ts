import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
  nombreExp: string = '';
  descripcionExp: string = '';

  constructor(private expService: ExperienciaService, private notif: AppComponent) { }

  ngOnInit(): void {
    
}

onCreate(): void{
  const expe = new Experiencia(this.nombreExp, this.descripcionExp);
  this.expService.save(expe).subscribe(data => {
    this.notif.noti();
  }, err => {
    alert("Falló");
  })
}




  

}
