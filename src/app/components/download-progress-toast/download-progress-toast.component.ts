import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-progress-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-progress-toast.component.html',
  styleUrl: './download-progress-toast.component.scss'
})
export class DownloadProgressToastComponent implements OnInit, OnDestroy {
  @Input() url: string = '';
  progress = 0;
  progressSubscription: Subscription = new Subscription();
  completed = false;

  constructor(private downloadService: DownloadService) {}

  ngOnInit() {
    this.progressSubscription = this.downloadService.downloadProgressChanged.subscribe(progress => {
      if (progress.url === this.url) {
        this.progress = progress.progress;
        if (this.progress >= 100) {
          this.completed = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }
}
