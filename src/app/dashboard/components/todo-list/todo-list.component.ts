import {Component} from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from '../todo-card/todo-card.component';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  list = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }
}
