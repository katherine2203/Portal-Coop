import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { CoopeSocios } from '../../classes/coopesocios';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link
} from 'carbon-components-angular';

@Component({
  selector: 'app-listasocios',
  templateUrl: './listasocios.component.html',
  styleUrls: ['./listasocios.component.scss']
})
export class ListasociosComponent implements OnInit {

  dataIbmer = [];
	modelIbmer: TableModel;
	skeletonIbmer = Table.skeletonModel(10, 3);
	skeletonibmer = true;

  dataExibmer = [];
	modelExibmer: TableModel;
	skeletonExibmer = Table.skeletonModel(10, 3);
	skeletonexibmer = true;

	socio : CoopeSocios;

  constructor(public ibmidservice : IbmidService, 
    public db2service : Db2Service,
    private router: Router
    ) { }

  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn || !this.ibmidservice.IsAdmin) {
			this.router.navigate(['/']);
		} else {

      this.modelIbmer = new TableModel();
			this.modelIbmer.header = [
				new TableHeaderItem({data: 'Cod. Empleado'}),
				new TableHeaderItem({data: 'email'}),
				new TableHeaderItem({data: 'Nombre'}),
			];

      this.modelExibmer = new TableModel();
			this.modelExibmer.header = [
				new TableHeaderItem({data: 'Cod. Empleado'}),
				new TableHeaderItem({data: 'email'}),
				new TableHeaderItem({data: 'Nombre'}),
			];

      this.db2service.getIbmers().subscribe(
        (resp: any) => {
  
          if (resp.length > 0 ) {
 
            for (var i = 0; i < resp.length; i++) {
              this.socio = resp[i];

              this.dataIbmer.push(
                [	new TableItem({data : this.socio.codempleado }),
                  new TableItem({data : this.socio.emailempleado }),
                  new TableItem({data : this.socio.nombreempleado }),
                ]
              );

            }

            this.modelIbmer.data = this.dataIbmer;
            this.skeletonibmer = false;
  
          }
 
        });

      this.db2service.getExibmers().subscribe(
        (resp: any) => {
  
          if (resp.length > 0 ) {
 
            for (var i = 0; i < resp.length; i++) {
              this.socio = resp[i];

              this.dataExibmer.push(
                [	new TableItem({data : this.socio.codempleado }),
                  new TableItem({data : this.socio.emailempleado }),
                  new TableItem({data : this.socio.nombreempleado }),
                ]
              );

            }

            this.modelExibmer.data = this.dataExibmer;
            this.skeletonexibmer = false;
 
          }
   
        });
  

    }

  }

}
