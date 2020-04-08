'use strict';
const fss = require('fs');
const request = require('request');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const imageDownloader = require('./downloader').download;
const logo = "logo.png";
const tipoProyecto = "Express";
const linkRepositorio = "";
const logoUrl = "";
const autor = "";
const descripcion = "";
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Bienvenidos a ${chalk.red('generator-cli-sasf')}!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Nombre del proyecto",
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "autor",
        message: "Nombre del autor"
      },
      {
        type: "input",
        name: "descripcion",
        message: "Descripción del proyecto"
      },
      {
        type: "input",
        name: "repositorio",
        message: "Url del repositorio de git"
      },
      {
        type: "input",
        name: "logo",
        message: "Ruta del logo",
        default: "logo.png" // Default to current folder name
      },
      {
        type: "input",
        name: "urlLogo",
        message: "Url del logo"
      },
      {
        type: 'list',
        message: 'Tipo de proyecto',
        name: 'tipo',
        choices: ['Express', 'Ionic']
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.appname = this.props.name.replace(/ /g, "")
      this.logo = this.props.logo;
      this.tipoProyecto = this.props.tipo;
      this.linkRepositorio = this.props.repositorio;
      this.logoUrl = this.props.urlLogo;
      this.autor = this.props.autor;
      this.description = this.props.descripcion;
    });
  }

  writing() {
    if (this.tipoProyecto == "Express") {
      console.log("Generando proyecto de express.");
      this.fs.copy(
        this.templatePath('express/config'),
        this.destinationPath('config')
      );
      this.fs.copy(
        this.templatePath('express/migrations'),
        this.destinationPath('migrations')
      );
      this.fs.copy(
        this.templatePath('express/models'),
        this.destinationPath('models')
      );
      this.fs.copy(
        this.templatePath('express/src'),
        this.destinationPath('src')
      );
      this.fs.copy(
        this.templatePath('express/_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('express/_package-lock.json'),
        this.destinationPath('package-lock.json'), {
        appName: this.appname
      }
      );
      this.fs.copyTpl(
        this.templatePath('express/_package.json'),
        this.destinationPath('package.json'), {
        appName: this.appname,
        repositorio: this.linkRepositorio,
        descripcion: this.description,
        autor: this.autor
      }
      );
      this.fs.copy(
        this.templatePath('express/README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('express/tsconfig.json'),
        this.destinationPath('tsconfig.json')
      );
    }
    else {
      console.log("Generando proyecto de ionic");
      this.fs.copy(
        this.templatePath('ionic/e2e'),
        this.destinationPath('e2e')
      );
      this.fs.copy(
        this.templatePath('ionic/src'),
        this.destinationPath('src')
      );
      this.fs.copy(
        this.templatePath('ionic/_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('ionic/angular.json'),
        this.destinationPath('angular.json')
      );
      this.fs.copy(
        this.templatePath('ionic/browserslist'),
        this.destinationPath('browserslist')
      );
      this.fs.copyTpl(
        this.templatePath('ionic/_capacitor.config.json'),
        this.destinationPath('capacitor.config.json'), {
        appName: this.appname
      }
      );
      this.fs.copy(
        this.templatePath('ionic/ionic.config.json'),
        this.destinationPath('ionic.config.json')
      );
      this.fs.copy(
        this.templatePath('ionic/karma.conf.js'),
        this.destinationPath('karma.conf.js')
      );
      this.fs.copyTpl(
        this.templatePath('ionic/_package-lock.json'),
        this.destinationPath('package-lock.json'),
        {
          appName: this.appname
        }
      );
      this.fs.copyTpl(
        this.templatePath('ionic/_package.json'),
        this.destinationPath('package.json'),
        {
          appName: this.appname,
          repositorio: this.linkRepositorio,
          descripcion: this.description,
          autor: this.autor
        }
      );
      this.fs.copy(
        this.templatePath('ionic/tsconfig.app.json'),
        this.destinationPath('tsconfig.app.json')
      );
      this.fs.copy(
        this.templatePath('ionic/tsconfig.json'),
        this.destinationPath('tsconfig.json')
      );
      this.fs.copy(
        this.templatePath('ionic/tsconfig.spec.json'),
        this.destinationPath('tsconfig.spec.json')
      );
      this.fs.copy(
        this.templatePath('ionic/tslint.json'),
        this.destinationPath('tslint.json')
      );
    }
    if (this.tipoProyecto == "Express") {
      //Se crea el directorio de resources
      fss.mkdirSync("resources");
      console.log("Directorio resources creado.")
    }
    //se verifica si se ingresa una url de descarga, esta tiene preferencia.
    if (this.logoUrl != "") {
      try {
        imageDownloader(this.logoUrl, "resources/logo.png", function () {
          console.log(`${logoUrl} imagen descargada!!`);
          console.log("logo.png creado en directorio resources.")
        });
      } catch (error) {
        console.log(error);
        console.log("No se pudo descargar la imagen.");
      }
    }
    else {
      if (this.logo == "logo.png") {
        this.fs.copy(
          this.templatePath("logo.png"),
          this.destinationPath('resources/logo.png')
        );
      }
      else {
        let fileUrl = new URL(this.logo);
        try {
          let data = fss.readFileSync(fileUrl);
          fss.writeFileSync("resources/logo.png", data);
          console.log("Logo copiado.")
        } catch (error) {
          console.log(error);
          console.log("No se pudo copiar la imagen.");
        }
      }
    }
  }

  install() {
    this.npmInstall(['tsd'], { 'global': true });
    this.npmInstall();
  }


};