// juego1.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-juego1',
  templateUrl: './juego1.component.html',
  styleUrls: ['./juego1.component.scss']
})
export class Juego1Component {
  row1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  row2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  row3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  row4: string[] = [' ', 'Backspace']; 

  displayedText: string = '';

  // Manejar el clic en una tecla
  onKeyPress(key: string) {
    if (key === 'Backspace') {
      this.displayedText = this.displayedText.slice(0, -1); 
    } else {
      this.displayedText += key; 
    }
  }
}
