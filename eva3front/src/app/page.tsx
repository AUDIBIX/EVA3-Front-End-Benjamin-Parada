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

interface EditIndex{
  i:number
}

const initialStateQueja:Queja = { //Esto le da un valor inicial al state Queja, que se va a ir modificando
  problem_name:"",
  affected:1,
  cat:"Mantención",
  desc:"",
  //Esto (date) crea una fecha con el formato Date y la fecha en la que se ejecutó el programa
  date: new Date(),
  state:"Pendiente"
}

const initialStateEditIndex:EditIndex = {
  i:-1
}

export default function Home() {

  const localstorage = window.localStorage
  const [queja, setqueja] = useState(initialStateQueja)
  const [quejas, setquejas] = useState<Queja[]>([])
  const [quejaEdit, setquejaEdit] = useState(initialStateQueja)
  const [editIndex, seteditIndex] = useState(initialStateEditIndex)

  useEffect(() => { //Tomar la información guardada en localstorage al cargar la página
    let quejasStr = localstorage.getItem("quejas")
    if (quejasStr != null){
      let quejasParsed = JSON.parse(quejasStr) // Devuelve todo como string
      let quejasTyped = quejasParsed.map((q:Queja)=>({// Mapeo de las quejas en str para trabajar con datos tipados
        ...q,
        affected: Number(q.affected), // Convertir el numero de afectados de str a Number
        date: new Date(q.date) // Convertir la fecha a Date
      }))
      setquejas(quejasTyped)
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
    let quejasremoved = quejas.filter((queja,index) => index != i) // Devuelve una copia de la lista sin los elementos que no coincidan
    setquejas(quejasremoved)
    localstorage.setItem("quejas", JSON.stringify(quejas))
    }

  const quejaEditar = (name:string,value:string|number|Date) => { // Funcion para actualizar el estado "quejaEdit" cuando se modifique el formulario
    setquejaEdit({...quejaEdit, [name]: value})
  }

  // Se modifica el estado para guardar el indice de la queja a modificar, además de cargar la queja seleccionada para visualizar en el formulario
  const editingIndex = (index:number) => {
    seteditIndex({i:index})
    setquejaEdit(quejas[index])
  }


  const handleEditar = (index:number) => {
    let newList = [...quejas]
    newList[index] = quejaEdit
    setquejas(newList)
    setquejaEdit(initialStateQueja)
    localstorage.setItem("quejas", JSON.stringify(newList))
    }

  return (
    <>
    {/* Los div son solo para poner un formulario al lado del otro */}
    <div style={{display:"flex"}}>
      {/* Formulario Ingreso */}
      <div style={{width:'35%'}}>
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
          <option value="Mantención">Mantención</option>
          <option value="Seguridad">Seguridad</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Ruido">Ruido</option>
          <option value="Servicios públicos">Servicios públicos</option>
          <option value="Otro">Otro</option>
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
        placeholder="YYYY/MM/DD"
        onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}></input><br/>
        <p>Estado:</p>
        <select 
        name="state"
        onChange={(e)=>{handleQueja(e.currentTarget.name,e.currentTarget.value)}}>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select><br/>
        <button type="button" name="form_submit" onClick={() => {handleSubir()}} >Subir queja</button>
      </form>
      </div>

      {/* Formulario de edición */}
      <div>
        <form>
        <h1>Edición de quejas</h1>
        <p>Nombre:</p>
        <input 
        type="text" 
        name="problem_name" 
        placeholder="Plaza sucia"
        value={quejaEdit.problem_name}
        onChange={(e)=>{quejaEditar(e.currentTarget.name,e.currentTarget.value)}}></input><br/>
        <p>Número de personas afectadas:</p>
        <input 
        type="number" 
        name="affected" 
        placeholder="Número >= 1"
        value={quejaEdit.affected}
        onChange={(e)=>{quejaEditar(e.currentTarget.name,parseInt(e.currentTarget.value))}}></input><br/>
        <p>Categoría:</p>
        <select 
        name="cat"
        onChange={(e)=>{quejaEditar(e.currentTarget.name,e.currentTarget.value)}}
        value={quejaEdit.cat}>
          <option value="Mantención">Mantención</option>
          <option value="Seguridad">Seguridad</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Ruido">Ruido</option>
          <option value="Servicios públicos">Servicios públicos</option>
          <option value="Otro">Otro</option>
        </select><br/>
        <p>Descripcion del problema:</p>
        <input 
        name="desc" 
        type="textarea" 
        placeholder="Ej. Alcantarilla rota"
        onChange={(e)=>{quejaEditar(e.currentTarget.name,e.currentTarget.value)}}
        value={quejaEdit.desc}></input><br/>
        <p>Fecha de ingreso de la queja:</p>
        <input 
        type="date" 
        name="date" 
        placeholder="YYYY/MM/DD"
        value={quejaEdit.date.toISOString().split("T")[0]} //Se convierte a un str YYYY/MM/DD Porque así lo pide el input
        onChange={(e)=>{quejaEditar(e.currentTarget.name,new Date(e.currentTarget.value))}}></input><br/>
        <p>Estado:</p>
        <select 
        name="state"
        onChange={(e)=>{quejaEditar(e.currentTarget.name,e.currentTarget.value)}}>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select><br/>
        <button type="button" name="form_submit" onClick={() => {handleEditar(editIndex.i)}} >Actualizar queja</button>
      </form>
      </div>
    </div>

    {/* Tabla de contenido */}
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
              {/* Acá en "date" se convierte a formato de fecha local en STR para visualizarla en tabla */}
              <td>{q.date.toLocaleDateString()}</td> 
              <td>{q.state}</td>
              <td>
                <button type="button" onClick={() => editingIndex(index)}>Editar</button>
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