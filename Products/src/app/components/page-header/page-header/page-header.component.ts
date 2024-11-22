import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input({required: true}) title!: string;
  @Input({required:true}) totalData!: string | number;
  ngOnInit(){
    console.log(this.totalData);
  }
}
