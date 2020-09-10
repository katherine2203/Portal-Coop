import { Component, OnInit } from '@angular/core';

import { IbmidService } from './services/ibmid.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	
	title = 'coopeibm-web';

	constructor(private ibmidservice : IbmidService) {

	}

	ngOnInit(): void {
	
	}



}
