import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	BreadcrumbModule,
	GridModule,
	TabsModule,
	LoadingModule,
	TableModule,
	LinkModule
} from 'carbon-components-angular';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { ListasociosComponent } from './listasocios/listasocios.component';


@NgModule({
	declarations: [ListasociosComponent],
	imports: [
		CommonModule,
		AdministracionRoutingModule,
		BreadcrumbModule,
		GridModule,
		TabsModule,
		LoadingModule,
		TableModule,
		LinkModule
	]
})
export class AdministracionModule { }
