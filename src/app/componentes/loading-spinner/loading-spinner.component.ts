import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../servicios/loading.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div *ngIf="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
}
