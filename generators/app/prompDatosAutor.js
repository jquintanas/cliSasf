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
let inquirer = require('inquirer');
class prompDatosAutor {
    constructor(appName) {
        this.prompts = [
            {
                type: "input",
                name: "name",
                message: "Nombre del proyecto",
                default: this.appName // Default to current folder name
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
            }
        ];
        this.appName = appName;
        this.prompts[0].default = this.appName;
    }
    generarPrompts() {
        return inquirer.prompt(this.prompts).then((props) => __awaiter(this, void 0, void 0, function* () {
            this.appName = props.name;
            this.appName = this.appName.replace(/ /g, "").toLowerCase();
            let dataProyecto = {
                autor: props.autor,
                descripcion: props.descripcion,
                repositorio: props.repositorio,
                proyecto: this.appName
            };
            return dataProyecto;
        }));
    }
}
exports.prompDatosAutor = prompDatosAutor;
