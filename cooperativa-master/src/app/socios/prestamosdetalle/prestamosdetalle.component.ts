import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe,formatNumber, formatDate } from '@angular/common';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { PrestamosService } from '../../services/prestamos.service';
import { Router } from '@angular/router';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem
} from 'carbon-components-angular';
import { PrestamosPagos } from '../../classes/prestamospagos';
import { PagosTotales } from '../../classes/pagostotales';
import { Garantes } from '../../classes/garantes';

@Component({
  selector: 'app-prestamosdetalle',
  templateUrl: './prestamosdetalle.component.html',
  styleUrls: ['./prestamosdetalle.component.scss']
})
export class PrestamosdetalleComponent implements OnInit {

  dataPrestamosCancelados = [];
	modelPrestamosCancelados: TableModel;
	skeletonPrestamoModelCancelados = Table.skeletonModel(10, 8);
	skeletonprestamocancelados = true;
 
  dataPrestamosPendientes = [];
	modelPrestamosPendientes: TableModel;
	skeletonPrestamoModelPendientes = Table.skeletonModel(10, 6);
	skeletonprestamopendientes = true;
 
  dataTotales = [];
	modelTotales: TableModel;
	skeletonTotales = Table.skeletonModel(3, 5);
  skeletontotales = true;

  dataGarantes = [];
	modelGarantes: TableModel;
	skeletonGarantes = Table.skeletonModel(5, 2);
  skeletongarantes = true;

  TituloTabla : string;
  Interes : string;
  prestamospagos : PrestamosPagos;
  pagostotales : PagosTotales;
  garantes : Garantes;
  dateVencimiento : Date;
  datePago : Date;

  constructor(public ibmidservice : IbmidService, 
    public db2service : Db2Service,
    private prestamosservice : PrestamosService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
    ) { }

  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

      this.TituloTabla = 'Cuotas préstamo ' + this.prestamosservice.Operacion + ' ( ' + this.prestamosservice.Moneda + ' )';
      this.Interes = formatNumber( this.prestamosservice.Interes, this.locale,'1.9-9')

      this.modelPrestamosCancelados = new TableModel();
			this.modelPrestamosCancelados.header = [
				new TableHeaderItem({data: 'Cuota'}),
				new TableHeaderItem({data: 'Fecha Venc.'}),
        new TableHeaderItem({data: 'Total Cuota'}),
        new TableHeaderItem({data: 'Amortización'}),
        new TableHeaderItem({data: 'Interés'}),
				new TableHeaderItem({data: 'Interés Moratorio'}),
				new TableHeaderItem({data: 'Estado'}),
				new TableHeaderItem({data: 'Fecha Cancelación'}),
			];

  
      this.modelPrestamosPendientes = new TableModel();
			this.modelPrestamosPendientes.header = [
				new TableHeaderItem({data: 'Cuota'}),
				new TableHeaderItem({data: 'Fecha Venc.'}),
        new TableHeaderItem({data: 'Total Cuota'}),
        new TableHeaderItem({data: 'Amortización'}),
        new TableHeaderItem({data: 'Interés'}),
				new TableHeaderItem({data: 'Interés Moratorio'}),
			];

      this.modelTotales = new TableModel();
			this.modelTotales.header = [
				new TableHeaderItem({data: 'Descripción'}),
        new TableHeaderItem({data: 'Total Cuota'}),
        new TableHeaderItem({data: 'Amortización'}),
        new TableHeaderItem({data: 'Interés'}),
				new TableHeaderItem({data: 'Interés Moratorio'}),
			];

      this.modelGarantes = new TableModel();
			this.modelGarantes.header = [
				new TableHeaderItem({data: 'Documento de identificación'}),
        new TableHeaderItem({data: 'Nombre'}),
			];

