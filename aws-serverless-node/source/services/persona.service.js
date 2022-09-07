const fetch = require("node-fetch");
const Persona = require('../models/persona.modelo')
module.exports = {
    obtenerItem, obtenerItems
}

async function obtenerItem(url){
    const response = await fetch(url);
    const JsonResponse = await response.json();

    let result = {}
    for(var key1 in JsonResponse)
    {
        for(var key2 in Persona)
        {
            if(key2 == key1)
            {
                result[Persona[key2].key] = JsonResponse[key1]
            }
        }
    }
    return result
}

async function obtenerItems(url){
    const response = await fetch(url);
    const JsonResponse = await response.json();

    let result = []
    for(var item of JsonResponse.results)
    {
        let elem = {}
        for(var key1 in item)
        {
            for(var key2 in Persona)
            {
                if(key2 == key1)
                {
                    elem[Persona[key2].key] = item[key1]
                }
            }
        }
        result.push(elem)
    }
    return result
}