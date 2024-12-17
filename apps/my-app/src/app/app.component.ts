import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { fromEvent, interval, mergeMap, switchMap, take } from 'rxjs';

@Component({
  imports: [RouterModule, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'my-app2';

  ngOnInit(){
    fromEvent(document, 'click').pipe(
      mergeMap(() => interval(1000).pipe(take(10)), )
    ).subscribe(console.log);
  }
}
