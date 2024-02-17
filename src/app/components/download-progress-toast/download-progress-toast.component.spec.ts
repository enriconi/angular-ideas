import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadProgressToastComponent } from './download-progress-toast.component';

describe('DownloadProgressToastComponent', () => {
  let component: DownloadProgressToastComponent;
  let fixture: ComponentFixture<DownloadProgressToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadProgressToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadProgressToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
