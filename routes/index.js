const router = require('koa-router')()
const HP = require("../uilts/query.js")
const { SHOW_ALL_DB } = require('../uilts/sql.js')
const{SELECT_DATABASE} = require('../uilts/sql.js')


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get("/mysql", async(ctx, next) => {
  let query_res = await HP.query(SHOW_ALL_DB); //异步方法调用
  ctx.body = query_res;
});

router.get("/currentsql", async(ctx, next) => {
  let query_res = await HP.query(SELECT_DATABASE); //异步方法调用
  ctx.body = query_res;
});

router.get("/users", async(ctx, next) => {
  let query_res = await HP.query('select * from users'); //异步方法调用
  ctx.body = query_res;
  //ctx.body = {'code':'200','msg':'获取成功'}
});
//用户注册
router.post("/register", async(ctx, next) => {
  let name = ctx.request.body.username
  let password = ctx.request.body.pass
  let allusers = await HP.query('select * from users')
  let isTrue = allusers.some((item)=>{
      return item.name == name
  })
  if(isTrue){
      ctx.body = {"success": false, code: "202", "msg": "用户名已经存在"}
  }else{
      let query_res = await HP.query('INSERT INTO users SET ?',{name,password});
      ctx.body = { "success": true, code: '200', "msg": "恭喜你注册成功" }
  }
});

//用户登录
router.post("/login", async(ctx,next)=> {
  let {username,password} = ctx.request.body
  let alluser = await HP.query('select * from users where name = ?',username);
  ctx.body = alluser
 
  if(alluser.length>0){
      for(i = 0 ; i < alluser.length ; i++){
          if(alluser[i].name == username && alluser[i].password == password){
              ctx.body = { "code": "200", "msg": "登录成功！", "id": alluser[0].id ,"username": alluser[0].name}
          }else{
              ctx.body = { "code": "202", "msg": "密码错误！" }
          }
      }
  }else{
      ctx.body = {"code": "204", "msg": "当前账号未注册！"}
  }
})

//发布文章内容
router.post("/addArticles",async(ctx,next)=>{
  let data = ctx.request.body;
  let sql = "INSERT INTO articles set ?"
  let query_res = await HP.query(sql,data);
  ctx.body = { "code": "200", "msg": "恭喜你文章发布成功" }
})

//获取文章列表   ok
router.get("/info", async(ctx, next) => {
  let query_res = await HP.query('select * from articles'); //异步方法调用
  ctx.body = query_res;
});

//根据文章的特定id去获取文章的详细内容  ok
router.get('/Details_info/:a_id',async(ctx,next)=>{
  let sql = `SELECT * FROM articles WHERE a_id=${ctx.params.a_id}`
  let query_res = await HP.query(sql);
  ctx.body = query_res
})

//根据文章的a_id获取文章对应的评论  ok
router.get('/Comment_info/:a_id',async(ctx,next)=>{
   let sql = `SELECT * FROM comments WHERE c_id=${ctx.params.a_id}`
   let query_res = await HP.query(sql);
   ctx.body = query_res
})

//发表评论  ok
router.post('/add_comments',async(ctx,next)=>{
  let data = ctx.request.body;
  let sql = "INSERT INTO comments set ?"
  let query_res = await HP.query(sql,data);
  ctx.body = { "code": "200", "msg": "发表评论成功" }
})


router.get('/data',async(ctx,next)=>{
  let query_res = await HP.query("select * from message3 where node = 2 order by created_at desc limit 1");
  ctx.body = query_res;
})



module.exports = router
