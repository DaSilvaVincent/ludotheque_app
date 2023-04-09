import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <img width="800px" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/81/ca/97/drone-view-of-beach.jpg?w=700&h=500&s=1" alt="image">
    </div>
  `,
  styles: [
    ':host {margin: auto auto}',
    '.container {height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center;}'
  ]
})
export class DashboardComponent {

}
