import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasRoutingModule } from './herramientas-routing.module';

import { CalcpagosComponent } from './calcpagos/calcpagos.component';
import { CalccertificadosComponent } from './calccertificados/calccertificados.component';
import { ReglamentocreditoComponent } from './reglamentocredito/reglamentocredito.component';
import { TasasinteresComponent } from './tasasinteres/tasasinteres.component';


@NgModule({
  declarations: [CalcpagosComponent, CalccertificadosComponent, ReglamentocreditoComponent, TasasinteresComponent],
  imports: [
    CommonModule, HerramientasRoutingModule
  ]
})
export class HerramientasModule { }
