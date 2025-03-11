import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animated-text">
      <span>{{ displayedText }}</span>
    </div>
  `,
  styles: [`
    .animated-text {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-color);
    }
  `]
})
export class AnimatedTextComponent implements OnInit {
  @Input() text: string = ''; // Textul de animat, transmis prin proprietate
  displayedText: string = '';
  private index: number = 0;
  private isDeleting: boolean = false;
  private pause: boolean = false;

  ngOnInit() {
    this.animateText();
  }

  private animateText() {
    const typeSpeed = 50; // Viteza de scriere
    const deleteSpeed = 50; // Viteza de ștergere
    const pauseTime = 5000; // Pauza după ce textul este complet scris

    if (this.pause) {
      setTimeout(() => {
        this.isDeleting = true;
        this.pause = false;
        this.animateText();
      }, pauseTime);
    } else if (!this.isDeleting) {
      if (this.index < this.text.length) {
        this.displayedText += this.text[this.index];
        this.index++;
        setTimeout(() => this.animateText(), typeSpeed);
      } else {
        this.pause = true;
        setTimeout(() => this.animateText(), pauseTime);
      }
    } else {
      if (this.index > 0) {
        this.displayedText = this.displayedText.slice(0, -1);
        this.index--;
        setTimeout(() => this.animateText(), deleteSpeed);
      } else {
        this.isDeleting = false;
        setTimeout(() => this.animateText(), typeSpeed);
      }
    }
  }
}