      this.db2service.getPagosCancelados(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {
  
          if (resp.length > 0 ) {
 
            //fill table detalle
            for (var i = 0; i < resp.length; i++) {
              this.prestamospagos = resp[i];

              this.dateVencimiento = new Date(this.prestamospagos.fecvencimiento.trim());
              this.datePago = new Date(this.prestamospagos.fecpago.trim());

              this.dataPrestamosCancelados.push(
								[	new TableItem({data : this.prestamospagos.cuota }),
                new TableItem({data : formatDate( this.dateVencimiento, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : formatNumber( this.prestamospagos.montocuota, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.monto, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interes, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interesmoratorio, this.locale,'1.2-2'), className: "titem-right" }),              
								new TableItem({data : 'CAN' }),
                new TableItem({data : formatDate( this.datePago, 'dd-MM-yyyy', this.locale) })
              ]
							);
 
            }

          }

          this.modelPrestamosCancelados.data = this.dataPrestamosCancelados;
          this.skeletonprestamocancelados = false;

        }
      );


      this.db2service.getPagosPendientes(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {
  
          if (resp.length > 0 ) {
 
            //fill table detalle
            for (var i = 0; i < resp.length; i++) {
              this.prestamospagos = resp[i];

              this.dateVencimiento = new Date(this.prestamospagos.fecvencimiento.trim());

              this.dataPrestamosPendientes.push(
                [	new TableItem({data : this.prestamospagos.cuota }),
                new TableItem({data : formatDate( this.dateVencimiento, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : formatNumber( this.prestamospagos.montocuota, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.monto, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interes, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interesmoratorio, this.locale,'1.2-2'), className: "titem-right" })
              ]
              );
 
            }

          }
   
          this.modelPrestamosPendientes.data = this.dataPrestamosPendientes;
          this.skeletonprestamopendientes = false;

        }
      );

      this.db2service.getPagosTotales(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {
  
          if (resp.length == 1 ) {
 
              this.pagostotales = resp[0];

              this.dataTotales.push(
                [	new TableItem({data : 'Totales' }),
                new TableItem({data : formatNumber( this.pagostotales.totalcuotas, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.pagostotales.totalmontos, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.pagostotales.totalinteres, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.pagostotales.totalinteresmoratorio, this.locale,'1.2-2'), className: "titem-right" })
              ]
              );
 
           }
   
           this.db2service.getPagosTotalPendientes(this.prestamosservice.Operacion).subscribe(
            (resp: any) => {
      
              if (resp.length == 1 ) {
     
                  this.pagostotales = resp[0];
    
                  this.dataTotales.push(
                    [	new TableItem({data : 'Pendientes' }),
                    new TableItem({data : formatNumber( this.pagostotales.totalcuotas, this.locale,'1.2-2'), className: "titem-right" }),
                    new TableItem({data : formatNumber( this.pagostotales.totalmontos, this.locale,'1.2-2'), className: "titem-right" }),
                    new TableItem({data : formatNumber( this.pagostotales.totalinteres, this.locale,'1.2-2'), className: "titem-right" }),
                    new TableItem({data : formatNumber( this.pagostotales.totalinteresmoratorio, this.locale,'1.2-2'), className: "titem-right" })
                  ]
                  );
     
               }
        
            }
          );

          this.db2service.getPagosTotalCancelados(this.prestamosservice.Operacion).subscribe(
            (resp: any) => {
      
              if (resp.length == 1 ) {
     
                  this.pagostotales = resp[0];
    
                  this.dataTotales.push(
                    [	new TableItem({data : 'Cancelados' }),
                    new TableItem({data : formatNumber( this.pagostotales.totalcuotas, this.locale,'1.2-2'), className: "titem-right" }),
                    new TableItem({data : formatNumber( this.pagostotales.totalmontos, this.locale,'1.2-2'), className: "titem-right" }),
                    new TableItem({data : formatNumber( this.pagostotales.totalinteres, this.locale,'1.2-2'), className: "titem-right" }),
                    new TableItem({data : formatNumber( this.pagostotales.totalinteresmoratorio, this.locale,'1.2-2'), className: "titem-right" })
                  ]
                  );
     
               }
        
            }
          );

          this.modelTotales.data = this.dataTotales;
          this.skeletontotales = false;

        }
      );

      this.db2service.getDetallesGarantes(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {

          if (resp.length > 0 ) {
 
            for (var i = 0; i < resp.length; i++) {
  
              this.garantes = resp[i];
              this.dataGarantes.push(
                [	new TableItem({data : this.garantes.docidgarante.trim() }),
                  new TableItem({data : this.garantes.nombregarante.trim() })
                ]
              );
 
            }
          }
    
          this.modelGarantes.data = this.dataGarantes;
          this.skeletongarantes = false;

        }
      );



    }

  }

}
