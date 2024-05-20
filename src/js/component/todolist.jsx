import React, { useEffect, useState } from "react";
import "../../styles/todostyles.css";

export const TodoList = () => {

    const host = "https://playground.4geeks.com/todo";
    const user = "VictoriaG";

    async function createUser () {
        const uri = 'https://playground.4geeks.com/todo/users/VictoriaG';
        const otptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            
        }
    };


    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editingTaskLabel, setEditingTaskLabel] = useState("");

    async function bringTask () {

        const uri = `${host}/users/${user}`
        const options = {method: "GET"}

        const response = await fetch (uri, options);

        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
        };

        const data = await response.json();
        setTask(data.todos);
    };


    async function createTask () {
        

        const uri = `${host}/todos/${user}`
        const todo = { label: newTask, is_done: false};
        const options = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(todo)
        };

        const response = await fetch (uri, options);

        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
        };

        setNewTask("");
        bringTask();

    };

    function startEditingTask(task) {
        setEditingTask(task);
        setEditingTaskLabel(task.label);
    }

    async function saveTask(task) {
        const uri = `${host}/todos/${task.id}`
        const updatedTask = { ...task, label: editingTaskLabel };

        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedTask)
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
        };

        setEditingTask(null);
        bringTask();
    }


async function deleteTask (item) {

    const uri = `${host}/todos/${item.id}`
    const options = {
        method: "DELETE",
    };

    const response = await fetch (uri, options);

    if (!response.ok) {
        console.log("Error", response.status, response.statusText);
    };

    bringTask();

};



useEffect ( () => {
    bringTask();
    createUser();
} , []);



   
    
    return (
        <>
            <div className="container col-10 col-sm-8 col-md-6">
                <form onSubmit={createTask}>
                    <label htmlFor="exampleFormControlInput1"><h3>My To-Do list</h3></label>
                    <input
                        type="text"
                        className="form-control container col-6 sm-col-4"
                        id="exampleFormControlInput1"
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                        placeholder="Today I have to..."
                    />
                </form>
                <ul className="list-group mt-2">
                    {task.map((task, id) => (
                        <li key={id} className="list-group-item d-flex justify-content-between">
                            {editingTask && editingTask.id === task.id ? (
                                <input
                                    type="text"
                                    value={editingTaskLabel}
                                    onChange={(e) => setEditingTaskLabel(e.target.value)}
                                    onBlur={() => saveTask(task)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            saveTask(task);
                                        }
                                    }}
                                />
                            ) : (
                                <>
                                    {task.label}
                                    <div id="icons">
                                        <span id="edit" onClick={() => startEditingTask(task)}>
                                            <i className="px-2 fas fa-pen text-secondary"></i>
                                        </span>
                                        <span id="delete" onClick={() => deleteTask(task)}>
                                            <i className="fas fa-trash text-secondary"></i>
                                        </span>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

}
