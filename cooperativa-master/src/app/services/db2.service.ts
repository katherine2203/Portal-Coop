import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient,
         HttpParams,
         HttpErrorResponse, 
         HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { env } from '../../environments/env';

const endpoint = env.coopeapi.apiurl;
const headers= new HttpHeaders()
  .set('apikey', env.coopeapi.apikey)
  .set('secret', env.coopeapi.secret);

@Injectable({
  providedIn: 'root'
})

export class Db2Service {

  constructor(private http: HttpClient) {

   }

   private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getCoopeSociosCount(): Observable<any> {

    return this.http.get(endpoint + 'coopesocios/count', { 'headers': headers, responseType: 'json'} )
    .pipe(
      catchError(this.handleError)
      )

  }

  getSociobyEmail(email : string) : Observable<any>{
    const params = new HttpParams()
      .set('filter', '{"where":{"emailempleado":"' + email + '"}}');
   
      return this.http.get(endpoint + 'coopesocios', { params, 'headers': headers, responseType: 'json'} )
      .pipe(
       catchError(this.handleError)
      )
  }

  getSocioDireccion(codemp : string) : Observable<any>{
    const params = new HttpParams()
      .set('filter', '{"where":{"codempleado":"' + codemp + '"}}');
   
      return this.http.get(endpoint + 'vwsociosdetalles', { params, 'headers': headers, responseType: 'json'} )
      .pipe(
       catchError(this.handleError)
      )
  }

  getCuentasSocio(codemp : string) : Observable<any>{
    const params = new HttpParams()
      .set('filter', '{"where":{"codempleado":"' + codemp + '"}}');
   
      return this.http.get(endpoint + 'ctasempleados', { params, 'headers': headers, responseType: 'json'} )
      .pipe(
       catchError(this.handleError)
      )
  }

  getCuentasSolesDetalle(codemp : string) : Observable<any>{
    const params = new HttpParams()
      .set('filter', '{"where":{"codempleado":"' + codemp + '"}}');
   
      return this.http.get(endpoint + 'ctassoles', { params, 'headers': headers, responseType: 'json'} )
      .pipe(
       catchError(this.handleError)
      )
  }

  getCuentasUsdDetalle(codemp : string) : Observable<any>{
    const params = new HttpParams()
      .set('filter', '{"where":{"codempleado":"' + codemp + '"}}');
   
      return this.http.get(endpoint + 'ctasusd', { params, 'headers': headers, responseType: 'json'} )
      .pipe(
       catchError(this.handleError)
      )
    }

   getMovimientosAhorroDetalle(cuenta : string, tipo : string) : Observable<any>{
      let lbcont : string;
      switch (tipo) {
        case "contable" :
          lbcont = "movahorros";
          break; 

        case "bloqueado" :
          lbcont = "movbloqueos";
          break; 
  
        case "aportaciones" :
          lbcont = "movaportaciones";
          break; 
  
        case "miscelaneo" :
          lbcont = "movmiscelaneos";
          break; 
  
      }

      const params = new HttpParams()
        .set('filter', '{"where":{"ctacliente":"' + cuenta + '"}, "order":["fecemision DESC"]}');
     
        return this.http.get(endpoint + lbcont, { params, 'headers': headers, responseType: 'json'} )
        .pipe(
         catchError(this.handleError)
        )
      }
  
      getOperacionesPrestamos(cuenta : string, tipo : string) : Observable<any>{
        let lbcont : string;
        switch (tipo) {

          case "medianop" :
            lbcont = "pracademico";
            break;
  
          case "auto" :
            lbcont = "prautomovil";
            break;
    
          case "consumo" :
            lbcont = "prconsumo";
            break;
    
          case "cortop" :
            lbcont = "prcortoplazo";
            break;
  
          case "esp1" :
            lbcont = "presp1";
            break;

          case "esp2" :
            lbcont = "presp2";
            break;

          case "hipotecario" :
            lbcont = "prhipotecario";
            break;

          case "largop" :
            lbcont = "prlargoplazo";
            break; 

          case "ps" :
            lbcont = "prps";
            break; 
   
          case "solafirma" :
            lbcont = "prsolafirma";
            break; 
      
        }
  
        const params = new HttpParams()
          .set('filter', '{"where":{"ctacliente":"' + cuenta + '"}, "order":["feccartera ASC"]}');
       
          return this.http.get(endpoint + lbcont, { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getPagosCancelados(operacion : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}, "order":["cuota ASC"]}');
       
          return this.http.get(endpoint + 'planpagoscancelados', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }
    
      getPagosPendientes(operacion : string) : Observable<any>{
          const params = new HttpParams()
            .set('filter', '{"where":{"numoperacion":"' + operacion + '"}, "order":["cuota ASC"]}');
         
            return this.http.get(endpoint + 'planpagospendientes', { params, 'headers': headers, responseType: 'json'} )
            .pipe(
             catchError(this.handleError)
            )
      }
  
      getPagosTotales(operacion : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}}');
       
          return this.http.get(endpoint + 'planpagostotales', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getPagosTotalPendientes(operacion : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}}');
       
          return this.http.get(endpoint + 'planpagostotalpendientes', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getPagosTotalCancelados(operacion : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}}');
       
          return this.http.get(endpoint + 'planpagostotalcancelados', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }
   
      getDetallesGarantes(operacion : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}, "order":["docidgarante ASC"]}');
       
          return this.http.get(endpoint + 'garantesdetalle', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }
   
      getCertificadosMontosTotales(cuenta : string, tipo : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"ctacliente":"' + cuenta + '", "tipocert":"' + tipo + '"} }');
       
          return this.http.get(endpoint + 'certificadosmontostotales', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getCertificadosDetalles(cuenta : string, tipo : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"ctacliente":"' + cuenta + '", "tipocert":"' + tipo + '"}, "order":["fecemision ASC", "numdoc ASC"] }');
       
          return this.http.get(endpoint + 'certificadosmontos', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

     getGarantizados(codemp : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"codempleado":"' + codemp + '"} }');
       
          return this.http.get(endpoint + 'garantizados', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getFra(codemp : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"codempleado":"' + codemp + '"} }');
       
          return this.http.get(endpoint + 'fra', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getSiniestros(codemp : string) : Observable<any>{
        const params = new HttpParams()
          .set('filter', '{"where":{"codempleado":"' + codemp + '"} }');
  
          return this.http.get(endpoint + 'siniestros', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getIbmers() : Observable<any>{
        const params = new HttpParams()
   
          return this.http.get(endpoint + 'vwibmers', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }

      getExibmers() : Observable<any>{
        const params = new HttpParams()
   
          return this.http.get(endpoint + 'vwexibmers', { params, 'headers': headers, responseType: 'json'} )
          .pipe(
           catchError(this.handleError)
          )
      }


   private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}


