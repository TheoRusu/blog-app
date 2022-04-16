import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnInit, OnDestroy {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.postService
        .getPostbyId(params['id'])
        .subscribe((data) => (this.post = data));
      //TODO: Get post by Id params['id'] and store the result in this.post
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }

  submitComment(): void {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    });
    this.postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = '';
      this.commentText = '';
    });
  }
}
