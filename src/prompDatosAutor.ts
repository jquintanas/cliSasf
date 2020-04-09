let inquirer = require('inquirer');
export class prompDatosAutor {
    private appName:string;
    private prompts = [
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

    constructor(appName:string) {
        this.appName = appName;
        this.prompts[0].default = this.appName;
    }

    generarPrompts() {
        return inquirer.prompt(this.prompts).then(async (props: any) => {
            this.appName = props.name;
            this.appName = this.appName.replace(/ /g, "").toLowerCase();
            let dataProyecto = {
                autor: props.autor,
                descripcion: props.descripcion,
                repositorio: props.repositorio,
                proyecto: this.appName
            }
            return dataProyecto;
        });
    }

}