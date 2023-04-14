import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";


export interface ToastData {
  severity: string;
  summary: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar){}

// Snackbar that opens with success background
  openSnackBar(options: Partial<ToastData>){
    let style = options.severity == 'info' ? 'green-snackbar' : 'red-snackbar';
    let action = options.summary || "OK";
    this.snackBar.open(options.comment|| "message", action, {
      duration: 3000,
      panelClass: [style],
    });
  }
}
