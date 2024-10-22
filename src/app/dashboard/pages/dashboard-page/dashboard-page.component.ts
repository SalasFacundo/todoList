import { Component } from '@angular/core';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { MatIconModule } from '@angular/material/icon';
import { NewTodoComponent } from '../../components/new-todo/todo-new.component';

@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [TodoListComponent, NewTodoComponent, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
