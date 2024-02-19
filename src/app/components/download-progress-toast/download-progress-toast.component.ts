import { Component, OnDestroy, OnInit } from '@angular/core';
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
  progressArray: { url: string; progress: number; completed?: boolean; }[] = [];
  progressSubscription: Subscription = new Subscription();

  constructor(private downloadService: DownloadService) {}

  ngOnInit() {
    this.progressSubscription = this.downloadService.downloadProgressChanged.subscribe(progress => {
      if (!this.progressArray.find(p => p.url === progress.url)) {
        this.progressArray.push(progress);
      } else {
        this.progressArray = this.progressArray.map(p => {
          if (p.url === progress.url) {
            return progress;
          }
          return p;
        });
      }

      this.progressArray.forEach(progress => {
        if (progress.progress >= 100) {
          progress.completed = true;
        }
      })
    });
  }

  calculatePosition(index: number): number {
    return 20 + (index * 45);
  }

  calculateHeight(): number {
    if (this.progressArray.length === 0) return 0;
    return 20 + (this.progressArray.length * 45);
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }
}
