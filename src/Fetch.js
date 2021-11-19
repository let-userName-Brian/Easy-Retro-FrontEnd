const serverURL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://sdi07-03.staging.dso.mil"
const serverPath = process.env.NODE_ENV === "development" ? "" : "/api"

export function getRetros(){
    return fetch(`${serverURL}${serverPath}/retros/`)
    .then(function(res){
        return res.json ()
    })
}

export function getRetroById(retro_id){
    return fetch(`${serverURL}${serverPath}/retros/${retro_id}`)
    .then(function(res){
        return res.json ()
    })
}

