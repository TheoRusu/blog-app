import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css'],
})
export class LatestPostsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() posts: Array<BlogPost>;
}
