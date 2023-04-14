import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
            <header>
               404
            </header>
        `,
  styles: [
    'header{height: 100vh;  display: flex; flex-direction: column; align-items: center; justify-content: center; background-size: cover;font-size: 30rem; }'
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
