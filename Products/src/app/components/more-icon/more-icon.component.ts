import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-more-icon',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './more-icon.component.html',
  styleUrl: './more-icon.component.css'
})
export class MoreIconComponent {
  isExpanded: boolean = false;
  @Input({required: true}) id!: number | string;
  @Input({required: true}) url!: string;

  constructor(private router: Router,
    private loadingSer: LoadingService
  ){}

  onExpand(){
    this.isExpanded = !this.isExpanded;
  }

  onDetailsView(){
    this.isExpanded = false;
    // this.loadingSer.startLoading();
    this.router.navigate([this.url, this.id])
  }
}
