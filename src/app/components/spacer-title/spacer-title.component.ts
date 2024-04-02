import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-spacer-title',
  standalone: true,
  imports: [],
  templateUrl: './spacer-title.component.html',
  styleUrl: './spacer-title.component.css'
})
export class SpacerTitleComponent {
  @Input() title?: string;

}
