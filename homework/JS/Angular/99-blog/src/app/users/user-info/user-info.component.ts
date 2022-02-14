import { Component, Input } from '@angular/core';
import { BlogInfo } from 'src/app/shared/blogs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

    @Input() blogInfo!: BlogInfo;

}
