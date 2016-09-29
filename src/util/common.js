export const address =(request)=>{
  return 'http://' + request.header.host +  request.url;
}
