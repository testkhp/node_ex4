const express = require('express')
const app = express()
const port = 3000

//데이터베이스 명령어 함수들 사용하기 위한 불러들이는 작업
const MongoClient = require('mongodb').MongoClient;


app.set("view engine","ejs")
app.use(express.static('public'))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 



let db; //데이터베이스 연결을 위한 변수세팅(변수의 이름은 자유롭게 지어도 됨)

MongoClient.connect("mongodb+srv://khp2337:cogktkfkd8214@cluster0.kjr1egt.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("portfolio1");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});


app.get('/', (req, res) => {
  res.render("index.ejs")
})

//라우터 설정
//index.ejs에서 입력한 데이터값을 /insert 요청 시 데이터와 함께 전달된다.
//query는 객체
app.get("/insert",(req,res) => {
   
  db.collection("users").insertOne({
     username:req.query.username,
     userid:req.query.userid,
     address:req.query.address
  },(err)=>{
     if(err){return console.log(err) } //선택사항
     res.send("데이터저장완료")
  })

})
