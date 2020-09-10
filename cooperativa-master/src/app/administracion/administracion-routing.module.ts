import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasociosComponent } from './listasocios/listasocios.component';

const routes: Routes = [
	{
		path: 'listasocios',
		component: ListasociosComponent
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdministracionRoutingModule { }
