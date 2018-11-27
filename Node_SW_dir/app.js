//
//  2018.11.15
//   Jongwook
//
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
/*
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1111',
	database: 'myDB'
});
*/
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', function(req, res){
    console.log('Accese home');
    res.send('Hello home page :)');
});
//학생 접수 사이트
app.post('/process/application', function(req, res){
	console.log('Access Process Application');
	var connection = mysql.createConnection({
       		host: 'localhost',
        	user: 'root',
        	password: 'ggok1234',
        	database: 'myDB',
	});
	connection.connect();

	var paramName = req.body.name,
		paramPhone = req.body.phone,
		paramSchool = req.body.school,
		paramGrade = req.body.grade,
		paramSWEducation = req.body.sw_edu_exp,
		paramCoding = req.body.coding_exp,
		paramMotivation = req.body.motivation;
	var params = [paramName,paramPhone,paramSchool,paramGrade,paramSWEducation,paramCoding,paramMotivation];
	var sql = 'INSERT INTO applicant (name,phone,school,grade,sw_education_exp, coding_exp, motivation) values (?,?,?,?,?,?,?)';
	//var params = ['Jongwook', '01063302476','서울해광동초등학교' ,4,0,1,'열심히할게요' ];
        connection.query(sql,params, function(err,rows, fields ){
                if(err) { console.log(err) }
                else { console.log(rows) }
        });
        connection.end();

   // res.send('Success Application !! '+params);
	res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
      	res.write('<h1>접수되었습니다.</h1>');
	res.write( '<a href=/SW_Edu_Day.html> 홈페이지로 돌아가기 </a>');
    res.end();
});
//학생 접수 사이트 끝

//학생 접수 확인
app.post('/process/search', function(req, res){
        console.log('Access Process Search');
        var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'ggok1234',
                database: 'myDB',
        });
        connection.connect();
        var paramName = req.body.name,
                paramPhone = req.body.phone;
        //var params = [paramName,paramPhone];
        //var sql = 'SELECT name FROM applicant WHERE name = '+ paramName + ' AND phone = '+paramPhone+';';
	var sql = "SELECT name FROM applicant WHERE name = '"+  paramName + "' AND phone = '"+ paramPhone+"';";
        //var params = ['Jddddaongwook', '01063302476','서울해광동초등학교' ,4,0,1,'열심히할게요' ];
        connection.query(sql, function(err,rows, fields ){
                if(err) { console.log(err) }
                else 	{
			console.log(sql); console.log("result:"); console.log(rows.length);
			if(rows.length == 0) {
			res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h1>신청 내역이 없습니다.</h1>');
				res.write( '<a href=/SW_Edu_Day.html> 홈페이지로 돌아가기 </a>');
			res.end();
			}
			else{
			res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h1>이미신청되었습니다.</h1>');
				res.write( '<a href=/SW_Edu_Day.html> 홈페이지로 돌아가기 </a>');
			res.end();

			}
		}
        });
        connection.end();

    //res.send('Success Application !! ');
});
//학생 접수 확인 끝


//교사 접수 사이트
app.post('/process/teacher', function(req, res){
	console.log('Access Process Application');
	var connection = mysql.createConnection({
       		host: 'localhost',
        	user: 'root',
        	password: 'ggok1234',
        	database: 'myDB',
	});
	connection.connect();

	var paramName = req.body.name,
		paramPhone = req.body.phone,
		paramSchool = req.body.school,
    paramMotivation = req.body.motivation;

	var params = [paramName,paramPhone,paramSchool,paramMotivation];
	var sql = 'INSERT INTO teacher (name,phone,school,motivation) values (?,?,?,?)';
	//var params = ['Jongwook', '01063302476','서울해광동초등학교' ];
        connection.query(sql,params, function(err,rows, fields ){
                if(err) { console.log(err) }
                else { console.log(rows) }
        });
        connection.end();

   // res.send('Success Application !! '+params);
	res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
      	res.write('<h1>접수되었습니다.</h1>');
	res.write( '<a href=/SW_Edu_Day.html> 홈페이지로 돌아가기 </a>');
    res.end();
});
//교사 접수 사이트 끝

//교사 접수 확인 사이트
app.post('/process/search_teacher', function(req, res){
        console.log('Access Process Search');
        var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'ggok1234',
                database: 'myDB',
        });
        connection.connect();
        var paramName = req.body.name,
            paramPhone = req.body.phone;
        //var params = [paramName,paramPhone];
        //var sql = 'SELECT name FROM applicant WHERE name = '+ paramName + ' AND phone = '+paramPhone+';';
	var sql = "SELECT name FROM teacher WHERE name = '"+  paramName + "' AND phone = '"+ paramPhone+"';";
        //var params = ['Jddddaongwook', '01063302476' ];
        connection.query(sql, function(err,rows, fields ){
                if(err) { console.log(err) }
                else 	{
			console.log(sql); console.log("result:"); console.log(rows.length);
			if(rows.length == 0) {
			res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h1>신청 내역이 없습니다.</h1>');
				res.write( '<a href=/SW_Edu_Day.html> 홈페이지로 돌아가기 </a>');
			res.end();
			}
			else{
			res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h1>이미신청되었습니다.</h1>');
				res.write( '<a href=/SW_Edu_Day.html> 홈페이지로 돌아가기 </a>');
			res.end();

			}
		}
        });
        connection.end();

    //res.send('Success Application !! ');
});

//교사 접수확인 사이트 끝


var router = express.Router();
/*
router.route('/process/formResponse').post(function(req, res) {
	console.log('/process/formResponse 호출됨.');
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	if (req.session.user) {
		res.redirect('/public/product.html');
	} else {
		// 세션 저장
		req.session.user = {
			id: paramId,
			name: '이름',
			authorized: true
		};
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
		res.end();
	}
}); */
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
