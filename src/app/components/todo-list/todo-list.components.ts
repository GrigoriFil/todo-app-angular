import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.components.html',
  styleUrl: 'todo-list.components.css'
})
export class TodoListComponent implements OnInit {
  // Activate the service
  todoService = inject(TodoService);

  toggleTask(id: number) {
    this.todoService.toggleTask(id);
  }

  ngOnInit() {
    this.todoService.loadTasks();
  }
}

