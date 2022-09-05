const AWS = require("aws-sdk");
const fetch = require("node-fetch");
const { v4 } = require("uuid");

const getPersona = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    const { idKey } = event.pathParameters;
  
    const result = await dynamodb
      .get({
        TableName: "Personas",
        Key: { idKey },
      })
      .promise();
  
    const itemPersona = result.Item;
  
    return {
      status: 200,
      body: itemPersona,
    };
  };

const insertPersona = async (event) => {
    try
    {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
  
        const { id, url } = JSON.parse(event.body);
        const idKey = v4();

        if(id == undefined || id == "" || id == null){
            return {
                statusCode: 404,
                body: JSON.stringify({
                  ok: false,
                  message: "id de persona no enviado"
                }),
            };
        }

        if(url == undefined || url == "" || url == null){
            return {
                statusCode: 404,
                body: JSON.stringify({
                  ok: false,
                  message: "url de persona no enviado"
                }),
            };
        }

        const response = await fetch(url);
        const JsonResponse = await response.json();

        if(!JsonResponse){
            return {
                statusCode: 404,
                body: JSON.stringify({
                  ok: false,
                  message: "url " + url + " no responde"
                }),
            };        
        }
        console.log(JsonResponse)
        const bodyPersona = {
            idKey: idKey,
            id: id,
            nombre: JsonResponse.name ? JsonResponse.name : "",
            anio_nacimiento: JsonResponse.birth_year ? JsonResponse.birth_year : "",
            ojo_color: JsonResponse.eye_color ? JsonResponse.eye_color : "",
            genero: JsonResponse.gender ? JsonResponse.gender : "",
            cabello_color: JsonResponse.hair_color ? JsonResponse.hair_color : "",
            altura: JsonResponse.height ? JsonResponse.height : "",
            masa: JsonResponse.mass ? JsonResponse.mass : "",
            piel_color: JsonResponse.skin_color ? JsonResponse.skin_color : "",
            casa_mundo: JsonResponse.homeworld ? JsonResponse.homeworld : "",
            peliculas: JsonResponse.films ? JsonResponse.films : [],
            especies: JsonResponse.species ? JsonResponse.species : [],
            navesEstelares: JsonResponse.starships ? JsonResponse.starships : [],
            vehiculos: JsonResponse.vehicles ? JsonResponse.vehicles : [],
            url: JsonResponse.url ? JsonResponse.url : "",
            creacion: JsonResponse.created ? JsonResponse.created : "",
            edicion: JsonResponse.edited ? JsonResponse.edited : ""
        }

        await dynamodb
        .put({
            TableName: "Personas",
            Item: bodyPersona,
        })
        .promise();
  
        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
                message:"persona creada correctamente - id: " + idKey 
            }),
        };
    }
    catch(ex)
    {
        return {
            statusCode: 500,
            body: JSON.stringify({
                ok: false,
                message: ex.message
            }),
        };
    }
  };

module.exports = {
    getPersona,
    insertPersona
};