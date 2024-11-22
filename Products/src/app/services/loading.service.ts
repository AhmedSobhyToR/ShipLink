import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$!: BehaviorSubject<boolean>;
  constructor() { 
    this.isLoading$ = new BehaviorSubject<boolean>(false);
  }

 get getLoadingStatus(){
    return this.isLoading$;
  }

  startLoading(){
    this.isLoading$.next(true);
    console.log("Is loading");
  }
  endLoading(){
    this.isLoading$.next(false);
    console.log("Finish Loading");
  }
}
