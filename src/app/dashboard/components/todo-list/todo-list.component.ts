import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{

  list!: Todo[];

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe( response => {
      this.list = response;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.todoService.updateTodoOrder(this.list);
  }
}
