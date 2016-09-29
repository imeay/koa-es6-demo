import Router from 'koa-router';
const router = Router();
import wxService from '../service/wx';
router.get('/',wxService.index);
router.get('/userinfo',wxService.userInfo);

export default router
