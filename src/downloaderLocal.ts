const fss = require('fs');
var downloadLocal = function(uriLocal:string){
    let fileUrl = new URL(uriLocal);
    try {
        let data = fss.readFileSync(fileUrl);
        fss.writeFileSync("resources/logo.png", data);
        console.log("Logo copiado.")
      } catch (error) {
        console.log(error);
        console.log("No se pudo copiar la imagen.");
      }
}

module.exports = {
    downloadLocal
}