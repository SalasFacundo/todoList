import { Component, Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/Todo';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MatCheckboxModule, MatIconModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() todo!: Todo

  constructor(private todoService: TodoService){}

  delete(id: number){
    this.todoService.deleteTodo(id);
  }

  updateStatus(event: any){
    this.todoService.updateTodoStatus(this.todo.id, event.checked);
  }

}
