import { Component, OnDestroy, OnInit } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DownloadProgressToastComponent } from '../download-progress-toast/download-progress-toast.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, DownloadProgressToastComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements OnInit, OnDestroy {
  constructor(private downloadService: DownloadService) {}
  i = 0;
  downloadFile(url: string) {
    this.downloadService.addToQueue(url+this.i++);
  }

  downloadQueue: string[] = [];
  downloadQueueSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.downloadQueueSubscription = this.downloadService.downloadQueueChanged.subscribe(queue => {
      this.downloadQueue = queue;
    });
  }

  ngOnDestroy() {
    this.downloadQueueSubscription.unsubscribe();
  }
}
