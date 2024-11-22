import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private loadingSer: LoadingService,
    private router: Router,
  ){}

  onNavigate(url:string){
    this.loadingSer.startLoading();
    this.router.navigate([url]);
  }


}
