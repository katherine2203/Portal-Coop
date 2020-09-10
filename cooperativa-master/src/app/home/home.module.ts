import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ConstruccionComponent } from './construccion/construccion.component';


import {
	BreadcrumbModule,
	GridModule,
	TabsModule,
	LoadingModule
} from 'carbon-components-angular';

@NgModule({
	declarations: [LandingPageComponent, ConstruccionComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		BreadcrumbModule,
		GridModule,
		TabsModule,
		LoadingModule
	]
})
export class HomeModule { }
