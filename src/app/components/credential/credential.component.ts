import { Component, Inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-credential',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credential.component.html',
  styleUrl: './credential.component.css'
})
export class CredentialComponent implements OnInit {

  private authService = Inject(AuthService);

  public user = computed(() => this.authService.currentUser);

  ngOnInit(): void {
    console.log(this.user);
  }
  /*  get user() {
     return this.authService.currentUser();
   } */
}
