import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  todoService = inject(TodoService);

  // Variables linked to input fields
  taskTitle: string = '';
  taskPriority: 'low' | 'medium' | 'high' = 'medium';

  onSubmit() {
    if (this.taskTitle.trim()) {
      this.todoService.addTask(this.taskTitle, this.taskPriority);
      this.taskTitle = ''; // Clean the field after successful added
    }
  }
}
