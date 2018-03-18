import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { ArchivedTodosPage } from '../archived-todos/archived-todos'

import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(public toastController: ToastController, public navCtrl: NavController, public alertController: AlertController, public todoProvider: TodoProvider) {
    this.todos = this.todoProvider.getToDos()
  }

  toogleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled
  }

  itemReordered($event) {
    reorderArray(this.todos, $event)
  }

  goToArchivePage() {
    this.navCtrl.push(ArchivedTodosPage)
  }

  addTodoToArchive(todoIndex) {
    this.todoProvider.archivedTodo(todoIndex)
  }

  addNewToDo() {
    let addToDoAlert = this.alertController.create({
      title: "Add ToDo",
      message: "Enter your to do",
      inputs: [{
        type: "text",
        name: "addToDoInput"
      }],
      buttons: [{
        text: "Cancel"
      }, {
        text: "Add ToDo",
        handler: (inputData) => {
          let toDoText;
          toDoText = inputData.addToDoInput
          this.todoProvider.addToDo(toDoText)

          addToDoAlert.onDidDismiss(() => {
            let todoToast = this.toastController.create({
              message: 'ToDo added',
              duration: 2000
            });
            todoToast.present()
          }
          )
        }
      }
      ]
    })

    addToDoAlert.present()
  }

  editTodo(todoIndex){
    let editToDoAlert = this.alertController.create({
      title: "Edit ToDo",
      message: "Enter your to do",
      inputs: [{
        type: "text",
        name: "addToDoInput",
        value: this.todos[todoIndex]
      }],
      buttons: [{
        text: "Cancel"
      }, {
        text: "Edit ToDo",
        handler: (inputData) => {
          let toDoText;
          toDoText = inputData.addToDoInput
          this.todoProvider.editToDo(toDoText, todoIndex)

          editToDoAlert.onDidDismiss(() => {
            let edittodoToast = this.toastController.create({
              message: 'ToDo was edited',
              duration: 2000
            });
            edittodoToast.present()
          }
          )
        }
      }
      ]
    })
    editToDoAlert.present()
  }

}
