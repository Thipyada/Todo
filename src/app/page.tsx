'use client'
import { stringify } from 'querystring'
import './globals.css'
import styles from './page.module.css'

import { useState } from 'react'

const resetTodo = {
  context: '',
  id: '',
  isDone: false
}
interface todoItems {
  context: string
  id: string
  isDone: boolean
}

export default function HomeTodo() {

  const [todo, setTodo] = useState<todoItems>(resetTodo)

  const [allTodo, setAllTodo] = useState<todoItems[]>([])

  const handleChange = (name: string, value: string) => {

    setTodo((prevTodoInput) => {
      return {
        ...prevTodoInput,
        [name]: value
      }
    })
  }

  const handleSubmit = () => {
    if (todo.context) {
      setAllTodo((prevAllTodo) => {
        const newTodo = { ...todo }
        newTodo.id = generateId()
        newTodo.isDone = false
        return [
          ...prevAllTodo,
          newTodo
        ]
      })
      setTodo(resetTodo)
    }
  }

  const handleDone = (itemId: string) => {
    setAllTodo((prevAllTodo) => {

      const todoId = itemId
      const newTodoList = [...prevAllTodo]
      const doneTodoList = newTodoList.map((todoItem) => {
        if (todoItem.id == todoId) {
          return { ...todoItem, isDone: true }
        }
        return todoItem
      })
      return doneTodoList
    })
  }

  // console.log(`allTodo`, allTodo)

  const handleDelete = (deleteId: string) => {
    setAllTodo((prevAllTodo) => {
      return prevAllTodo.filter((todo) => todo.id !== deleteId)
    })
  }

  const todoListElement = () => {
    if (allTodo.length < 1) {
      return (
        <div className={styles.noTodoList}>
          <h3 className={styles.noTodoTitle}>You have no Todo for Today</h3>
        </div>
      )
    }
    return allTodo.map((todoItem) => {
      return (
        <div className={styles.todoList}>
          <div key={todoItem.id} className={styles.todoCard}>
            {todoItem?.isDone ? (
              <p className={styles.todoContext} style={{ textDecoration: 'line-through' }} >
                {todoItem.context}
              </p>
            ) : (
              <p className={styles.todoContext}>{todoItem.context}</p>
            )}

            {todoItem?.isDone ? (
              <div className={styles.todoOptions}>
                <button className={styles.deleteButton} onClick={() => handleDelete(todoItem.id)}>Delete</button>
              </div>
            ) : (
              <div className={styles.todoOptions}>
                <button className={styles.doneButton} onClick={() => handleDone(todoItem.id)}>Done</button>
                <span> | </span>
                <button className={styles.deleteButton} onClick={() => handleDelete(todoItem.id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      )
    })
  }

  const generateId = () => {
    const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    let randomID = ''
    for (let i = 0; i < 20; i++) {
      randomID += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
    }
    return randomID
  }


  return (
    <div className={styles.todoMain}>
      <div className={styles.todoContainer}>
        <div className={styles.todoHead}>
          <h1 className={styles.todoTitle}>Todo List</h1>
          <span className={styles.todoSubtitle}>A simple React Todo List App</span>
        </div>

        <>
          {todoListElement()}
        </>


        <h3 className={styles.inputTitle}>New Todo</h3>
        <div className={styles.todoInput}>
          <input
            type="text"
            className={styles.inputBox}
            name="context"
            value={todo.context}
            placeholder='New Todo'
            onChange={(e) => handleChange(e.target.name, e.target.value)} />
          <button className={styles.addButton} onClick={handleSubmit}>ADD TODO</button>
        </div>
      </div>
    </div>
  )
}
