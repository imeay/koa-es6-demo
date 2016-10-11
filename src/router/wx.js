import Router from 'koa-router';
import wxService from '../service/wx';
const router = Router();
router.get('/',wxService.index);
router.get('/userinfo',wxService.userInfo);

export default router
