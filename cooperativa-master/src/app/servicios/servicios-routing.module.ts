import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevisionsocialComponent } from './previsionsocial/previsionsocial.component';
import { AsesorialegalComponent } from './asesorialegal/asesorialegal.component';
import { ConsumoComponent } from './consumo/consumo.component';

const routes: Routes = [
	  {
		path: 'previsionsocial',
		component: PrevisionsocialComponent
	  },
	  {
		path: 'asesorialegal',
		component: AsesorialegalComponent
	  },
	  {
		path: 'consumo',
		component: ConsumoComponent
	  }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ServiciosRoutingModule { }
