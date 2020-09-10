import { Component, OnInit } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { classCount } from '../../classes/count';
import { CoopeSocios } from '../../classes/coopesocios';
import { vwSociosDetalle } from '../../classes/vwsociosdetalle';
import { CuentasSocio } from '../../classes/cuentassocio';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
	@HostBinding('class.bx--header') headerClass = true;

  db2count : classCount;
  socio : CoopeSocios;
  sociodetalle : vwSociosDetalle;
  ctassocio : CuentasSocio;

	sidemenuactive = false;
	hasHamburger = true;

  constructor(public ibmidservice : IbmidService,
              public db2service : Db2Service,
              private router: Router) { }

  ngOnInit(): void {

  }
    /*
    loguearUser(email:string) {
      this.login(email);

      this.db2service.getSociobyEmail(email).subscribe(
        (resp: any) => {
          if (resp.length == 1) {
            this.socio = resp[0];
            this.ibmidservice.NombreEmpleado = this.socio.nombreempleado.trim();
            this.ibmidservice.CodEmpleado = this.socio.codempleado.trim();
            this.ibmidservice.IsAdmin = this.socio.isadmin;

            console.log("User logged in");

            this.db2service.getSocioDireccion(this.socio.codempleado).subscribe(
              (resp: any) => {
                if (resp.length == 1) {
                  this.sociodetalle = resp[0];
                  this.ibmidservice.DireccionEmpleado = this.sociodetalle.direccionempleado === null ? '---' : this.sociodetalle.direccionempleado.trim();
                }
              });

            this.db2service.getCuentasSocio(this.socio.codempleado).subscribe(
                (resp: any) => {
                  if (resp.length == 1) {
                    this.ctassocio = resp[0];
                    this.ibmidservice.CuentaSoles = this.ctassocio.ctasoles.trim();
                    this.ibmidservice.CuentaUsd = this.ctassocio.ctausd.trim();

                   }

                });

           } else {
            this.logout();
            console.log("User logged out");
          }

        });

    }

    login(email:string) {
      this.ibmidservice.EmailEmpleado = email;
      this.ibmidservice.LoggedIn = true;
    }

    logout() {
      this.ibmidservice.EmailEmpleado = "";
      this.ibmidservice.LoggedIn = false;
      this.router.navigate(['/']);
    }

   getSociobyEmail(email:string) : boolean {

      let foundsocio : boolean;
      foundsocio = false;

      console.log("getSociobyEmail : " + email);

      this.db2service.getSociobyEmail(email).subscribe(
        (resp: any) => {
          if (resp.length == 1) {
            this.socio = resp[0];
            this.ibmidservice.NombreEmpleado = this.socio.nombreempleado;
            console.log( this.socio.nombreempleado);
            foundsocio = true;
          }

        });

        return foundsocio;
    }
*/
	onClickSalir() {
		window.location.href = '/logout';
	}
}
