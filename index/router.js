let express = require('express');
let router = express.Router();
let index = require('./controllers/index')
let user = require('./controllers/user');
let comment = require('./controllers/comment');
router.all('/player/index',index.initIndex);
router.all('/player/get_music',index.getMusic);
router.all('/player/search_music',index.searchMusic);
router.all('/player/get_author',index.getAuthor);
router.all('/player/get_author_songs',index.getAuthorSongList);
router.all('/player/check_nickname',user.checkNickName);
router.all('/player/insert_user',user.insertUser);
router.all('/player/login',user.login);
router.all('/player/collect_music',user.collectMusic);
router.all('/player/update_info',user.updateUserInfo);
router.all('/player/test',user.test);
router.all('/player/add_comment',comment.addComment);
module.exports = router;