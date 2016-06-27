var Todo = React.createClass({
  handleClick: function() {
    var todo = this.props.todo;
    todo.deleted = this.refs.complete.checked;
    this.props.onTodoComplete(todo);
  },
  render: function() {
    return (
      <li className="list-group-item">
        <div className="checkbox">
          <label className={this.props.todo.deleted ? "deleted" : ""}>
            <input type="checkbox" ref="complete" onClick={this.handleClick} />
            <strong>{this.props.todo.name}</strong>
          </label>
        </div>
        <div className="todo-desc">
          <small className={this.props.todo.deleted ? "deleted" : ""}><nobr>{this.props.todo.note}</nobr></small><br/>
          <small className={this.props.todo.deleted ? "deleted" : ""}>{this.props.todo.dueDate}</small>
        </div>
      </li>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var todoNodes = this.props.data.map(function(todo) {
      return (
        <Todo todo={todo} key={todo.id} onTodoComplete={this.props.onTodoComplete} />
      );
    }.bind(this));
    return (
      <ul className="list-group">
        {todoNodes}
      </ul>
    );
  }
});

var validator;
var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    validator = $("form").validate();
    validator.form();
    if (validator.numberOfInvalids() == 0) {
      this.props.onTodoSubmit($("form").serialize());
      validator.resetForm();
      $("form")[0].reset();
    }
  },
  componentDidMount: function() {
    $(".date").datetimepicker({format: "YYYY-MM-DD"});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" minLength="2" required="true" className="form-control" placeholder="할일"/>
        <div className="form-group">
          <div className="input-group date">
            <input type="text" name="dueDate" className="form-control" placeholder="기한"/>
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
        </div>
        <textarea name="note" className="form-control" rows="3" placeholder="메모" />
        <button type="submit" className="btn btn-primary btn-block">Add</button>
      </form>
    );
  }
});

var TodoBox = React.createClass({
  loadTodosFromServer: function() {
    $.getJSON(this.props.url, function(data) {
      this.setState({data: data});
    }.bind(this));
  },
  handleTodoSubmit: function(todo) {
    $.post(this.props.url, todo, function(data) {
      this.setState({data: data});
    }.bind(this));
  },
  handleTodoComplete: function(todo) {
    $.put(this.props.url, todo, function(data) {
      this.setState({data: data});
    }.bind(this));
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
    setInterval(this.loadTodosFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="todo-box">
        <div className="header jumbotron">
          <h1>ToDo</h1>
          <p className="lead">Organize your work</p>
        </div>
        <TodoList data={this.state.data} onTodoComplete={this.handleTodoComplete} />
        <TodoForm onTodoSubmit={this.handleTodoSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <TodoBox url="/api/todos" pollInterval={10000} />,
  document.getElementById("content")
);