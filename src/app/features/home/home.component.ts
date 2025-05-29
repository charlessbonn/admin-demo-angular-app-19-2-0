import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userServices = inject(UserService);

  async ngOnInit() {
    const user = await this.userServices.getUser();
  }
}
