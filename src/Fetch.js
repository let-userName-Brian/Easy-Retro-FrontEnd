//import { json } from "stream/consumers"

const servers = {
  test: "",
  development: "http://localhost:8080",
  production: "https://sdi07-03.staging.dso.mil/api"
}

const serverURL = servers[process.env.NODE_ENV]

export function getRetros() {
  return new Promise((resolve, reject) => {
    fetch(`${serverURL}/retros/`)
      .then(function (res) {
        if (res.ok) { return res }
        else { throw new Error(res.statusText) }
      })
      .then(res => res.json())
      .then(retros => resolve(retros))
      .catch(err => resolve(null))
  })
}

export function getRetroById(retro_id) {
  return new Promise((resolve, reject) => {
    fetch(`${serverURL}/retros/${retro_id}`)
      .then(function (res) {
        if (res.ok) { return res }
        else { throw new Error(res.statusText) }
      })
      .then(res => res.json())
      .then(retro => resolve(retro))
      .catch(err => resolve(null))
  })
}

//fetch user from the db
export function getUserById(user_id) {
  return new Promise((resolve, _) => {
     fetch(`${serverURL}/users/${user_id}`)
      .then(function (res) {
        if (res.ok) { return res }
        else { throw new Error(res.statusText) }
      })
      .then(res => res.json())
      .then(user => resolve(user))
      .catch(err => resolve(null))
  })
}

//fetch users Retro from the db
export function getRetrosByUserId(user_id) {
  return new Promise((resolve, _) => {
    fetch(`${serverURL}/users/${user_id}/retros`)
     .then(function (res) {
       if (res.ok) { return res }
       else { throw new Error(res.statusText) }
     })
     .then(res => res.json())
     .then(user => resolve(user))
     .catch(err => resolve(null))
 })
}

//post a new retro to the db
export function postRetro(retro, user_id) {
  return new Promise((resolve, _) => {
    fetch(`${serverURL}/retros/create/${user_id}`, {
      //posts to retros
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(retro)
    })
      .then(function (res) {
        if (res.ok) { return res }
        else { throw new Error(res.statusText) }
      })
      .then(res => res.json())
      .then(json => {console.log('response', json) 
        return json
      })
      .then(retro =>resolve(retro))
      .catch(err => resolve(null))
  })
}