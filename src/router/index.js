import Router from 'koa-router';
const router = Router();
import indexService from '../service';


router.get('/',indexService.index);
router.get('/version',indexService.version);
router.post('/info',indexService.info);


export default router
