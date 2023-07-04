import { url } from "../config.js";

const urlBase = url + "/api/v1/Comanda";

export const GetAllComandasByDate = async (date) => {
  let bodyRes ;
  let urlDate = date ? `?fecha=${date}` : "?fecha=";
  await fetch(urlBase + urlDate, {
    method: "GET",
  })
    .then((httpResponse) => {
      if(httpResponse.status == 500){
        throw new Error("");
      }
      return httpResponse.json()
    })
    .then((body) => bodyRes = body)
    .catch((error) => {
      window.location = '../../views/500.html';
    });

    return bodyRes;
};

export const CreateComanda = async (comandaRequest) => {
  let res = {
    status:"" ,
    body: ""
} 
  await fetch(urlBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comandaRequest),
  })
  .then((httpResponse) => {
      if(httpResponse.status == 500){
        throw new Error("");
      }
    res.status = httpResponse.status
    return httpResponse.json()
    })
.then(body => res.body = body)
    .catch((error) => {
      window.location = '../../views/500.html';
    });
    return res;
};

export const GetComandaById = async (comandaId) => {
  let bodyRes ;
  await fetch(urlBase + `/${comandaId}`, {
    method: "GET",
  })
  .then((httpResponse) => {
    if(httpResponse.status == 500){
      throw new Error("");
    }
    return httpResponse.json()
  })
    .then((body) => bodyRes = body)
    .catch((error) => {
      window.location = '../../views/500.html';
    });
    return bodyRes;
};
