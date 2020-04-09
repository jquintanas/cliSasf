let inquirer = require('inquirer');
const usuarios = require('./models').Usuarios;
export class prompLogin {
    private usuario: number;
    private clave: string;
    private empresa: string;
    private prompts = [
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

    constructor() {
        this.usuario = 0;
        this.clave = "";
        this.empresa = "";
    }

    private async findById(id: Number, clave: string) {
        return await usuarios.findOne(
            {
                where: {
                    id: id,
                    clave: clave
                }
            }
        ).then((data: any) => {
            if(data != null){
                return data.dataValues;
            }
            return null;
        }, (err: any) => {
            console.log("Credenciales invalidas, verifique usuario y clave.")
            return null;
        })
    }

    generarPrompts() {
        return inquirer.prompt(this.prompts).then(async (props: any) => {
            let dt: any = null;
            let usuario = {
                user: Number(0),
                clave: "",
                status: false,
                data: dt
            }
            if (isNaN(props.usuario)) {
                console.log("usuario invalido.")
            }
            else {
                this.usuario = Number(props.usuario);
                this.clave = props.clave;
                await this.findById(this.usuario, this.clave).then((dat: any) => {
                    this.empresa = dat.empresa.replace(/ /g, "").toLowerCase();
                    dat.empresa = this.empresa;
                    usuario.data = dat;
                });
                usuario.user = this.usuario;
                usuario.clave = this.clave;
                if(usuario.data != null){
                    usuario.status = true;
                }
                else {
                    console.log("Credenciales invalidas, verifique usuario y clave.")
                }
            }
            return usuario;
        });
    }

}