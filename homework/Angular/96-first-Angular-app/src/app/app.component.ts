import { Component } from '@angular/core';
import Person from '../share/person';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {
    person: Person[] = [
        { firstName: 'George', lastName: 'Wash', age: 290, address: { street: '123 Main St', city: 'Washington', state: 'DC', zip: '00001' } },
        { firstName: 'Donald', lastName: 'Duck', age: 12, address: { street: '212 Quacks Rd', city: 'Anytown', state: 'CA', zip: '10110' } },
        { firstName: 'Abe', lastName: 'Lincoln', age: 56}];
}
