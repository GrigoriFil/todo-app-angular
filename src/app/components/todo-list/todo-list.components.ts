import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.components.html',
  styleUrl: 'todo-list.components.css',
})
export class TodoListComponent implements OnInit {
  // Activate the service
  todoService = inject(TodoService);

  // Save TODO list
  tasks: Task[] = [];

  currentFilter: 'all' | 'completed' | 'uncompleted' = 'all';
  isSortedByPriority: boolean = false;

  ngOnInit() {
    this.todoService.loadTasks();
    this.todoService.tasks$.subscribe(data => {
      this.tasks = data;
    });
  }

  toggleTask(id: number) {
    this.todoService.toggleTask(id);
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
  }

  get displayedTasks() {
    let result = this.tasks;

    if (this.currentFilter === 'completed') {
      result = result.filter(t => t.completed);
    } else if (this.currentFilter === 'uncompleted') {
      result = result.filter(t => !t.completed);
    }

    if (this.isSortedByPriority) {
      const weights = {high: 3, medium: 2, low: 1};
      result = [...result].sort((a, b) => weights[b.priority] - weights[a.priority]);
    }
    return result;
  }

  editingTaskId: number | null = null;
  startEdit(id: number) {
    this.editingTaskId = id;
  }

  saveEdit(id: number, newTitle: string) {
    if (newTitle.trim()) {
      this.todoService.editTask(id, newTitle);
    }
    this.editingTaskId = null;
  }

  canselEdit() {
    this.editingTaskId = null;
  }

}

export class TodoListComponents {}
