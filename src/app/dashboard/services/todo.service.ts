import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FilterEnum } from '../enums/filterEnum.enum';
import { Todo } from '../models/Todo';

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

  addTodo(todo: Todo) {
    const currentTodos = this.todosSubject.value;
    const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map(todo => todo.id)) + 1 : 1;

    todo.id = newId;

    const updatedTodos = [...currentTodos, todo];
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

    const allTodos = this.loadTodosFromLocalStorage();
    if (filter === FilterEnum.ALL) {
      updatedTodos = allTodos;
    } else if (filter === FilterEnum.COMPLETED) {
      updatedTodos = allTodos.filter(todo => todo.completed === true);
    } else if (filter === FilterEnum.INCOMPLETED) {
      updatedTodos = allTodos.filter(todo => todo.completed === false);
    } else {
      updatedTodos = allTodos;
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

  findByTitle(title: string): boolean {
    const allTodos = this.loadTodosFromLocalStorage();
    return allTodos.some(todo => todo.title === title);
  }

  private saveTodosToLocalStorage(todos: Todo[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  private loadTodosFromLocalStorage(): Todo[] {
    const todosFromStorage = localStorage.getItem(this.localStorageKey);
    return todosFromStorage ? JSON.parse(todosFromStorage) : [];
  }
}
