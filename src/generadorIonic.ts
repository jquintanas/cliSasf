import { metadataGenerador } from "./metadataGenerador";
export class generadorIonic {
    private arrayArchivos: metadataGenerador[];
    private rutabase: string = "ionic/";

    constructor() {
        this.arrayArchivos = new Array();
        this.arrayArchivos.push({
            origen: this.rutabase + "e2e",
            destino: "e2e"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "_gitignore",
            destino: ".gitignore"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "src",
            destino: "src"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "angular.json",
            destino: "angular.json"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "browserslist",
            destino: "browserslist"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "_capacitor.config.json",
            destino: "_capacitor.config.json"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "ionic.config.json",
            destino: "ionic.config.json"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "karma.conf.js",
            destino: "karma.conf.js"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "tsconfig.app.json",
            destino: "tsconfig.app.json"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "tsconfig.json",
            destino: "tsconfig.json"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "tsconfig.spec.json",
            destino: "tsconfig.spec.json"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "tslint.json",
            destino: "tslint.json"
        });
    }

    addDatoConAdicional(origen:string, destino:string, extras:any){
        this.arrayArchivos.push({
            origen: this.rutabase + origen,
            destino: destino,
            adicional:extras
        });
    }

    obtenerArchivos(): metadataGenerador[] {
        return this.arrayArchivos;
    }
}