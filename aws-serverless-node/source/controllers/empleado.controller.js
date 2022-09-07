const uuid = require("uuid");
const empleadoService = require('../services/empleado.service');

const getEmpleado = async (event) => {
  /*get format
  https://XXXXXXXXXXXXX.com/empleado/1b1bdab0-ba97-4d6f-81f6-f5e17aa7570b
  */
  try
  {
    const { id } = event.pathParameters;
    if(id == undefined || id == "" || id == null){
      return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ok: false,
            message: "id de empleado invalido!"
          })
      };
    }
    const result = await empleadoService.obtener("Empleados", id)
    const itemEmpleado = result.Item;

    if(itemEmpleado == undefined || itemEmpleado == null){
      return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ok: false,
            message: "id de empleado no existe"
          })
      };
    }

    return {
      ok: true,
      body: itemEmpleado,
    };
  }
  catch(ex)
  {
    return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              ok: false,
              message: ex.message
          })
    };
  }
}

const insertEmpleado = async (event) => {
    /*ejemplo post - formato json
    {
	    "nombre": "xxxx",
	    "dni": "xxxx",
      "telefono": "xxxx",
      "direccion": "xxxx"
    }
    */
    try
    {
        let bodyEmpleado = JSON.parse(event.body)
        const { nombre, dni, telefono, direccion } = bodyEmpleado
        const id = uuid.v4()

        if(nombre == undefined || nombre == "" || nombre == null){
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ok: false,
                  message: "nombre de empleado invalido!"
                })
            };
        }

        if(dni == undefined || dni == "" || dni == null){
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ok: false,
                  message: "dni de empleado invalido!"
                })
            };
        }

        if(telefono == undefined || telefono == "" || telefono == null){
          return {
              statusCode: 404,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ok: false,
                message: "telefono de empleado invalido!"
              })
          };
        }

        if(direccion == undefined || direccion == "" || direccion == null){
          return {
              statusCode: 404,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ok: false,
                message: "direccion de empleado invalido!"
              })
          };
        }
        bodyEmpleado = {...bodyEmpleado,id }
        await empleadoService.insertar(bodyEmpleado, "Empleados")
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ok: true,
                message:"empleado creado correctamente - id: " + id 
            }),
        };
    }
    catch(ex)
    {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ok: false,
                message: ex.message
            })
        };
    }
  };

module.exports = {
    getEmpleado,
    insertEmpleado
};