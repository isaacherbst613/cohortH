import { Component, Input } from '@angular/core';
import Category from '../shared/Category';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  @Input() selection!: Category;

}
