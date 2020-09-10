import { Injectable } from '@angular/core';
// import { env } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class IbmidService {

  private clientname : string;
  private clientid : string;
  private clientsecret : string;
  private authendpoint : string;
  private tokenendpoint : string;
  private userinfoendpoint : string;
  private introspectionendppint : string;
  private discoveryendpoint : string;
  private jwksendpoint : string;
  private issuer : string;

  private loggedin : boolean;
  private emailempleado : string;
  private codempleado : string;
  private nombreempleado : string;
  private direccionempleado : string;
  private ctasoles : string;
  private ctausd : string;
  private isadmin : boolean;

  constructor() {
	/*
    this.clientname = env.ibmid.ClientName;
    this.clientid = env.ibmid.ClientID;
    this.clientsecret = env.ibmid.ClientSecret;
    this.authendpoint = env.ibmid.AuthEndpoint;
    this.tokenendpoint = env.ibmid.TokenEndPoint;
    this.userinfoendpoint = env.ibmid.UserInfoEndPoint;
    this.introspectionendppint = env.ibmid.IntrospectionEndPoint;
    this.discoveryendpoint = env.ibmid.DiscoveryEndpoint;
    this.jwksendpoint = env.ibmid.JWKSEndpoint;
    this.issuer = env.ibmid.Issuer;
	*/
    this.loggedin = false;
    this.emailempleado = "";
    this.codempleado = "";
    this.nombreempleado = "";
    this.direccionempleado = "";
    this.isadmin = false;

  }

  get ClientName():string{
    return this.clientname;
  }

  get ClientId():string{
    return this.clientid;
  }

  get DiscoveryEndpoint():string{
    return this.discoveryendpoint;
  }

  get EmailEmpleado():string{
    return this.emailempleado;
  }
  set EmailEmpleado(val : string) {
    this.emailempleado = val;
  }

  get CodEmpleado():string{
    return this.codempleado;
  }
  set CodEmpleado(val: string) {
    this.codempleado = val;
  }

  get NombreEmpleado():string{
    return this.nombreempleado;
  }
  set NombreEmpleado(val: string) {
    this.nombreempleado = val;
  }

  get DireccionEmpleado():string{
    return this.direccionempleado;
  }
  set DireccionEmpleado(val: string) {
    this.direccionempleado = val;
  }

  get CuentaSoles():string{
    return this.ctasoles;
  }
  set CuentaSoles(val: string) {
    this.ctasoles = val;
  }

  get CuentaUsd():string{
    return this.ctausd;
  }
  set CuentaUsd(val: string) {
    this.ctausd = val;
  }

  get LoggedIn():boolean{
    return this.loggedin;
  }
  set LoggedIn(val: boolean){
    this.loggedin = val;
  }

  get IsAdmin():boolean{
    return this.isadmin;
  }
  set IsAdmin(val: boolean){
    this.isadmin = val;
  }


}
