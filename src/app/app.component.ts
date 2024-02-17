import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
