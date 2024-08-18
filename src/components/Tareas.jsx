import {useState} from 'react'
import { tareasIniciales } from '../TareasIniciales'

export default function Tareas() {

    const [nombreTarea, setNombreTarea] = useState("")
    const [listaTareas, setListaTareas] = useState(tareasIniciales)
    
    // Función al enviar el formulario
    const enviarFormulario = (e) => {
        e.preventDefault()
        //console.log('Enviando formulario')

        //Agregamos la tarea
        setListaTareas([...listaTareas, { nombre: nombreTarea, completada: false}])

        //Vaciamos el formulario
        setNombreTarea("")
    }

    //Función al escribir sobre el input del formulario
    const capturaInput = (e) => {
        setNombreTarea(e.target.value)
    }

    const completarTarea = (tarea) => {
        // Copiamos las tareas anteriores
        const nuevasTareas = [...listaTareas] 
        
        // Buscamos la tarea a completar en la lista
        const index = nuevasTareas.findIndex(el => el.nombre === tarea.nombre)
        
        nuevasTareas[index].completada = true
        setListaTareas(nuevasTareas)
    }

    const eliminarTarea = (tarea) => {
        const listaFiltrada = listaTareas.filter(el => el.nombre !==
        tarea.nombre)
        setListaTareas(listaFiltrada)
        }

    // Resultado: [TAREA 1, TAREA 2, TAREA 3]
    //const lista = listaTareas.map((tarea) => tarea.toUpperCase())
    //console.log(lista) 

    return (
        <>
            <h1>Lista de Tareas:</h1>
            <form onSubmit={enviarFormulario}>
                <input 
                    name="nombreTarea" 
                    onChange={capturaInput} 
                    value={nombreTarea} 
                    
                />
                <button>Agregar Tarea</button>
            </form>
            <ul>
                {listaTareas.map(tarea => 
                <li 
                key={tarea.nombre}
                style={tarea.completada === true ? { textDecoration:'line-through' } : {}}> {tarea.nombre} 
                {tarea.completada === false ? <button onClick={()=> completarTarea(tarea)}> Completar </button> : ''}
                <button onClick={() => eliminarTarea(tarea)}> Borrar </button>
                </li>)}
            </ul>
        </>
    )
}
