import { Component, OnInit, Inject, LOCALE_ID, ViewChild, TemplateRef} from '@angular/core';
import { DecimalPipe,formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { PrestamosService } from '../../services/prestamos.service';
import { CuentasDetalle } from '../../classes/cuentasdetalle';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem
} from 'carbon-components-angular';

@Component({
	selector: 'app-prestamos',
	templateUrl: './prestamos.component.html',
	styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

	dataPrestamo = [];
	modelPrestamo: TableModel;
	skeletonPrestamoModel = Table.skeletonModel(11, 3);
	skeletonprestamo = true;

	ctasoles : CuentasDetalle;
	ctausd : CuentasDetalle;

	constructor(public ibmidservice : IbmidService, 
		public db2service : Db2Service,
		private prestamosservice : PrestamosService,
		@Inject(LOCALE_ID) private locale: string,
		private router: Router
		) { }

	@ViewChild("activeItemTemplate")
	protected activeItemTemplate: TemplateRef<any>;

	@ViewChild("inactiveItemTemplate")
	protected inactiveItemTemplate: TemplateRef<any>;
	
	ngOnInit(): void {

		if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

			this.modelPrestamo = new TableModel();
			this.modelPrestamo.header = [
				new TableHeaderItem({data: 'Préstamos'}),
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
		
							if (this.ctasoles.saldopressolafirma > 0 || this.ctausd.saldopressolafirma > 0) {
							this.dataPrestamo.push(
								[new TableItem({data : 'A Sola firma'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopressolafirma, this.locale,'1.2-2'),
									tipo : "solafirma", moneda : "soles", monto : this.ctasoles.saldopressolafirma },
									template: this.ctasoles.saldopressolafirma != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopressolafirma, this.locale,'1.2-2'),
									tipo : "solafirma", moneda : "usd", monto : this.ctausd.saldopressolafirma},
									template: this.ctausd.saldopressolafirma != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
						    }
				
							if (this.ctasoles.saldopresconsumo > 0 || this.ctausd.saldopresconsumo > 0 ) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Consumo'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopresconsumo, this.locale,'1.2-2'),
									tipo : "consumo", moneda : "soles", monto : this.ctasoles.saldopresconsumo },
									template: this.ctasoles.saldopresconsumo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopresconsumo, this.locale,'1.2-2'),
									tipo : "consumo", moneda : "usd", monto : this.ctausd.saldopresconsumo},
									template: this.ctausd.saldopresconsumo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
							}

							if (this.ctasoles.saldoprescortoplazo > 0 || this.ctausd.saldoprescortoplazo > 0) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Corto Plazo'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldoprescortoplazo, this.locale,'1.2-2'),
									tipo : "cortop", moneda : "soles", monto : this.ctasoles.saldoprescortoplazo },
									template: this.ctasoles.saldoprescortoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldoprescortoplazo, this.locale,'1.2-2'),
									tipo : "cortop", moneda : "usd", monto : this.ctausd.saldoprescortoplazo},
									template: this.ctausd.saldoprescortoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
							}
				
							if (this.ctasoles.saldopresmedianoplazo > 0 || this.ctausd.saldopresmedianoplazo > 0 ) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Mediano Plazo'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopresmedianoplazo, this.locale,'1.2-2'),
									tipo : "medianop", moneda : "soles", monto : this.ctasoles.saldopresmedianoplazo },
									template: this.ctasoles.saldopresmedianoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopresmedianoplazo, this.locale,'1.2-2'),
									tipo : "medianop", moneda : "usd", monto : this.ctausd.saldopresmedianoplazo},
									template: this.ctausd.saldopresmedianoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
							}
				
							if (this.ctasoles.saldopreslargoplazo > 0 || this.ctausd.saldopreslargoplazo > 0) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Largo Plazo'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopreslargoplazo, this.locale,'1.2-2'),
									tipo : "largop", moneda : "soles", monto : this.ctasoles.saldopreslargoplazo },
									template: this.ctasoles.saldopreslargoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopreslargoplazo, this.locale,'1.2-2'),
									tipo : "largop", moneda : "usd", monto : this.ctausd.saldopreslargoplazo},
									template: this.ctausd.saldopreslargoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
							}

							if ( this.ctasoles.saldopreshipotecario > 0 || this.ctausd.saldopreshipotecario > 0 ) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Hipotecario'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopreshipotecario, this.locale,'1.2-2'),
									tipo : "hipotecario", moneda : "soles", monto : this.ctasoles.saldopreshipotecario },
									template: this.ctasoles.saldopreshipotecario != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopreshipotecario, this.locale,'1.2-2'),
									tipo : "hipotecario", moneda : "usd", monto : this.ctausd.saldopreshipotecario},
									template: this.ctausd.saldopreshipotecario != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})					
								]
							);
							}
							
							if (this.ctasoles.saldopresauto > 0 || this.ctausd.saldopresauto > 0) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Automóvil'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopresauto, this.locale,'1.2-2'),
									tipo : "auto", moneda : "soles", monto : this.ctasoles.saldopresauto },
									template: this.ctasoles.saldopresauto != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopresauto, this.locale,'1.2-2'),
									tipo : "auto", moneda : "usd", monto : this.ctausd.saldopresauto},
									template: this.ctausd.saldopresauto != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
							}

							if (this.ctasoles.saldopresps1 > 0 || this.ctausd.saldopresps1 > 0)
							this.dataPrestamo.push(
								[new TableItem({data : 'PS'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopresps1, this.locale,'1.2-2'),
									tipo : "ps", moneda : "soles", monto : this.ctasoles.saldopresps1 },
									template: this.ctasoles.saldopresps1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopresps1, this.locale,'1.2-2'),
									tipo : "ps", moneda : "usd", monto : this.ctausd.saldopresps1},
									template: this.ctausd.saldopresps1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);

							if (this.ctasoles.saldopresesp1 > 0 ||  this.ctausd.saldopresesp1 > 0) {
							this.dataPrestamo.push(
								[new TableItem({data : 'Especial 1'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopresesp1, this.locale,'1.2-2'),
									tipo : "esp1", moneda : "soles", monto : this.ctasoles.saldopresesp1 },
									template: this.ctasoles.saldopresesp1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopresesp1, this.locale,'1.2-2'),
									tipo : "esp1", moneda : "usd", monto : this.ctausd.saldopresesp1},
									template: this.ctausd.saldopresesp1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
							}

							if (this.ctasoles.saldopresesp2 > 0 || this.ctausd.saldopresesp2 > 0 )
							this.dataPrestamo.push(
								[new TableItem({data : 'Especial 2'}),
								new TableItem({data : {name : formatNumber(this.ctasoles.saldopresesp2, this.locale,'1.2-2'),
									tipo : "esp2", moneda : "soles", monto : this.ctasoles.saldopresesp2 },
									template: this.ctasoles.saldopresesp2 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"}),
								new TableItem({data : {name : formatNumber(this.ctausd.saldopresesp2, this.locale,'1.2-2'),
									tipo : "esp2", moneda : "usd", monto : this.ctausd.saldopresesp2},
									template: this.ctausd.saldopresesp2 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
									className: "titem-right"})
								]
							);
				
							this.modelPrestamo.data = this.dataPrestamo;
							this.skeletonprestamo = false;

						   }       
						});

                   }       
                });


		}
	}

	openPrestamoOperacion(tipo : string, moneda : string, monto : number) {
		this.prestamosservice.Tipo = tipo;
		this.prestamosservice.Moneda = moneda;
		this.prestamosservice.Monto = monto;
		this.router.navigate(['socios/prestamosoperacion']);
	}

}
