const os = require('os');
const platform = process.platform;
const osrelease = os.release();

const shell = require('shelljs');
const path = require('path');

const sed = shell.sed;
const exec = shell.exec;
const cp = shell.cp;

const envtmpl = '../src/environments/env.ts.template';
const envfile = '../src/environments/env.ts';

const runningenv = platform === 'win32' ?
    `Windows` :
    (osrelease.includes('microsoft') ?
    `WSL` :
    `linux`
    ) ;

console.log("Running in : " + runningenv);
cp(envtmpl, envfile);

console.log("Updating env vars in env.ts");

const ibmidclientname = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_CLIENTNAME_DEV : process.env.IBMID_CLIENTNAME_PROD;
const ibmidclientid = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_CLIENTID_DEV : process.env.IBMID_CLIENTID_PROD;
const ibmidclientsecret = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_CLIENTSECRET_DEV : process.env.IBMID_CLIENTSECRET_PROD;
const ibmidauthendpoint = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_AUTHENDPOINT_DEV : process.env.IBMID_AUTHENDPOINT_PROD;
const ibmidtokenendpoint = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_TOKENENDPOINT_DEV : process.env.IBMID_TOKENENDPOINT_PROD;
const ibmiduserinfoendpoint = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_USERINFOENDPOINT_DEV : process.env.IBMID_USERINFOENDPOINT_PROD;
const ibmidintrospectionendpoint = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_INTROSPECTIONENDPOINT_DEV : process.env.IBMID_INTROSPECTIONENDPOINT_PROD;
const ibmiddiscoveryendpoint = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_DISCOVERYENDPOINT_DEV : process.env.IBMID_DISCOVERYENDPOINT_PROD;
const ibmidjwksendpoint = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_JWKSENDPOINT_DEV : process.env.IBMID_JWKSENDPOINT_PROD;
const ibmidissuer = process.env.TRAVIS_BRANCH === 'dev' ? process.env.IBMID_ISSUER_DEV : process.env.IBMID_ISSUER_PROD;

const coopeapiurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.COOPEAPI_URL_DEV : process.env.COOPEAPI_URL_PROD;
const coopeapiapikey = process.env.TRAVIS_BRANCH === 'dev' ? process.env.COOPEAPI_APIKEY_DEV : process.env.COOPEAPI_APIKEY_PROD;
const coopeapisecret = process.env.TRAVIS_BRANCH === 'dev' ? process.env.COOPEAPI_SECRET_DEV : process.env.COOPEAPI_SECRET_PROD;

sed('-i', '<IBMID.CLIENTNAME>', '"' + ibmidclientname + '"', envfile);
sed('-i', '<IBMID.CLIENTID>', '"' + ibmidclientid + '"', envfile);
sed('-i', '<IBMID.CLIENTSECRET>', '"' + ibmidclientsecret + '"', envfile);
sed('-i', '<IBMID.AUTHENDPOINT>', '"' + ibmidauthendpoint + '"', envfile);
sed('-i', '<IBMID.TOKENENDPOINT>', '"' + ibmidtokenendpoint + '"', envfile);
sed('-i', '<IBMID.USERINFOENDPOINT>', '"' + ibmiduserinfoendpoint + '"', envfile);
sed('-i', '<IBMID.INTROSPECTIONENDPOINT>', '"' + ibmidintrospectionendpoint + '"', envfile);
sed('-i', '<IBMID.DISCOVERYENDPOINT>', '"' + ibmiddiscoveryendpoint + '"', envfile);
sed('-i', '<IBMID.JWKSENDPOINT>', '"' + ibmidjwksendpoint + '"', envfile);
sed('-i', '<IBMID.ISSUER>', '"' + ibmidissuer + '"', envfile);

sed('-i', '<COOPEAPI.URL>', '"' + coopeapiurl + '"', envfile);
sed('-i', '<COOPEAPI.APIKEY>', '"' + coopeapiapikey + '"', envfile);
sed('-i', '<COOPEAPI.SECRET>', '"' + coopeapisecret + '"', envfile);

console.log("Finish setting env vars in env.ts");
