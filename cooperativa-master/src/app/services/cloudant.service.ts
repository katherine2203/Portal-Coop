import { Injectable } from '@angular/core';
import { env } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class CloudantService {

  apikey : string;
  host : string;
  iamapikeydesc : string;
  iamapikeyname : string;
  iamrole : string;
  iamserviceid : string;
  password : string;
  port : number;
  url : string;
  username : string;

  constructor() {

    this.apikey = env.cloudantdb.apikey;
    this.host = env.cloudantdb.host;
    this.iamapikeydesc = env.cloudantdb.iam_apikey_description;
    this.iamapikeyname = env.cloudantdb.iam_apikey_name;
    this.iamrole = env.cloudantdb.iam_role_crn;
    this.iamserviceid = env.cloudantdb.iam_serviceid_crn;
    this.password = env.cloudantdb.password;
    this.port = env.cloudantdb.port;
    this.url = env.cloudantdb.url;
    this.username = env.cloudantdb.username;
  
   }
}
