import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';



import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Item {
  name: string,

};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'angular-dragdrop';
  //todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  //done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  todo:any = [];
  done:any = ['Get up'];
  todoFb$:Observable<any>;
  doneFb$:Observable<any>;
  tasks$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  taskTitle = '';
  barni:any;

  constructor() {
    const itemCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(itemCollection);

    const todoCollection = collection(this.firestore, 'todo');
    this.todoFb$ = collectionData(todoCollection);
   
     this.todoFb$.subscribe((newtodo:any) => {
      this.todo = newtodo;
        console.log('this.todo',this.todo);
     })
   
    
    

    const doneCollection = collection(this.firestore, 'done');
    this.doneFb$ = collectionData(doneCollection);

    console.log((todoCollection));
    this.todoFb$.subscribe((task) => {
      console.log(task);

    });
  }

  addTask() {
    const todoCollection = collection(this.firestore, 'todo');
    setDoc(doc(todoCollection),{title:this.taskTitle});
    this.todo.push(this.taskTitle)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.item.element.nativeElement);
      console.log(event.container.element);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('event.previousContainer.data/vorheriges array',event.previousContainer.data);
      console.log('event.container.data/aktueles array',event.container.data);
      console.log('event.previousIndex/vorherige index',event.previousIndex);
      console.log('event.currentIndex/ aktuele index',event.currentIndex);
      event.previousContainer.data.push('hallo');
    }
  }


}
