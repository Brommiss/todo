interface TodoItem {
  id: string
  name: string
}

function isTodoItem(arg: any): arg is TodoItem {
  return !!arg
    && typeof arg === 'object'
    && typeof arg.id === 'string'
    && typeof arg.name === 'string'
}

const todoItems: TodoItem[] = []

Bun.serve({
  port: 8080,
  async fetch(req) {
    if (req.method === 'GET')
      return new Response(JSON.stringify(todoItems))

    if (req.method === 'POST') {
      const data = await req.json()
      if (!isTodoItem(data)) {
        return new Response(
          'Bad request: invalid TodoItem',
          { status: 400 }
        )
      }
      todoItems.push(data)
      todoItems.sort((a, b) => +a.id - +b.id)
    }

    return new Response('ok', { status: 200 })
  }
})
