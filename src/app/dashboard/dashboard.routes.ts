import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  }
];
