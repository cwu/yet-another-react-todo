const initialData = {
  todos: [
    {
      id: 1,
      title: "Laundry",
      done: false,
    },
    {
      id: 2,
      title: "Groceries",
      done: false,
    },
    {
      id: 3,
      title: "Dishes",
      done: false,
    },
    {
      id: 4,
      title: "Make bed",
      done: true,
    },
  ]
};

const TodoItem = ({id, title, done, onClickTodo}) => {
  const style = {};
  if (done) {
    style["textDecoration"] = "line-through"
  }
  return (
    <li style={style} onClick={() => onClickTodo(id)}>
      <a href="#">
        {title}
      </a>
    </li>
  );
};

const TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: this.props.todos
    };
  },
  onTodoClick: function(id) {
    const {todos} = this.state;
    const index = todos.findIndex((todo) => id === todo.id);
    const newState = {
      todos: [
        ...todos.slice(0, index),
        Object.assign({}, todos[index], {done: !todos[index].done}),
        ...todos.slice(index + 1)
      ]
    };
    this.setState(newState);
  },
  render: function() {
    const {todos} = this.state;
    const todoItems = todos.map((todo) => {
      return <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        done={todo.done}
        onClickTodo={this.onTodoClick}/>
    });
    return (
      <ul>
        {todoItems}
      </ul>
    );
  }
});

$(() => {
  ReactDOM.render(
    <TodoApp todos={initialData.todos} />,
    document.getElementById('todo-app')
  );
});
