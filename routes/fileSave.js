const router = require('koa-router')()
const fs = require('fs');
const FodlerConfig = require('../uilts/folder.js')
const FileConfig = require('../uilts/w_file.js')
const r_FileConfig = require('../uilts/r_file.js')

router.post('/newRegister',async function (ctx, next) {                                   //新用户注册
    let folderName = ctx.request.body.username                                              //文件夹名---->用户名
    let Status = 1                                               
    Status = await FodlerConfig.createUserFolder(folderName)
    if(Status === 1){
        ctx.body =  { "success": true, code: 0, "msg": "注册成功" }
        console.log('文件夹创建成功');
        console.log('执行者',ctx.request.body.username)
        return
    }else if(Status === -1){
        ctx.body =  { "success": false, code: 202, "msg": "注册失败,请联系管理员！" }
        return
    }else if(Status === 0){
        ctx.body =  { "success": false, code: 201, "msg": "账户已存在" }
        console.log('文件夹已存在');
        console.log('执行者',ctx.request.body.username)
        return
    }
})
router.post('/userInfoFile',async function (ctx, next) {   
    let folderName = ctx.request.body.username
    let filename   = ctx.request.body.filename
    let data = ctx.request.body.data
    data = JSON.stringify(data);

    let Status = 1
    Status = await FileConfig.userConfigFileSaves(data,folderName,filename)
    if(Status === 1){
        ctx.body =  { "success": true, code: 0, "msg": "更新成功" }
        console.log('文件创建成功');
        console.log('执行者',ctx.request.body.name)
        return
    }else if(Status === -1){
        ctx.body =  { "success": false, code: 301, "msg": "更新失败" }
        return
    }
})
router.get('/getUserInfo', async function(ctx,next){
    let folderName = ctx.request.query.foldername;
    let fileName = ctx.request.query.filename
    let data = await r_FileConfig.readUserFiles(folderName,fileName)

    if(data !== -1){
        ctx.body = { "success": true, code: 0, "msg": "获取成功",data:data }
    }else{
        ctx.body = { "success": false, code: 401, "msg": "获取失败" }
    }
})
module.exports = router