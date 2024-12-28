// app/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface Todo {
  _id: string
  item: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const response = await fetch('/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault()
    if (!newTodo.trim()) return

    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: newTodo })
    })

    setNewTodo('')
    fetchTodos()
  }

  async function toggleTodo(id: string, completed: boolean) {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed })
    })
    fetchTodos()
  }

  async function deleteTodo(id: string) {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchTodos()
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTodo} className="flex gap-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
            />
            <Button type="submit">Add</Button>
          </form>

          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo._id} className="flex items-center gap-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => toggleTodo(todo._id, checked as boolean)}
                />
                <span className={todo.completed ? 'line-through' : ''}>
                  {todo.item}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTodo(todo._id)}
                  className="ml-auto"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}