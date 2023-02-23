import { Component } from '@angular/core';
import { BlogService } from '../shared/servises/blog.service';
import { IBlog } from '../shared/interfaces/blog-interfaces';
import { IUser } from '../shared/interfaces/blog-interfaces';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  public posts!: IBlog[];
  public users!: IUser[];
  public email!: string;
  public password!: string;
  public trueEmail = 'admin@gmail.com';
  public truePassword = '112233';

  public mainUserName!: string;

  public singInStatus = false;
  public editStatus = false;
  public editID!: number;

  public newTitle!: string;
  public newMessage!: string;

  public userName!: string;
  public userEmail!: string;
  public userPassword!: string;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.posts = this.blogService.getPosts();
    this.users = this.blogService.getUsers();
  }
  singIn(): void {
    if (this.email == this.trueEmail && this.password == this.truePassword) {
      this.singInStatus = true;
      this.mainUserName = 'admin';
    }
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.email == this.users[i].email &&
        this.password == this.users[i].password
      ) {
        this.singInStatus = true;
        this.mainUserName = this.users[i].username;
      }
    }
  }

  singOut(): void {
    this.singInStatus = false;
    this.mainUserName = '';
    this.resetAll();
  }

  addPost(): void {
    const newPost: IBlog = {
      id: 1,
      postedBy: this.mainUserName,
      title: this.newTitle,
      date: new Date(),
      message: this.newMessage,
    };
    if (this.posts.length > 0) {
      const id = this.posts.slice(-1)[0].id;
      newPost.id = id + 1;
    }

    this.blogService.addPost(newPost);
    this.resetAll();
  }

  editPost(post: IBlog): void {
    this.editStatus = true;
    this.newTitle = post.title;
    this.newMessage = post.message;
    this.editID = post.id;
  }

  saveEdit(): void {
    const updatePost: IBlog = {
      id: this.editID,
      postedBy: this.mainUserName,
      title: this.newTitle,
      date: new Date(),
      message: this.newMessage,
    };
    this.mainUserName = updatePost.postedBy;
    this.blogService.updatePost(updatePost, this.editID);
    this.resetAll();
  }

  deletePost(post: IBlog): void {
    if (confirm('Delete this Post ? ')) {
      this.blogService.deletePost(post.id);
    }
  }
  singUp(): void {}
  // додавання  користувача
  addUser(): void {
    this.users = this.blogService.users;
    const newUser: IUser = {
      id: 1,
      username: this.userName,
      email: this.userEmail,
      password: this.userPassword,
    };
    if (this.users.length > 0) {
      const id = this.users.slice(-1)[0].id;
      newUser.id = id + 1;
    }
    this.blogService.addUser(newUser);
    this.mainUserName = newUser.username;
    this.singInStatus = true;
    this.userName = '';
    this.userEmail = '';
    this.userPassword = '';
  }

  resetAll(): void {
    this.email = '';
    this.password = '';
    this.editStatus = false;
    this.newTitle = '';
    this.newMessage = '';
  }
}
