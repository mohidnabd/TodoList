import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import TodoList from './TodoList';
function App() {
 
  return (
    <div className="">
     <h1>Todos</h1>
       <TodoList />
    </div>
  );
}

export default App;
