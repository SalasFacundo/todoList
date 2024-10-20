import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'todo-new',
  standalone: true,
  imports: [MatCheckboxModule, MatInputModule, MatIcon, ReactiveFormsModule],
  templateUrl: './todo-new.component.html',
  styleUrl: './todo-new.component.scss'
})
export class NewTodoComponent implements OnInit{

  todoForm!: FormGroup;
  value = 'Clear me';

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.todoForm = this.formBuilder.group({
      completed: false,
      title: ['', Validators.required]
    })
  }

  newTodo(){
    this.todoService.addTodo(this.todoForm.value);
    this.todoForm.reset();
    this.notificationService.showNotification("To-do was created")
  }
}
