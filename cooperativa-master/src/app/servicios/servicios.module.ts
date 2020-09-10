import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ConsumoComponent } from './consumo/consumo.component';
import { AsesorialegalComponent } from './asesorialegal/asesorialegal.component';
import { PrevisionsocialComponent } from './previsionsocial/previsionsocial.component';


@NgModule({
	declarations: [
		PrevisionsocialComponent,
		AsesorialegalComponent, 
		ConsumoComponent, 
		AsesorialegalComponent, 
		PrevisionsocialComponent
	],
	imports: [
		CommonModule,
		ServiciosRoutingModule
	]
})
export class ServiciosModule { }
