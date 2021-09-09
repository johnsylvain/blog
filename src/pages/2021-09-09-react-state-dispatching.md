---
path: "/cross-component-state-dispatching"
title: "Communicate state changes between React components"
date: "2021-09-09"
tag: React
spoiler: A clean way to communicate state changes across components.
---

Consider the following example:

```tsx
const Page = () => {
  const [todos, setTodos] = React.useState([])

  return <TodoList todos={todos} setTodos={setTodos}/>
}

const TodoList = ({ todos, setTodos }) => {
  return (
    <div>
      <form
        onSubmit={(event) => {
          setTodos([...todos, event.target.newTodo.value])
        }}
      >
        <input name="newTodo"/>
      </form>
      {todos.map(todo => /* todo component */)}
    </div>
  )
}
```

In this example, the `Page` component is controlling the state of the `TodoList` component. This pattern can be especially prevalent in larger applications where sibling components to `TodoList` may also need access to the todo state. The issue with this approach is that `TodoList` cannot be used independently because it does not manage its own state.

Let's take a look at the `input` element's API for inspiration:

```tsx
<input
  onChange={}
  onFocus={}
  onBlur={}
/>
```

The `input` element is in charge of it's own state, and when that internal state changes, those changes are bubbled out of the component through event handler props such as `onChange` and `onFocus`.

## The recommended approach

```tsx
const Page = () => {
  const [todos, setTodos] = React.useState([])

  return <TodoList
    initialTodos={todos}
    onChange={(newTodos) => setTodos(newTodos)}
  />
}

const TodoList = ({ initialTodos, onChange }) => {
  const [todos, setTodos] = React.useState(initialTodos)

  const handleSubmit = (event) => {
    const newTodos = [...todos, event.target.newTodo.value]
    setTodos(newTodos)

    if (onChange) {
      onChange(newTodos)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="newTodo"/>
      </form>
      {todos.map(todo => /* todo component */)}
    </div>
  )
}
```

In this new example, `TodoList` is uncoupled from the `Page` component allowing it to manage its own state to be used independently. The `TodoList` component now follows a similar API to intrinsic JSX components such as `input` and `button` to create a more consistent component API across the application.