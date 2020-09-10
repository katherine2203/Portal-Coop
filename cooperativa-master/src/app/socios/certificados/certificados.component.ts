import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe,formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { CertificadosService } from '../../services/certificados.service';
import { CertificadosTotales } from '../../classes/certificadostotales';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link
} from 'carbon-components-angular';


@Component({
	selector: 'app-certificados',
	templateUrl: './certificados.component.html',
	styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {

	dataCertificados = [];
	modelCertificados: TableModel;
	skeletonCertificadosModel = Table.skeletonModel(3, 3);
	skeletoncertificados = true;

	constructor(public ibmidservice : IbmidService, 
		public db2service : Db2Service,
		private certificadosservice : CertificadosService,
		private router: Router,
		@Inject(LOCALE_ID) private locale: string) { }

	@ViewChild("activeItemTemplate")
	protected activeItemTemplate: TemplateRef<any>;
	
	@ViewChild("inactiveItemTemplate")
	protected inactiveItemTemplate: TemplateRef<any>;
	
	ngOnInit(): void {

		let certificadosoles : CertificadosTotales = {} as any;
		let certificadousd : CertificadosTotales = {} as any;
		let ctssoles : CertificadosTotales = {} as any;
		let ctsusd : CertificadosTotales = {} as any;
	
		if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

			this.modelCertificados = new TableModel();
			this.modelCertificados.header = [
				new TableHeaderItem({data: 'Depósitos a plazo'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

//	TIPOCERT- 01 : Certificado Soles
//			- 02 : Certificado Dólares
//			- 03 : CTS Soles
//			- 04 : CTS Dólares

			certificadosoles.totalmontos = 0;
			certificadousd.totalmontos = 0;
			ctssoles.totalmontos = 0;
			ctsusd.totalmontos = 0;

			this.db2service.getCertificadosMontosTotales(this.ibmidservice.CuentaSoles, '01').subscribe(
				(resp: any) => {
					if (resp.length == 1) {
						certificadosoles = resp[0];
					} 

					this.db2service.getCertificadosMontosTotales(this.ibmidservice.CuentaUsd, '02').subscribe(
						(resp: any) => {
							if (resp.length == 1) {
								certificadousd = resp[0];
							} 

							this.db2service.getCertificadosMontosTotales(this.ibmidservice.CuentaSoles, '03').subscribe(
								(resp: any) => {
									if (resp.length == 1) {
										ctssoles = resp[0];
									} 

									this.db2service.getCertificadosMontosTotales(this.ibmidservice.CuentaUsd, '04').subscribe(
										(resp: any) => {
											if (resp.length == 1) {
												ctsusd = resp[0];
											}

											if (certificadosoles.totalmontos != 0 || certificadousd.totalmontos != 0) {
												this.dataCertificados.push(
													[new TableItem({data : 'Certificados'}),
													new TableItem({data : {name : formatNumber(certificadosoles.totalmontos, this.locale,'1.2-2'),
														tipo : "01", cuenta : this.ibmidservice.CuentaSoles },
														template: certificadosoles.totalmontos != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
														className: "titem-right"}),
													new TableItem({data : {name : formatNumber(certificadousd.totalmontos, this.locale,'1.2-2'),
														tipo : "02", cuenta : this.ibmidservice.CuentaUsd},
														template: certificadousd.totalmontos != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
														className: "titem-right"})
													]			
												);

											}

											if (ctssoles.totalmontos != 0 || ctsusd.totalmontos != 0) {
												this.dataCertificados.push(
													[new TableItem({data : 'CTS'}),
													new TableItem({data : {name : formatNumber(ctssoles.totalmontos, this.locale,'1.2-2'),
														tipo : "03", cuenta : this.ibmidservice.CuentaSoles },
														template: ctssoles.totalmontos != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
														className: "titem-right"}),
													new TableItem({data : {name : formatNumber(ctsusd.totalmontos, this.locale,'1.2-2'),
														tipo : "04", cuenta : this.ibmidservice.CuentaUsd},
														template: ctsusd.totalmontos != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
														className: "titem-right"})
													]
												);
	
											}
								
											this.modelCertificados.data = this.dataCertificados;
											this.skeletoncertificados = false;				

									});

							});
				
					});
		
			});

		}

	}

	openCertificadosDetalle(tipo : string, cuenta : string) {
		this.certificadosservice.Tipo = tipo;
		this.certificadosservice.Cuenta = cuenta;
		this.router.navigate(['socios/certificadosdetalle']);
	}
}
