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
const usuarios = require('./models').Usuarios;
class prompLogin {
    constructor() {
        this.prompts = [
            {
                type: "input",
                name: "usuario",
                message: "Nombre de usuario: ",
            },
            {
                type: "password",
                name: "clave",
                message: "Ingrese su clave: "
            }
        ];
        this.usuario = 0;
        this.clave = "";
        this.empresa = "";
    }
    findById(id, clave) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuarios.findOne({
                where: {
                    id: id,
                    clave: clave
                }
            }).then((data) => {
                if (data != null) {
                    return data.dataValues;
                }
                return null;
            }, (err) => {
                console.log("Credenciales invalidas, verifique usuario y clave.");
                return null;
            });
        });
    }
    generarPrompts() {
        return inquirer.prompt(this.prompts).then((props) => __awaiter(this, void 0, void 0, function* () {
            let dt = null;
            let usuario = {
                user: Number(0),
                clave: "",
                status: false,
                data: dt
            };
            if (isNaN(props.usuario)) {
                console.log("usuario invalido.");
            }
            else {
                this.usuario = Number(props.usuario);
                this.clave = props.clave;
                yield this.findById(this.usuario, this.clave).then((dat) => {
                    this.empresa = dat.empresa.replace(/ /g, "").toLowerCase();
                    dat.empresa = this.empresa;
                    usuario.data = dat;
                });
                usuario.user = this.usuario;
                usuario.clave = this.clave;
                if (usuario.data != null) {
                    usuario.status = true;
                }
                else {
                    console.log("Credenciales invalidas, verifique usuario y clave.");
                }
            }
            return usuario;
        }));
    }
}
exports.prompLogin = prompLogin;
