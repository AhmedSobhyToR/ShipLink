import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectedItem } from '../../models/product.model';

@Component({
  selector: 'app-dropdown-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.css',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> DropdownListComponent),
      multi: true
    }
  ]
})
export class DropdownListComponent implements ControlValueAccessor {
  @Input({required:true}) data!: SelectedItem[];
  choosenItem!:SelectedItem;
  isExpanded: boolean = false;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = ()=>{};


  constructor(){}
  writeValue(value: any): void {
    this.choosenItem = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

  toggleDropdownList(){
      this.isExpanded = !this.isExpanded;
      this.onTouched();

  }

  onChooseItem(item: SelectedItem){
    console.log(item);
    this.choosenItem = item
    this.toggleDropdownList();
    this.onChange(this.choosenItem);
    this.onTouched();
  }
}
