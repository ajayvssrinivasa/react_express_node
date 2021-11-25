const express = require('express');
const fs = require('fs');

const router = express.Router();
router.get("/fetchpost",(req, res)=>{
   let data = getPostdata();
    res.json({"err":0, "pdata":data.Posts})
})

router.post("/addpost", (req, res)=>{
    let title = req.body.title;
    let description = req.body.description
    let data = {title: title, description:description}
    let json_data = getPostdata();
    json_data.Posts.push(data);
    savePostdata(json_data);
    res.json({"err":0, "msg":"Saved successfully"})
 })
router.delete("/deletepost/:ind",(req,res)=>{
    const { ind } = req.params;
    const posts1 = getPostdata();
    posts1.Posts.splice(ind, 1);
    savePostdata(posts1);
    res.json({"err":0,"msg":"deleted succesfully"})
})
router.get("/editpost/:ind",(req,res)=>{
    const { ind } = req.params;
    const posts1 = getPostdata();
    const send_data=posts1.Posts[ind];
    res.json({"err":0,"sdata":send_data})
})
router.put("/updatepost/:tit",(req,res)=>{
    const {tit}=req.params;
    const post1=getPostdata();
    const index=post1.Posts.findIndex(pt=>pt.tit===tit);
    post1.Posts.splice(index, 1);
    post1.Posts.push({title:req.body.title,description:req.body.description})
    savePostdata(post1);
    res.json({"err":0,"msg":"Updated successfull"})
})
 const savePostdata = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('Posts.json', stringifyData)
}

const getPostdata = () => {
    const jsonData = fs.readFileSync('Posts.json')
    return JSON.parse(jsonData)    
}
module.exports = router;