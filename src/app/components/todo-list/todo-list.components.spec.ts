import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponents } from './todo-list.components';

describe('TodoListComponents', () => {
  let component: TodoListComponents;
  let fixture: ComponentFixture<TodoListComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
