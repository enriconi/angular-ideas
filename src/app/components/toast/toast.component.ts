import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DownloadService } from '../../services/download.service';
import { DownloadProgressToastComponent } from '../download-progress-toast/download-progress-toast.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, DownloadProgressToastComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  downloadsInProgress: string[] = [];
  downloadQueueSubscription: Subscription = new Subscription();

  constructor(private downloadService: DownloadService) {
    this.downloadQueueSubscription = this.downloadService.downloadProgressChanged.subscribe(progress => {
      if (!this.downloadsInProgress.includes(progress.url)) {
        this.downloadsInProgress.push(progress.url);
      }
    });
  }

  ngOnDestroy() {
    this.downloadQueueSubscription.unsubscribe();
  }
}
