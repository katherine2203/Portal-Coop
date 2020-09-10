import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe,formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { AhorrosService } from '../../services/ahorros.service';
import { CuentasDetalle } from '../../classes/cuentasdetalle';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link
} from 'carbon-components-angular';

@Component({
	selector: 'app-ahorros',
	templateUrl: './ahorros.component.html',
	styleUrls: ['./ahorros.component.scss']
})
export class AhorrosComponent implements OnInit {

	dataAhorro = [];
	modelAhorro: TableModel;
	skeletonAhorroModel = Table.skeletonModel(6, 3);
	skeletonahorro = true;

	dataMisc = [];
	modelMisc: TableModel;
	skeletonMiscModel = Table.skeletonModel(2, 3);
	skeletonmisc = true;

	ctasoles : CuentasDetalle;
	ctausd : CuentasDetalle;

	constructor(public ibmidservice : IbmidService, 
				public db2service : Db2Service,
				private ahorrosservice : AhorrosService,
				private router: Router,
				@Inject(LOCALE_ID) private locale: string
				) { }

	@ViewChild("activeItemTemplate")
	protected activeItemTemplate: TemplateRef<any>;

	@ViewChild("inactiveItemTemplate")
	protected inactiveItemTemplate: TemplateRef<any>;

	ngOnInit(): void {

		if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

			this.modelAhorro = new TableModel();
			this.modelAhorro.header = [
				new TableHeaderItem({data: 'Cuentas de ahorro'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

			this.modelMisc = new TableModel();
			this.modelMisc.header = [
				new TableHeaderItem({data: 'Misceláneo'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

            this.db2service.getCuentasSolesDetalle(this.ibmidservice.CodEmpleado).subscribe(
                (resp: any) => {
                  if (resp.length == 1) {
					this.ctasoles = resp[0];
	
					this.db2service.getCuentasUsdDetalle(this.ibmidservice.CodEmpleado).subscribe(
						(resp: any) => {
						  if (resp.length == 1) {
							this.ctausd = resp[0];
								
							this.dataAhorro = [
								[new TableItem({data : 'Contable'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldocontable, this.locale,'1.2-2'),
									tipo : "contable", moneda : "soles", monto : this.ctasoles.saldocontable },
									template: this.ctasoles.saldocontable != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldocontable, this.locale,'1.2-2'),
									tipo : "contable", moneda : "usd", monto : this.ctausd.saldocontable},
									template: this.ctausd.saldocontable != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								],
				
								[new TableItem({data : 'Disponible'}),
								new TableItem({data : formatNumber(this.ctasoles.saldodispahorro, this.locale,'1.2-2'), className: "titem-right"}),
								new TableItem({data : formatNumber(this.ctausd.saldodispahorro, this.locale,'1.2-2'), className: "titem-right"})
								],
							
								[new TableItem({data : 'Bloqueado'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldobloqueoahorro, this.locale, '1.2-2'),
									tipo : "bloqueado", moneda : "soles", monto : this.ctasoles.saldobloqueoahorro},
									template: this.ctasoles.saldobloqueoahorro != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
							   	new TableItem({data : {name : formatNumber(this.ctausd.saldobloqueoahorro, this.locale,'1.2-2'),
								    tipo : "bloqueado", moneda : "usd", monto : this.ctausd.saldobloqueoahorro},
								    template: this.ctausd.saldobloqueoahorro != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
								    className: "titem-right"})
								],
				
								[new TableItem({data : 'Intereses por Pagar'}),
								new TableItem({data : formatNumber(this.ctasoles.intahorromes, this.locale,'1.2-2'), className: "titem-right"}),
								new TableItem({data : formatNumber(this.ctausd.intahorromes, this.locale,'1.2-2'), className: "titem-right"})
								],
				
								[new TableItem({data : 'Aportaciones'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldoaportacion, this.locale,'1.2-2'),
									tipo : "aportaciones", moneda : "soles", monto : this.ctasoles.saldoaportacion},
									template: this.ctasoles.saldoaportacion != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
							   	new TableItem({data : {name : formatNumber(this.ctausd.saldoaportacion, this.locale,'1.2-2'),
								    tipo : "aportaciones", moneda : "usd", monto : this.ctausd.saldoaportacion},
								    template: this.ctausd.saldoaportacion != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
								    className: "titem-right"})

								]
							];
				
							this.modelAhorro.data = this.dataAhorro;
							this.skeletonahorro = false;

							this.dataMisc = [
								[new TableItem({data : 'Misceláneo'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldomiscelaneo, this.locale, '1.2-2'),
									tipo : "miscelaneo", moneda: "soles", monto : this.ctasoles.saldomiscelaneo},
									template: this.ctasoles.saldomiscelaneo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
							   	new TableItem({data : {name : formatNumber(this.ctausd.saldomiscelaneo, this.locale,'1.2-2'),
								    tipo : "miscelaneo", moneda : "usd", monto : this.ctausd.saldomiscelaneo },
								    template: this.ctausd.saldomiscelaneo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
								    className: "titem-right"})
							],

								[new TableItem({data : 'Intereses por Pagar'}),
								new TableItem({data : formatNumber(this.ctasoles.intmiscelaneomes, this.locale,'1.2-2'), className: "titem-right"}),
								new TableItem({data : formatNumber(this.ctausd.intmiscelaneomes, this.locale,'1.2-2'), className: "titem-right"})],
							];
	
							this.modelMisc.data = this.dataMisc;
							this.skeletonmisc = false;

						   }       
						});

                   }       
                });

		}

	}

	openAhorroDetalle(tipo : string, moneda : string, monto : number) {
		this.ahorrosservice.Tipo = tipo;
		this.ahorrosservice.Moneda = moneda;
		this.ahorrosservice.Monto = monto;
		this.router.navigate(['socios/ahorrosdetalle']);
	}
}
