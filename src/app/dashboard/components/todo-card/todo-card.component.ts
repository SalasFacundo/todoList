import { Component, inject, Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/Todo';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MatCheckboxModule, MatIconModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() todo!: Todo

  constructor(private todoService: TodoService, private notificationService: NotificationService, private dialog: MatDialog){}

  updateStatus(event: any){
    this.todoService.updateTodoStatus(this.todo.id, event.checked);
  }

  delete(id: number){
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.todoService.deleteTodo(id);
        this.notificationService.showNotification(`${this.todo.title} was deleted`);
      }
    });
  }
}
