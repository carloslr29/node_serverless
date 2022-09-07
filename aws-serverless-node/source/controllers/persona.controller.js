const personaService = require('../services/persona.service');
const urlApi = process.env.API_SWAPI

const getPersona = async (event) => {
  /*get format
  https://XXXXXXXXXXXXX.com/persona/1
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
            message: "id de persona invalido!"
          })
      };
    }
    const getUrl = urlApi + "people/" + id
    const result = await personaService.obtenerItem(getUrl)
    if(result == undefined || result == null)
    {
        return {
            statusCode: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ok: false,
                message: "id de persona no existe"
            })
        };
    }
    const itemPersona = result
    return {
      ok: true,
      body: itemPersona,
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

const getPersonas = async (event) => {
    /*get format
    https://XXXXXXXXXXXXX.com/persona
    */
    try
    {
      const getUrl = urlApi + "people"
      const result = await personaService.obtenerItems(getUrl)
      if(result == undefined || result == null)
      {
          return {
              statusCode: 404,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  ok: false,
                  message: "no se encontraron personas"
              })
          };
      }
      const itemPersonas = result
      return {
        ok: true,
        body: itemPersonas,
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

module.exports = {
    getPersona, getPersonas
};