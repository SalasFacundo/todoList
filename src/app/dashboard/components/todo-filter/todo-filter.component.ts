import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../enums/filterEnum.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'todo-filter',
  standalone: true,
  imports: [],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss'
})
export class TodoFilterComponent {

  constructor(private todoService: TodoService, private dialog: MatDialog, private notificationService: NotificationService){}

  filter(option: string){
    const filterOption = FilterEnum[option.toUpperCase() as keyof typeof FilterEnum];

    if (filterOption) {
      this.todoService.filterTodos(filterOption);
    } else {
      console.error('Invalid filter option');
    }
  }

  openModal(action: string){
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.action(action);
      }
    });
  }

  action(action: string){
    switch (action) {
      case 'completeAll':
        this.todoService.completeAll();
        this.notificationService.showNotification('All todos were completed');
        break;
      case 'deleteAll':
        this.todoService.deleteAll();
        this.notificationService.showNotification('All todos were deleted');
        break;
      case 'clearCompleted':
        this.todoService.clearCompleted();
        this.notificationService.showNotification('Completed todos were deleted');
        break;
    }
  }
}
