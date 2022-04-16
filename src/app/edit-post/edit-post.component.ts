import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService
      .getPostbyId(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.blogPost = data;
        this.tags = this.blogPost.tags.toString();
      });
  }

  formSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());
    this.postService
      .updatePostById(this.blogPost._id, this.blogPost)
      .subscribe(() => this.router.navigate(['admin']));
  }

  deletePost() {
    this.postService
      .deletePostById(this.blogPost._id)
      .subscribe(() => this.router.navigate(['admin']));
  }
}
