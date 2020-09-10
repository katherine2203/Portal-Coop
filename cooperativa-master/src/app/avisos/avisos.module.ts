import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisosRoutingModule } from './avisos-routing.module';
import { InternosComponent } from './internos/internos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NoticiasComponent } from './noticias/noticias.component';


@NgModule({
	declarations: [InternosComponent, ProveedoresComponent, NoticiasComponent],
	imports: [
		CommonModule,
		AvisosRoutingModule
	]
})
export class AvisosModule { }
