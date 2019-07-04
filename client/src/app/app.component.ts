import { Component } from '@angular/core';

import { TodoService } from './services/todo.service';
import { CsvService } from './services/csv.service';

import { TodoModel } from './models/todo.model';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  newTask: string = "";
  todos: TodoModel[] = [];
  
  constructor(
    private todoService: TodoService,
    private csvService: CsvService
  ) {
    this.getTodos();
  }

  private addTodo() {
    if (this.newTask != "") {
      let date = moment().format();

      this.todos.push({text: this.newTask, date});      
    }    

    this.newTask = "";

    this.saveTodos();
  }

  private removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  private getTodos() {
    this.todoService.getTodos().subscribe(res => {
      if (res) {
        this.todos = res;
      }
    })
  }

  private saveTodos() {
    this.todoService.saveTodos(this.todos).subscribe(res => {      
      this.getTodos();
    })
  }

  public onDragStart(event, oldIndex) {
    event.dataTransfer.setData('oldIndex', oldIndex);
  }

  public onDrop(event, newIndex) {
    let oldIndex = event.dataTransfer.getData('oldIndex');
    event.preventDefault();

    event.target.style.outline = "";

    var draggingElement = this.todos.splice(oldIndex, 1);

    this.todos.splice(newIndex, 0, draggingElement[0]);

    this.saveTodos();
  }

  public allowDrop(event) {
    event.preventDefault();
    
    event.target.style.outline = "3px dashed #3498dc";
  }

  public dragLeave(event) {
    event.target.style.outline = "";
  }

  public downloadCSV() {
    this.csvService.downloadCSV(this.todos, "Todos1");
  }
}
