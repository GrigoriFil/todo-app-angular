import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Local storage of TODO
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Listener
  public tasks$ = this.tasksSubject.asObservable();


  // Method for loading tasks
  loadTasks() {
    this.http.get<any[]>(`${this.apiUrl}?_limit=5`).subscribe(data => {
      const tasks: Task[] = data.map( item => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
        priority: 'medium'
      }));

      // Save data to BehaviorSubject
      this.tasksSubject.next(tasks);
    })
  }

  // Method for crossing out
  toggleTask(id: number) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  // Method for adding tasks
  addTask(title: string, priority: 'low' | 'medium' | 'high') {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
      priority: priority
    };
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([newTask, ...currentTasks]);
  }
}

