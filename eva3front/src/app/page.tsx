'use client'

import { useEffect, useState } from "react"

interface Queja{
  problem_name:string
  affected:number
  cat:string
  desc:string
  date:string
  state:string
}

const initialStateQueja:Queja = { //Esto le da un valor inicial al state Queja, que se va a ir modificando
  problem_name:"",
  affected:1,
  cat:"maintenance",
  desc:"",
  //Esto (date) crea una fecha con el formato Date y la fecha en la que se ejecutó el programa,
  // la inserta como texto para mas facilidad al llevar y traer del localstorage
  date: new Date().toLocaleDateString(),
  state:"pending"
}

export default function Home() {

  const localstorage = window.localStorage
  const [queja, setqueja] = useState(initialStateQueja)
  const [quejas, setquejas] = useState<Queja[]>([])

  useEffect(() => { //Tomar la información guardada en localstorage al cargar la página
    let quejasStr = localstorage.getItem("quejas")
    if (quejasStr != null){
      let quejasList = JSON.parse(quejasStr) // Devuelve todo como string
      setquejas(quejasList)
    }
  },[])

    //Toma la data que viene del formulario y actualiza el estado "queja"
  const handleQueja = (name:string,value:string|number|Date) => {
    setqueja({...queja, [name]: value})
  }

  const handleSubir = () => { //Actualiza el estado y sube los datos al localstorage
    const newList = [...quejas, queja]
    setquejas(newList)
    setqueja(initialStateQueja)
    localstorage.setItem("quejas", JSON.stringify(newList))
  }

  const handleRemove = (i:number) => {
    let quejasremoved = quejas.filter((queja,index) => index != i)
    setquejas(quejasremoved)
    localstorage.setItem("quejas", JSON.stringify(quejas))
    }

  const handleEdit = (index:number) => {

  }

  return (
    <>
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

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Personas afectadas</th>
          <th>Categoría</th>
          <th>Descripción del problema</th>
          <th>Fecha de ingreso</th>
          <th>Estado</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {quejas.map((q,index)=>{
          return(
            <tr>
              <td>{q.problem_name}</td>
              <td>{q.affected}</td>
              <td>{q.cat}</td>
              <td>{q.desc}</td>
              <td>{q.date}</td> 
              <td>{q.state}</td>
              <td>
                <button type="button" onClick={() => handleEdit(index)}>Editar</button>
                <button type="button" onClick={() => handleRemove(index)}>Eliminar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  );
}