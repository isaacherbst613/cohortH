import { Component, EventEmitter, Input, Output } from '@angular/core';
import Category from '../shared/Category';

@Component({
  selector: 'app-selecter',
  templateUrl: './selecter.component.html',
  styleUrls: ['./selecter.component.css']
})
export class SelecterComponent {

    @Input() categories!: Category[];
    @Output() selectionChanged = new EventEmitter<number>();
    selected = 0;
    selection(){
        this.selectionChanged.emit(this.selected);
    }
    
}
