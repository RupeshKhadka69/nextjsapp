// app/api/todos/route.ts
import { NextResponse } from 'next/server'
import connect from '@/utils/connection'

export async function GET() {
  const { Todo } = await connect()
  const todos = await Todo.find({})
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { item } = await request.json()
  const { Todo } = await connect()
  const todo = await Todo.create({ item, completed: false })
  return NextResponse.json(todo)
}

export async function PUT(request: Request) {
  const { id, completed } = await request.json()
  const { Todo } = await connect()
  const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true })
  return NextResponse.json(todo)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const { Todo } = await connect()
  const todo = await Todo.findByIdAndDelete(id)
  return NextResponse.json(todo)
}