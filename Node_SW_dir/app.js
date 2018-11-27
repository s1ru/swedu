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

//admin 사이트 시작

app.post('/process/admin', function(req, res){
        console.log('Access Admin Page');
        var paramPassword = req.body.password; //|| req.query.password;
        if( paramPassword != '2509' ){
                res.send('틀린 비밀번호');
        } else {
/*
                var connection = mysql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: 'ggok1234',
                        database: 'myDB',
                });
                connection.connect();
                var sql = "SELECT * FROM applicant";
                connection.query(sql, function(err,rows, fields ){
                        if(err) { console.log(err) }
                        else    {
                                console.log(sql);
                                res.send(rows);
                        }
                });
                var sqls = "SELECT * FROM teacher";
                connection.query(sqls, function(err,rows, fields ){
                        if(err) { console.log(err) }
                        else    {
                                console.log(sqls);
                                res.send(rows);

                      */
                      var connection = mysql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: 'ggok1234',
                        database: 'myDB',
                });
                connection.connect();
                var sql = "SELECT * FROM applicant";
                connection.query(sql, function(err,rows, fields ){
                        if(err) { console.log(err) }
                        else    {
                                console.log(sql);
                                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                res.write('<h1>학생리스트</h1>');
                                //res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
                                //res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");

                                for ( n = 0; n < rows.length ; n++) {
                                        var l = [rows[n].id,rows[n].time,rows[n].name,rows[n].phone,rows[n].school,
                                                rows[n].sw_education_exp,rows[n].coding_exp,rows[n].motivation];
                                        res.write(l[0]+' / '+l[1]+' / '+l[2]+' / '+l[3]+' / '+l[4]+' / '+l[5]+' / '+l[6]+' / '+l[7]+' / '+'<br>');
                                }
                                res.end();
                        }
                });

                var sql = "SELECT * FROM teacher";
                connection.query(sql, function(err,rows, fields ){
                        if(err) { console.log(err) }
                        else    {
                                console.log(sql);
                                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                res.write('<br><br><h1>교사리스트</h1>');
                                //res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
                                //res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");

                                for ( n = 0; n < rows.length ; n++) {
                                        var l = [rows[n].id,rows[n].time,rows[n].name,rows[n].phone,rows[n].school,
                                                rows[n].motivation];
                                        res.write(l[0]+' / '+l[1]+' / '+l[2]+' / '+l[3]+' / '+l[4]+' / '+l[5]+' /  '+'<br>');
                                }
                                res.end();
                        }
                });


                connection.end();
                }

});

//admin 사이트 끝


var router = express.Router();

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
