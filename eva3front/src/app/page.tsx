'use client'

import { useEffect, useState } from "react"

interface Queja{
  problem_name:string
  affected:number
  cat:string
  desc:string
  date:Date
  state:string
}

const initialStateQueja:Queja = { //Esto le da un valor inicial al state Queja, que se va a ir modificando
  problem_name:"",
  affected:1,
  cat:"maintenance",
  desc:"",
  date: new Date(), //Esto crea una fecha con el formato Date y la fecha en la que se ejecutó el programa
  state:"pending"
}

export default function Home() {

  const localstorage = window.localStorage
  const [queja, setqueja] = useState(initialStateQueja)
  const [quejas, setquejas] = useState<Queja[]>([])

  useEffect(() => {
    let quejasStr = localstorage.getItem("quejas")
    if (quejasStr != null){
      let quejasList = JSON.parse(quejasStr)
      setquejas(quejasList)
    }
  },[])

  const handleQueja = (name:string,value:string|number|Date) => {
    setqueja({...queja, [name]: value})
  }

  const handleSubir = () => {
    localstorage.setItem("quejas", JSON.stringify([...quejas,queja]))
  }

  return (
    <form>
      <h1>Ingreso de quejas</h1>
      <p>Nombre:</p>
      <input 
      type="text" 
      name="problem_name" 
      placeholder="Plaza sucia"
      onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}></input><br/>
      <p>Número de personas afectadas:</p>
      <input 
      type="number" 
      name="affected" 
      placeholder="Número >= 1"
      onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}></input><br/>
      <p>Categoría:</p>
      <select 
      name="cat"
      onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}>
        <option value="maintenance">Mantención</option>
        <option value="security">Seguridad</option>
        <option value="cleaning">Limpieza</option>
        <option value="noise">Ruido</option>
        <option value="public_services">Servicios públicos</option>
        <option value="others">Otro</option>
      </select><br/>
      <p>Descripcion del problema:</p>
      <input 
      name="desc" 
      type="textarea" 
      placeholder="Ej. Alcantarilla rota"
      onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}></input><br/>
      <p>Fecha de ingreso de la queja:</p>
      <input 
      type="date" 
      name="date" 
      placeholder="DD/MM/YYYY"
      onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}></input><br/>
      <p>Estado:</p>
      <select 
      name="state"
      onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
      </select><br/>
      <button type="button" name="form_submit" onClick={() => {handleSubir()}} >Subir queja</button>
    </form>
  );
}