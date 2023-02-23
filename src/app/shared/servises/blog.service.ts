import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog-interfaces';
import { IUser } from '../interfaces/blog-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
 

  private posts: Array<IBlog> = [
    {
      id: 1,
      title:'First post',
      postedBy: 'admin',
      date: new Date(),
      message:'Enter Login: admin@gmail.com, Password:112233 ',
    }
  ];
  public users :Array<IUser>=[
    {
      id:1,
      username:'Kushniruk',
      email: 'kushniruk@gmail.com',
      password: '7777'
    }
  ];
  constructor() {
    
   }

// Post

getPosts(): Array<IBlog> {
  return this.posts;
}

addPost(newPost: IBlog): void {
  this.posts.push(newPost);
}

updatePost(post: IBlog, id: number): void {
  const index = this.posts.findIndex(post => post.id === id);
  this.posts.splice(index, 1, post);
}
deletePost(id: number): void {
  const index = this.posts.findIndex(post => post.id === id);
  this.posts.splice(index, 1);
}

// User
getUsers():Array<IUser>{
  return this.users
}
addUser(newUser:IUser):void{
  this.users.push(newUser)
}
}
