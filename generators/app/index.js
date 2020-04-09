"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fss = require('fs');
//const request = require('request');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const imageDownloader = require('./downloader').download;
//variables personalizadas
const respLogin = null;
const respDatosAutor = null;
const tipo = null;
//imports personalizados
const prompLogin_1 = require("./prompLogin");
const prompDatosAutor_1 = require("./prompDatosAutor");
const generadorExpress_1 = require("./generadorExpress");
const generadorIonic_1 = require("./generadorIonic");
module.exports = class extends Generator {
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            // Have Yeoman greet the user.
            this.log(yosay(`Bienvenidos a ${chalk.red('generator-cli-sasf')}!`));
            const prompts = [
                {
                    type: 'list',
                    message: 'Tipo de proyecto',
                    name: 'tipo',
                    choices: ['Express', 'Ionic']
                }
            ];
            //promt de login
            let protLogin = new prompLogin_1.prompLogin();
            this.respLogin = yield protLogin.generarPrompts();
            if (this.respLogin.status) {
                let protDatosAutor = new prompDatosAutor_1.prompDatosAutor(this.appname);
                this.respDatosAutor = yield protDatosAutor.generarPrompts();
                this.tipo = yield this.prompt(prompts).then((props) => {
                    return this.tipoProyecto = props.tipo;
                });
            }
            return;
        });
    }
    writing() {
        if (this.respLogin.status) {
            let datosEscribirArray = new Array();
            if (this.tipoProyecto == "Express") {
                console.log("Generando proyecto de express.");
                let genExpress = new generadorExpress_1.generadorExpress();
                genExpress.addDatoConAdicional("_package-lock.json", "package-lock.json", {
                    appName: this.respDatosAutor.proyecto,
                    empresa: this.respLogin.data.empresa
                });
                genExpress.addDatoConAdicional("_package.json", "package.json", {
                    appName: this.respDatosAutor.proyecto,
                    repositorio: this.respDatosAutor.repositorio,
                    descripcion: this.respDatosAutor.descripcion,
                    autor: this.respDatosAutor.autor,
                    empresa: this.respLogin.data.empresa
                });
                datosEscribirArray = genExpress.obtenerArchivos();
            }
            else {
                console.log("Generando proyecto de ionic");
                let genIonic = new generadorIonic_1.generadorIonic();
                genIonic.addDatoConAdicional("_capacitor.config.json", "capacitor.config.json", {
                    appName: this.respDatosAutor.proyecto
                });
                genIonic.addDatoConAdicional("_package-lock.json", "package-lock.json", {
                    appName: this.respDatosAutor.proyecto,
                    empresa: this.respLogin.data.empresa
                });
                genIonic.addDatoConAdicional("_package.json", "package.json", {
                    appName: this.respDatosAutor.proyecto,
                    repositorio: this.respDatosAutor.repositorio,
                    descripcion: this.respDatosAutor.descripcion,
                    autor: this.respDatosAutor.autor,
                    empresa: this.respLogin.data.empresa
                });
            }
            for (let i = 0; i < datosEscribirArray.length; i++) {
                if (datosEscribirArray[i].adicional == null) {
                    this.fs.copy(this.templatePath(datosEscribirArray[i].origen), this.destinationPath(datosEscribirArray[i].destino));
                }
                else {
                    this.fs.copyTpl(this.templatePath(datosEscribirArray[i].origen), this.destinationPath(datosEscribirArray[i].destino), datosEscribirArray[i].adicional);
                }
            }
            if (this.tipoProyecto == "Express") {
                //Se crea el directorio de resources
                if (!fss.existsSync("resources")) {
                    fss.mkdirSync("resources");
                    console.log("Directorio resources creado.");
                }
                else {
                    console.log("Directorio resources ya eciste.");
                }
            }
            //copiado de logo
            let logoUrl = this.respLogin.data.logo;
            if (logoUrl != "") {
                try {
                    imageDownloader(logoUrl, "resources/logo.png", function () {
                        console.log(`${logoUrl} imagen descargada!!`);
                        console.log("logo.png creado en directorio resources.");
                    });
                }
                catch (error) {
                    console.log(error);
                    console.log("No se pudo descargar la imagen.");
                }
            }
            else {
                this.fs.copy(this.templatePath("logo.png"), this.destinationPath('resources/logo.png'));
            }
        }
    }
    install() {
        if (this.respLogin.status) {
            this.npmInstall(['tsd'], { 'global': true });
            this.npmInstall();
        }
    }
};
