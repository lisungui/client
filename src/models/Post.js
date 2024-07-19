class Post {
  constructor(data = {}) {
  this.id = null;
  Object.assign(this, data);
  }
}
    
export default Post;