import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private localStorageKey = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>(this.loadTodosFromLocalStorage());
  todos$ = this.todosSubject.asObservable();

  constructor() {

    this.loadTodosFromLocalStorage();
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

  filterTodos(filter: 'all' | 'completed' | 'not-completed'): Observable<Todo[]> {
    if (filter === 'all') {
      return this.todos$;
    } else if (filter === 'completed') {
      return this.todos$.pipe(map(todos => todos.filter(todo => todo.completed)));
    } else if (filter === 'not-completed') {
      return this.todos$.pipe(map(todos => todos.filter(todo => !todo.completed)));
    }
    return this.todos$;
  }

  private saveTodosToLocalStorage(todos: Todo[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  private loadTodosFromLocalStorage(): Todo[] {
    const todosFromStorage = localStorage.getItem(this.localStorageKey);
    return todosFromStorage ? JSON.parse(todosFromStorage) : [];
  }
}
