import { Component, Input } from '@angular/core';
import Category from './shared/Category';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = '97';

    category: Category[] = [
        {
            type: 'fruit',
            items: [
                { name: 'apple', price: 1.5 },
                { name: 'banana', price: 2 },
                { name: 'orange', price: 1 },
                { name: 'pear', price: 1.4 },
                { name: 'grape', price: 4 }]
        },
        {
            type: 'vegetable',
            items: [
                { name: 'carrot', price: 2 },
                { name: 'broccoli', price: 5 },
                { name: 'cabbage', price: 4 },
                { name: 'spinach', price: 3.5 }]
        },
        {
            type: 'meat',
            items:  [
                { name: 'chicken', price: 9.99 },
                { name: 'beef', price: 19 },
                { name: 'lamb', price: 28.99 }]
        },
        {
            type: 'dairy',
            items:  []
        }
    ];

    selected = 0;
    selectionChanged(index: number){
        this.selected = index;
    }
    
}
