"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class generadorExpress {
    constructor() {
        this.rutabase = "express/";
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
    addDatoConAdicional(origen, destino, extras) {
        this.arrayArchivos.push({
            origen: this.rutabase + origen,
            destino: destino,
            adicional: extras
        });
    }
    obtenerArchivos() {
        return this.arrayArchivos;
    }
}
exports.generadorExpress = generadorExpress;
