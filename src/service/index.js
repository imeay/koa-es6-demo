export default {
  * version() {
    this.body = {
      version : '1.0.0'
    }
  },
  * index() {
    this.body = {
        name : 'chenxiaochi',
        nickname : 'bendan',
        age : '26'
    }
  },
  * info() {
    const {nickname,age} = this.request.body;
    console.log(nickname);
    this.body = {
      nickname,
      age
    }
  }
}
