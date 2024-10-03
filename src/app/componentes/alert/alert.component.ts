import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  isVisible: boolean = false;
  alertMessage: string = '';

  openAlert(message: string) {
    this.alertMessage = message;
    this.isVisible = true;
  }

  closeAlert() {
    this.isVisible = false;
  }
}
