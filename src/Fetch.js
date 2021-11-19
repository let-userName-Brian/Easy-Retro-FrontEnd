const serverURL = process.env.NODE_ENV === "test" ? "" : "https://sdi07-03.staging.dso.mil"
const serverPath = process.env.NODE_ENV === "test" ? "" : "/api"

export function getRetros() {
    return new Promise((resolve, reject) => {
        fetch(`${serverURL}${serverPath}/retros/`)
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
        fetch(`${serverURL}${serverPath}/retros/${retro_id}`)
            .then(function (res) {
                if (res.ok) { return res }
                else { throw new Error(res.statusText) }
            })
            .then(res => res.json())
            .then(retro => resolve(retro))
            .catch(err => resolve(null))
    })
}

