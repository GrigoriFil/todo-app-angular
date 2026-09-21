import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent} from './components/todo-list/todo-list.components';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  imports: [RouterOutlet, TodoListComponent, TodoFormComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly title = signal('todo-app-angular');
}
