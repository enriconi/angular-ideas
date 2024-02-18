import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloadQueue: string[] = [];
  private currentDownloads: { url: string, progress: number }[] = [];

  downloadQueueChanged = new Subject<string[]>();
  downloadProgressChanged = new Subject<{ url: string, progress: number }>();

  addToQueue(url: string) {
    console.log('Currente Download', this.currentDownloads)
    this.downloadQueue.push(url);
    this.downloadQueueChanged.next([...this.downloadQueue]);
    this.startNextDownload();
  }

  private startNextDownload() {
    if (this.downloadQueue.length > 0) {
      const url = this.downloadQueue.shift()!;
      const download = { url, progress: 0 };
      this.currentDownloads.push(download);
      this.downloadProgressChanged.next({ url: download.url, progress: download.progress });

      const interval = setInterval(() => {
        download.progress += Math.random() * 10;
        this.downloadProgressChanged.next({ url: download.url, progress: download.progress });
        if (download.progress >= 100) {
          clearInterval(interval);
          this.currentDownloads = this.currentDownloads.filter(d => d !== download);
          this.startNextDownload();
        }
      }, 500);
    }
  }
}
