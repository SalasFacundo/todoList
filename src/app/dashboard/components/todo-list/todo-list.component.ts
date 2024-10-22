import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';
import { NotificationService } from '../../services/notification.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterEnum } from '../../enums/filterEnum.enum';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{

  list!: Todo[];
  selectedFilter: string = "all"

  constructor(private todoService: TodoService, private notificationService: NotificationService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe( response => {
      this.list = response;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.todoService.updateTodoOrder(this.list);
  }

  openModal(action: string){
    if(this.list.length > 0){
      const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.action(action);
      }
    });
    }
  }

  action(action: string){
    switch (action) {
      case 'deleteAll':
        this.todoService.deleteAll();
        this.notificationService.showNotification('All todos were deleted');
        break;
      case 'deleteCompleted':
        this.todoService.clearCompleted();
        this.notificationService.showNotification('Completed todos were deleted');
        break;
    }
  }

  filter(option: string){
    this.selectedFilter = option;
    console.log(this.selectedFilter)
    const filterOption = FilterEnum[option.toUpperCase() as keyof typeof FilterEnum];

    if (filterOption) {
      this.todoService.filterTodos(filterOption);
    } else {
      console.error('Invalid filter option');
    }
  }

}
