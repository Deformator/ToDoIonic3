import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private todos = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getToDos(){
    return this.todos;
  }

  addToDo(todo){
    this.todos.push(todo)
  }

  editToDo(todo, todoIndex){
    this.todos[todoIndex] = todo
  }

  archivedTodo(todoIndex){
    let archivedTodo = this.todos[todoIndex]
    this.todos.splice(todoIndex, 1)
    this.archivedTodos.push(archivedTodo)
  }

  getArchivedTodos(){
    return this.archivedTodos;
  }
}
