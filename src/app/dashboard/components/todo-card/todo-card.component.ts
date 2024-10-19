import { Component, Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() todo: any

}
