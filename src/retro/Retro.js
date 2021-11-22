import { useParams } from "react-router-dom";
import { getRetroById } from "../Fetch"
import { useState, useEffect } from "react"
import Column from "./Column"


export default function Retro() {

  const params = useParams()
  const retro_id = params.retro_id
  const [retro, setRetro] = useState()

  useEffect(() => {
    let mounted = true;
    getRetroById(retro_id)
      .then(retro => mounted && setRetro(retro))
      return () => mounted = false;  
  },[])

  if(!retro){
    return <div>Loading Retro!</div>
  }

  return <><div>Hello Stephen!</div>
    <Column retro_id={retro_id} cards={cards} />
    <div>Retro Name: {retro.retro_name}</div></>
}