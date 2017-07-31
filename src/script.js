var Todo = React.createClass({
    getInitialState: function () {
        return { editing: false }
    },
    edit: function () {

        this.setState({ editing: true });
        console.log('todo edit');
    },



    remove: function () {

        this.props.onRemove(this.props.index);
 console.log('todo remove');
    },
    save: function () {
        var val = this.refs.newValue.getDOMNode().value;
        //  alert('Todo: '+ val + ' saved!');

        this.props.onChange(val, this.props.index);
        this.setState({ editing: false });
         console.log('todo save');
    },
    todoDisplay: function () {
         console.log('todo diplay');
        return (
            <div>

                <li className="todo">

                    <span onClick={this.edit}>
                        {this.props.children}
                    </span>

                    <button onClick={this.remove} className="btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right" />


                </li>

            </div>
        );
    },
    todoForm: function () {
         console.log('todo Form');
        return (
            <div>

                <li className="todo">

                    <span>
                        <input placeholder="Edit todo" type="text" ref="newValue" defaultValue={this.props.children} />
                    </span>

                    <button onClick={this.save} className="btn btn-default btn-sm glyphicon glyphicon-floppy-disk pull-right" />


                </li>


            </div>
        );

    },
    render: function () {
 console.log('todo render');
        if (this.state.editing) {
            return this.todoForm();
        } else {
            return this.todoDisplay();
        }

    },


});

var TodoList = React.createClass({

    getInitialState: function () {

        return {
            todos: [
                'ukdeks',
                'kymenen',
                'yksi toista'
            ],
            text: "",
            placeholder: "Add Todo",
            input_style: "form-control"
        };
    },

    onChange: function (e) {
        this.setState({ text: e.target.value });
    },

    update: function (newValue, i) {

        var arr = this.state.todos;
        arr[i] = newValue;
        this.setState({ todos: arr });
    },

    eachTodo: function (todo, i) {

        return (
            <Todo key={i}
                index={i}
                onChange={this.update}
                onRemove={this.remove} >
                {todo}
            </Todo>
        )
    },

    add: function (e) {
        var arr = this.state.todos;
        var i = arr.index;
        var newTodo = this.refs.newTodo.getDOMNode().value;
        if (!newTodo) {
            e.preventDefault();
            this.setState({ placeholder: "please add new value", input_style: "form-control red" });
      
        }else {
            arr.push(newTodo);
           this.setState({ todos: arr, text: null, placeholder: "Add todo", input_style: "form-control" });
         
        }



    },

    remove: function (i) {
        var arr = this.state.todos;
        arr.splice(i, 1);
        this.setState({ todos: arr });
    },



    render: function () {

        return (
            <div>
                <h1>Things to DO</h1>

                <div className="form-inline">

                    <div className="form-group">
                        <input ref="newTodo" className={this.state.input_style} placeholder={this.state.placeholder} value={this.state.text} onChange={this.onChange} />
                        <button onClick={this.add} className="btn btn-default btn-sm">+</button>
                    </div>

                </div>

                <ul>
                    {this.state.todos.map(this.eachTodo)}
                </ul>

            </div>
        );
    }
});
React.render(<TodoList />, document.getElementById('todo'));
