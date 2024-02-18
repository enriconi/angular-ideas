import { Component } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { CommonModule } from '@angular/common';
import { DownloadProgressToastComponent } from '../download-progress-toast/download-progress-toast.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, DownloadProgressToastComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
  constructor(private downloadService: DownloadService) {}
  downloadFile() {
    this.downloadService.addToQueue('1'+Math.floor(Math.random() * 101));
  }
}
