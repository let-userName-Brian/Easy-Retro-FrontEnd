import { useParams } from "react-router-dom";

export default function Retro() {

  const params = useParams()
  const retro_id = params.retro_id
  const retro_name = "Booty"

  return <><div>Hello Stephen!</div>
    <div>Retro ID: {retro_id}</div>
    <div>Retro Name: {retro_name}</div></>
}