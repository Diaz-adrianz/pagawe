import express from 'express';
import TweetCtrl from '../controllers/tweets.js';
import UsersCtrl from '../controllers/users.js';
import AuthCtrl from '../controllers/auth.js';

const router = express.Router();
const { login, logout, middleWare, isAdmin, isUser, getId } = AuthCtrl;

router.post('/login', login);
router.delete('/logout', logout);

router.get('/uid', middleWare, getId);

// DAPATKAN BANYAK USER
router.get('/users', middleWare, isAdmin, UsersCtrl.getMany);

// AMBIL 1 USER
router.get('/users/:id', middleWare, isAdmin, UsersCtrl.getONe);
router.get('/user', middleWare, isUser, UsersCtrl.getONe);

// UNGGAH 1 USER
router.post('/users', middleWare, isAdmin, UsersCtrl.create);

// EDIT 1 USER
router.put('/users/:id', middleWare, isAdmin, UsersCtrl.update);

// HAPUS 1 USER
router.delete('/users/:id', middleWare, isAdmin, UsersCtrl.delete);

// AMBIL SEMUA CUITAN milik user :id => user._id
router.get('/tweets/:id', middleWare, isAdmin, TweetCtrl.get);
router.get('/tweet', middleWare, isUser, TweetCtrl.get);

router.get('/tweetspublic', TweetCtrl.getPublic);

// UPLOAD 1 CUITAN
router.post('/tweets', middleWare, isUser, TweetCtrl.create);

// EDIT MODE CUITAN
router.get('/tweetsmode/:id', middleWare, isAdmin, TweetCtrl.visibility);

// HAPUS CUITAN
router.delete('/tweets/:id', middleWare, isUser, TweetCtrl.delete);

export default router;
