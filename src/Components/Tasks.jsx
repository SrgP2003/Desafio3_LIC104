import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from 'react';

export default function GestionTareas() {

    const [tareas, setTareas] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Cargando tareas desde localStorage al iniciar
    useEffect(() => {
        const almacenTareas = JSON.parse(localStorage.getItem('tareas')) || [];
        setTareas(almacenTareas);
    }, []);

    // Guardar tareas en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);

    const addTask = () => {
        if (inputValue.trim() === '') return; // Para evitar añadir tareas vacías
        const newTask = { id: Date.now(), text: inputValue };
        setTareas([...tareas, newTask]);
        setInputValue(''); // Limpiar el input
        // Simulación de petición AJAX
        setTimeout(() => {
            console.log('Tarea guardada en el servidor');
        }, 500);
    };

    const deleteTask = (id) => {
        setTareas(tareas.filter(task => task.id !== id));
        // Simulación de petición AJAX
        setTimeout(() => {
            alert('La tarea ha sido eliminada');
        }, 500);
    };
    return (
        <>
            <header className="container text-center mt-3">
                <h1 className="display-1">Gestor de Tareas</h1>
            </header>
            <main className="container d-flex justify-content-center flex-column">
                <input
                    type="text"
                    className="form-control "
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ingresa una tarea"
                />
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-info btn-lg m-3" onClick={addTask}>Añadir Tarea</button>
                    </div>
                </div>
                <div className="card container mt-3">
                    <div className="card-header text-center">
                        <h4 className="h4">Las tareas ingresadas se mostrarán aquí</h4>
                    </div>
                    <div className="card-body">
                        <ul>
                            {tareas.map(task => (
                                <li key={task.id}>
                                    <div className="row">
                                        <div className="col-9 display-6">
                                            {task.text}
                                        </div>
                                        <div className="col-3">
                                            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}