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
import { prompLogin } from "./prompLogin";
import { prompDatosAutor } from "./prompDatosAutor";
import { generadorExpress } from "./generadorExpress";
import { metadataGenerador } from "./metadataGenerador";
import { generadorIonic } from "./generadorIonic";

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Bienvenidos a ${chalk.red('generator-cli-sasf')}!`)
    );

    const prompts = [
      {
        type: 'list',
        message: 'Tipo de proyecto',
        name: 'tipo',
        choices: ['Express', 'Ionic']
      }
    ];
    //promt de login
    let protLogin: prompLogin = new prompLogin();
    this.respLogin = await protLogin.generarPrompts();
    if (this.respLogin.status) {
      let protDatosAutor: prompDatosAutor = new prompDatosAutor(this.appname);
      this.respDatosAutor = await protDatosAutor.generarPrompts();
      this.tipo = await this.prompt(prompts).then((props: any) => {
        return this.tipoProyecto = props.tipo;
      });
    }
    return;
  }

  writing() {
    if (this.respLogin.status) {
      let datosEscribirArray: metadataGenerador[] = new Array();
      if (this.tipoProyecto == "Express") {
        console.log("Generando proyecto de express.");
        let genExpress: generadorExpress = new generadorExpress();
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
        let genIonic: generadorIonic = new generadorIonic();
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
        })
      }

      for (let i = 0; i < datosEscribirArray.length; i++) {
        if (datosEscribirArray[i].adicional == null) {
          this.fs.copy(
            this.templatePath(datosEscribirArray[i].origen),
            this.destinationPath(datosEscribirArray[i].destino)
          );
        }
        else {
          this.fs.copyTpl(
            this.templatePath(datosEscribirArray[i].origen),
            this.destinationPath(datosEscribirArray[i].destino), datosEscribirArray[i].adicional
          );
        }
      }

      if (this.tipoProyecto == "Express") {
        //Se crea el directorio de resources
        if (!fss.existsSync("resources")) {
          fss.mkdirSync("resources");
          console.log("Directorio resources creado.")
        }
        else {
          console.log("Directorio resources ya eciste.")
        }

      }

      //copiado de logo
      let logoUrl: string = this.respLogin.data.logo;
      if (logoUrl != "") {
        try {
          imageDownloader(logoUrl, "resources/logo.png", function () {
            console.log(`${logoUrl} imagen descargada!!`);
            console.log("logo.png creado en directorio resources.")
          });
        } catch (error) {
          console.log(error);
          console.log("No se pudo descargar la imagen.");
        }
      }
      else {
        this.fs.copy(
          this.templatePath("logo.png"),
          this.destinationPath('resources/logo.png')
        );
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