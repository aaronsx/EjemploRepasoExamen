import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Cita } from 'src/app/Modulos/cita';
import { FireBaseService } from 'src/app/Servicios/fire-base.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {
  chart:any;
  citas:Cita[]=[];
// Declaramos la fehca actual
hoy = new Date();
anyo = this.hoy.getFullYear();
mes = this.hoy.getMonth() + 1;
dia = this.hoy.getDate();
  constructor(private fbs:FireBaseService){}
  ngOnInit(): void {
   this.crearChart()
  }
  
  crearChart() {
    let dias:string[]=[];
    let citasDia:string[]=[];
    let colores:string[]=[];
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
    let coloresRandon:string[]=this.generaArrayColores(20);

    this.fbs.getFireBase(`Agenda/${fecha}/citas`).subscribe(res=>{this.citas=res;
      
      for(let i=0;i<this.citas.length;i++){
        dias.push(this.citas[i].diaDeLaCita);
        colores.push(coloresRandon[this.numeroRandom(0,19)])
      }
      this.chart = new Chart("myChart", {
        type: 'doughnut', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: dias,
          datasets: [
            {
              label: "Citas",
              data: citasDia,
              backgroundColor: colores,
              borderColor: 'rgba(0, 0, 0, 1)',

            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    });

  }
  //---------------------------------------------------------------------------------------
  numeroRandom(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generaColor() {
    // Genera valores RGB aleatorios
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    // Devuelve el color en formato 'rgba'
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
  
  generaArrayColores(numColors:number) {
    const colorsArray = [];
  
    for (let i = 0; i < numColors; i++) {
      const randomColor = this.generaColor();
      colorsArray.push(randomColor);
    }
  
    return colorsArray;
  }
  //---------------------------------------------------------------------------------------
 
}
