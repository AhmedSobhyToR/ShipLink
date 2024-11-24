import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { LoadingService } from './services/loading.service';
import { LoadingComponent } from "./components/loading/loading.component";
import { ProductsListComponent } from './pages/products-list/products-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule,
      RouterOutlet, SidenavComponent,
      LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isLoading: boolean = false;

  constructor(private translate: TranslateService,
    private loadingSer: LoadingService,
    private destroyRef : DestroyRef,
    private cd: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('ar');
  }

  ngOnInit(){
   const subscription = this.loadingSer.getLoadingStatus.subscribe({
      next: (val) => {
        this.isLoading = val
        this.cd.detectChanges();
      }
    })
    // this.destroyRef.onDestroy(()=> subscription.unsubscribe())
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }


}
