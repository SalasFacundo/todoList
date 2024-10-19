import { Component } from '@angular/core';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoFilterComponent } from '../../components/todo-filter/todo-filter.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [TodoListComponent, TodoFilterComponent, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
