import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../enums/filterEnum.enum';

@Component({
  selector: 'todo-filter',
  standalone: true,
  imports: [],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss'
})
export class TodoFilterComponent {

  constructor(private todoService: TodoService){}

  filter(option: string){
    const filterOption = FilterEnum[option.toUpperCase() as keyof typeof FilterEnum];

    if (filterOption) {
      this.todoService.filterTodos(filterOption);
    } else {
      console.error('Invalid filter option');
    }
  }

  completeAll(){this.todoService.completeAll()}
  deleteAll(){this.todoService.deleteAll()}
  clearCompleted(){this.todoService.clearCompleted();}

}
