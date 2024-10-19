import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { FilterEnum } from '../enums/filterEnum.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private localStorageKey = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>(this.loadTodosFromLocalStorage());
  private todos$ = this.todosSubject.asObservable();

  constructor() {
    this.loadTodosFromLocalStorage();
  }

  getAllTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(title: string) {
    const currentTodos = this.todosSubject.value;
    const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map(todo => todo.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title,
      completed: false
    };

    const updatedTodos = [...currentTodos, newTodo];
    this.todosSubject.next(updatedTodos);
    this.saveTodosToLocalStorage(updatedTodos);
  }

  deleteTodo(id: number) {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.todosSubject.next(updatedTodos);
    this.saveTodosToLocalStorage(updatedTodos);
  }

  filterTodos(filter: FilterEnum): void {
    let updatedTodos: Todo[];

    if (filter === FilterEnum.ALL) {
      updatedTodos = this.loadTodosFromLocalStorage();
    } else if (filter === FilterEnum.COMPLETED) {
      updatedTodos = this.todosSubject.value.filter(todo => todo.completed);
    } else if (filter === FilterEnum.INCOMPLETED) {
      updatedTodos = this.todosSubject.value.filter(todo => !todo.completed);
    } else {
      updatedTodos = this.todosSubject.value;
    }
    this.todosSubject.next(updatedTodos);
  }

  updateTodoOrder(todos: Todo[]): void {
    this.todosSubject.next(todos);
    this.saveTodosToLocalStorage(todos);
  }

  updateTodoStatus(id: number, completed: boolean): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    );
    this.todosSubject.next(updatedTodos);
    this.saveTodosToLocalStorage(updatedTodos);
  }

  private saveTodosToLocalStorage(todos: Todo[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  private loadTodosFromLocalStorage(): Todo[] {
    const todosFromStorage = localStorage.getItem(this.localStorageKey);
    return todosFromStorage ? JSON.parse(todosFromStorage) : [];
  }
}
