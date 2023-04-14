import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import {JeuRequest} from "../../models/JeuRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {JeuxService} from "../services/jeux.service";

@Component({
  selector: 'app-image-upload',
  template: `
    <mat-card>
      <mat-card-title>Modification Url_Media du jeu</mat-card-title>
      <mat-card-content>
        <label class="btn btn-default p-0">
          <input type="file" accept="image/*" (change)="selectFile($event)" />
        </label>

        <button mat-raised-button
          class="btn btn-success btn-sm float-right"
          [disabled]="!selectedFiles"
          (click)="upload()">
          Upload
        </button>

        <img [src]="preview" class="preview">


        <div *ngIf="currentFile && progress" class="progress my-3">
          <div
            class="progress-bar progress-bar-info"
            role="progressbar"
            attr.aria-valuenow="{{ progress }}"
            aria-valuemin="0"
            aria-valuemax="100"
            [ngStyle]="{ width: progress + '%' }"
          >
            {{ progress }}%
          </div>
        </div>

        <div *ngIf="message" class="alert alert-secondary" role="alert">
          {{ message }}
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    ':host { display: flex; justify-content: center; margin: 100px 0;}',
    'mat-card {  max-width: 600px;}',
    'mat-card-title, mat-card-content { display: flex; justify-content: center; flex-direction: column}',
    '.error {padding: 16px;width: 300px;color: white;background-color: red;}',
    '.button { display: flex; justify-content: flex-end;}'
  ]
})
export class ImageUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  imageInfos?: Observable<any>;

  constructor(private route: ActivatedRoute, private router: Router, private uploadService: FileUploadService, private jeuService: JeuxService) {}

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0)
      if (file) {
        this.currentFile = file;
        console.log(file.type)
        this.jeuService.uploadMedia(file.name, this.id).pipe(
          tap(() => this.router.navigate(['listeJeu']))
        ).subscribe()
      }
    }
  }

}
