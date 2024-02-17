import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloadQueue: string[] = [];
  private currentDownload: { url: string, progress: number } | null = null;

  downloadQueueChanged = new Subject<string[]>();
  downloadProgressChanged = new Subject<{ url: string, progress: number }>();

  addToQueue(url: string) {
    this.downloadQueue.push(url);
    this.downloadQueueChanged.next([...this.downloadQueue]);
    if (!this.currentDownload) {
      this.startNextDownload();
    }
  }

  private startNextDownload() {
    if (this.downloadQueue.length > 0) {
      const url = this.downloadQueue.shift()!;
      this.currentDownload = { url, progress: 0 };
      // Simulate download progress
      const interval = setInterval(() => {
        this.currentDownload!.progress += Math.random() * 10;
        this.downloadProgressChanged.next({ url: this.currentDownload!.url, progress: this.currentDownload!.progress });
        if (this.currentDownload!.progress >= 100) {
          clearInterval(interval);
          this.currentDownload = null;
          this.startNextDownload();
        }
      }, 500);
    }
  }
}
