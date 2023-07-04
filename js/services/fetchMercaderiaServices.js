import { url } from "../config.js";
const urlBase =  url +"/api/v1/Mercaderia";

export const SearchMercaderiaWithOptions = async(tipo,name,orden) =>{
    let bodyRes = {
        ok : "",
        statusCode : "",
        product : ""
    } ;
    let urlTipo = tipo? `tipo=${tipo}&` : "";
    let urlName = name? `nombre=${name}&` : "";
    let urlOrden = orden? `orden=${orden}` : "orden=asc";
    let urlSearch = `?${urlTipo}${urlName}${urlOrden}`
    
    await fetch(urlBase + urlSearch, {
        method: 'GET'
    })
    .then((httpResponse) => {

        if(httpResponse.status == 500){
            throw new Error("");
        }

        bodyRes.ok = httpResponse.ok;
        bodyRes.statusCode = httpResponse.status;
        return httpResponse.json()
    } )
    .then(body =>{
        bodyRes.product = body 
    } )
    .catch(error => {
        window.location = '../../views/500.html'
    })

    return bodyRes

}

export const CreateMercaderia = async(mercaderiaRequest) =>{
    let res = {
        status:"" ,
        body: ""
    } 
    await fetch(urlBase , {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(mercaderiaRequest)
    })
    .then((httpResponse) => {
        if(httpResponse.status == 500){
            throw new Error("");
        }

        res.status = httpResponse.status
        return httpResponse.json()})
   .then(body => res.body = body)
    .catch(error => {
        window.location = '../../views/500.html'
    })
    return res
}

export const GetMercaderiaById = async(mercaderiaId) =>{
    let bodyRes = {
        ok : "",
        statusCode : "",
        product : ""
    } ;
    await fetch(urlBase + `/${mercaderiaId}`, {
        method: 'GET'
    })
    .then((httpResponse) => {
        if(httpResponse.status == 500){
            throw new Error("");
        }

        bodyRes.ok = httpResponse.ok;
        bodyRes.statusCode = httpResponse.status;
       return httpResponse.json()
    } )
    .then(body =>{
        bodyRes.product = body 
    } )
    .catch(error => {
        window.location = '../../views/500.html'
    })

   return bodyRes
}

export const UpdateMercaderia = async(mercaderiaRequest, mercaderiaId) =>{
    let res = {
        status:"" ,
        body: ""
    } 
    await fetch(urlBase + `/${mercaderiaId}` , {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(mercaderiaRequest)
    })
    .then((httpResponse) => {
        if(httpResponse.status == 500){
            throw new Error("");
        }

        res.status = httpResponse.status
        return httpResponse.json()})
   .then(body => res.body = body)
    .catch(error => {
        window.location = '../../views/500.html'
    })
    return res
}

export const DeleteMercaderiaById = async(mercaderiaId) =>{
    let res = {
        status:"" ,
        body: ""
    } 
    await fetch(urlBase + `/${mercaderiaId}`, {
        method: 'DELETE'
    })
    .then((httpResponse) => {
        if(httpResponse.status == 500){
            throw new Error("");
        }

        res.status = httpResponse.status
         return httpResponse.json()})
    .then(body => res.body = body)
    .catch(error => {
        window.location = '../../views/500.html'
    })
    return res
}
