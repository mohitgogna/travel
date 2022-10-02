import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Travel';

  myObservable=new Observable((observer)=>{
    console.log("Observable start");
    observer.next("1");
    observer.next("2");
    observer.next("3");
    observer.next("4");
    
    setTimeout(() => {
      observer.next("5");  
    }, 1000);
    
    observer.next("6");
  });

  ngOnInit(){
    this.myObservable.subscribe((value)=>{
      console.log(value);
    });
  }
}
