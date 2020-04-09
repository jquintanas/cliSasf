import { metadataGenerador } from "./metadataGenerador";
export class generadorExpress {
    private arrayArchivos: metadataGenerador[];
    private rutabase: string = "express/";
    constructor() {
        this.arrayArchivos = new Array();
        this.arrayArchivos.push({
            origen: this.rutabase + "config",
            destino: "config"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "migrations",
            destino: "migrations"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "models",
            destino: "models"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "src",
            destino: "src"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "_gitignore",
            destino: ".gitignore"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "README.md",
            destino: "README.md"
        });
        this.arrayArchivos.push({
            origen: this.rutabase + "tsconfig.json",
            destino: "tsconfig.json"
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
