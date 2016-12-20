import Logger from 'mini-logger';
import path from 'path'
let logger = Logger({
    dir: path.resolve(__dirname,'../logs'),
    categories: [ 'router','model','controller'],
    format: 'YYYY-MM-DD-[{category}][.log]'
});

export default logger;
