import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlogInfo, BlogInfoServerResponse } from './blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

  getBlogs(): Observable<BlogInfo[]> {
    return this.httpClient.get<BlogInfoServerResponse[]>('https://jsonplaceholder.typicode.com/users').pipe(map(blogs => {
      return blogs.map(blog => {
        return {
          id: blog.id,
          name: blog.name,
          website: blog.website,
          companyName: blog.company.name,
          companyCatchPhrase: blog.company.catchPhrase,
          companyBs: blog.company.bs
        };
      });
    }));
  }
}