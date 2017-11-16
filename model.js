var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');
var session = require('express-session');

var sess;
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/fronts/views');
app.set('view engine', 'html');
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/fronts', express.static(__dirname + '/fronts'));
app.use('/image', express.static(__dirname + '/image'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));

app.use(core_use());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var config = {
	user: "postgres",
	database: "TISI",
	password: "12345",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000
}

var canal = new pg.Pool(config);

//===================================
//-------------- TELAS --------------
//===================================

app.get('/index',function(req,res){
	res.render('index.html');
});

app.get('/cadastro_site',function(req,res){
	res.render('cadastro_site.html');
});

app.get('/login',function(req,res){
	res.render('login.html');
});

app.get('/produtos',function(req,res){
	res.render('Produtos.html');
});

app.get('/servicos',function(req,res){
	res.render('Servicos.html');
});

app.get('/Cadastrar_Ordem_Servico',function(req,res){
	res.render('Ordem_servico.html');
});

// encerra sessão
app.get('/logout',function(req,res){		
	req.session.destroy(function(err){		
		if (err) {			
			console.log(err);		
		}	
	});
	res.redirect('/login');
});


// telas quer precisam de login
app.get('/menu',function(req,res){
    sess=req.session;
    if (sess.email){
    	res.render('menu.html');
    } 
    else {
    	res.render('login.html');
    } 
});

app.get('/cadastro_juridica',function(req,res){
    sess=req.session;
    if (sess.email){
    	res.render('cadastro_juridica.html');
    } 
    else {
    	res.render('login.html');
    } 
});

app.get('/cadastro_fisica',function(req,res){
    sess=req.session;
    if (sess.email){
    	res.render('cadastro_fisica.html');
    } 
    else {
    	res.render('login.html');
    } 
});

app.get('/cadastro_Produto',function(req,res){
    sess=req.session;
    if (sess.email){
    	res.render('cadastro_Produtos.html');
    } 
    else {
    	res.render('login.html');
    } 
});

app.get('/cadastro_Servico',function(req,res){
    sess=req.session;
    if (sess.email){
    	res.render('cadastro_Servico.html');
    } 
    else {
    	res.render('login.html');
    } 
});

app.get('/cadastro_OS',function(req,res){
    sess=req.session;
    if (sess.email){
    	res.render('cadastro_OS.html');
    } 
    else {
    	res.render('login.html');
    } 
});


//Método para Login
app.post('/logar', function (req, res) {
	var sess = req.session;
	canal.connect(function (erro, conexao, finalizado) {
		if (erro) {
			return console.error('Erro ao conectar ao Banco de Dados', erro);
		}
		var sql = 'SELECT COUNT(*) as valor '
			+ 'FROM TB_EMPRESA '
			+ 'WHERE EMAIL = \'' + req.body.email + '\' '
			+ 'AND SENHA = MD5(\'' + req.body.senha + '\'); ';
		
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			finalizado();
			if (erro) {
				return console.error('Erro na consulta da tabela', erro);
			}
			var valor = resultado.rows[0].valor;
			if( valor == 1){
				sess.email = req.body.email;
			}
			console.log(req);		
			res.json(valor);
			console.log("Valor Select: ", resultado.rows);
		});
	});
});
//=============================================================

//Método para inserir Pessoa Fisica
app.post('/cadastroClienteFisico', function (req, res) {
	canal.connect(function (erro, conexao, finalizado) {

		if (erro) {
			return console.error('Erro ao conectar ao Banco de Dados', erro);
		}
		
		var sql = 'INSERT INTO TB_CLIENTE_FISICO (ID_CLIENTE, NOME, SOBRENOME, CPF, DT_NASCIMENTO, EMAIL, TELEFONE, RUA, NUMERO, BAIRRO, CEP, CIDADE, ESTADO, ID_EMPRESA, FG_ATIVO)'
			+ ' VALUES'
			+ '(default, \'' +
			req.body.nome + '\', \'' +
			req.body.sobrenome + '\', \'' +
			req.body.cpf + '\', \'' +
			req.body.dt_nascimento + '\', \'' +
			req.body.email + '\', \'' +
			req.body.telefone + '\', \'' +
			req.body.rua + '\', ' +
			req.body.numero + ' , \'' +
			req.body.bairro + '\', \'' +
			req.body.cep + '\', \'' +
			req.body.cidade + '\', \'' +
			req.body.estado + '\', ' +
			req.body.id_empresa + ', 1);';
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			finalizado();
			if (erro) {
				return console.error('Erro ao inserir cliente !', erro);
			}
			res.json("Cliente cadastrado com Sucesso !");
		});
	});
});
//=============================================================

//Método para inserir Pessoa Juridica
app.post('/cadastroClienteJuridico', function (req, res) {
	canal.connect(function (erro, conexao, finalizado) {

		if (erro) {
			return console.error('Erro ao conectar ao Banco de Dados', erro);
		}

		var sql = 'INSERT INTO TB_CLIENTE_JURIDICO (ID_CLIENTE, NOME_FANTASIA, RAZAO_SOCIAL, CNPJ, EMAIL, TELEFONE, RUA, NUMERO, BAIRRO, CEP, CIDADE, ESTADO, ID_EMPRESA, FG_ATIVO)'
			+ ' VALUES'
			+ '(default, \'' +
			req.body.nomeFantasia + '\', \'' +
			req.body.razaoSocial + '\', \'' +
			req.body.cnpj + '\', \'' +
			req.body.email + '\', \'' +
			req.body.telefone + '\', \'' +
			req.body.rua + '\', ' +
			req.body.numero + ' , \'' +
			req.body.bairro + '\', \'' +
			req.body.cep + '\', \'' +
			req.body.cidade + '\', \'' +
			req.body.estado + '\', ' +
			req.body.id_empresa + ', 1);';
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			finalizado();
			if (erro) {
				return console.error('Erro ao inserir cliente !', erro);
			}
			res.json("Cliente cadastrado com Sucesso !");

		});
	});
});
//=============================================================

//Método para inserir Empresa
app.post('/cadastroEmpresa', function (req, res) {
	canal.connect(function (erro, conexao, finalizado) {

		if (erro) {
			return console.error('Erro ao conectar ao Banco de Dados', erro);
		}
		console.log("********************************************");
		console.log(req.body);
		console.log("********************************************");
		var sql = 'INSERT INTO TB_EMPRESA(ID_EMPRESA, RAZAO_SOCIAL, NOME_FANTASIA, CNPJ, EMAIL, SENHA, TELEFONE, RUA, NUMERO, BAIRRO, CEP, CIDADE, ESTADO, FG_ATIVO)'
			+ ' VALUES'
			+ '(default, \'' +
			req.body.razaoSocial + '\', \'' +
			req.body.nomeFantasia + '\', \'' +
			req.body.cnpj + '\', \'' +
			req.body.email + '\', md5(\'' +
			req.body.senha + '\'), \'' +
			req.body.telefone + '\', \'' +
			req.body.rua + '\', ' +
			req.body.numero + ' , \'' +
			req.body.bairro + '\', \'' +
			req.body.cep + '\', \'' +
			req.body.cidade + '\', \'' +
			req.body.estado + '\', 1);';
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			finalizado();
			if (erro) {
				return console.error('Erro ao inserir cliente !', erro);
			}
			res.json("Empresa cadastrada com Sucesso !");

		});
	});
});
//=============================================================
//Método para cadastrar Serviço
app.post('/cadastrarServico', function (req, res) {
	canal.connect(function (erro, conexao, finalizado) {

		if (erro) {
			return console.error('Erro ao conectar ao Banco de Dados', erro);
		}
		console.log("********************************************");
		console.log(req.body);
		console.log("********************************************");
		var sql = 'INSERT INTO TB_SERVICO(ID_SERVICO, DESCRICAO, VALOR, FG_ATIVO)'
			+ ' VALUES'
			+ '(default, \'' +
			req.body.descricao + '\', ' +
			req.body.valor + '\, 1);';
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			finalizado();
			if (erro) {
				return console.error('Erro ao cadastrar serviço !', erro);
			}
			res.json("Serviço cadastrada com Sucesso !");

		});
	});
});
//=============================================================

//Método para cadastrar Produto
app.post('/cadastrarProduto', function (req, res) {
	canal.connect(function (erro, conexao, finalizado) {

		if (erro) {
			return console.error('Erro ao conectar ao Banco de Dados', erro);
		}
		console.log("********************************************");
		console.log(req.body);
		console.log("********************************************");
		var sql = 'INSERT INTO TB_PRODUTO(ID_PRODUTO, DESCRICAO, QUANTIDADE, VALOR, FG_ATIVO)'
			+ ' VALUES'
			+ '(default, \'' +
			req.body.descricao + '\', ' +
			req.body.quantidade + '\, ' +
			req.body.valor + '\, 1);';
		console.log(sql);
		conexao.query(sql, function (erro, resultado) {
			finalizado();
			if (erro) {
				return console.error('Erro ao cadastrar serviço !', erro);
			}
			res.json("Serviço cadastrada com Sucesso !");

		});
	});
});
//=============================================================
app.listen(3000, function () {
	console.log("SERVIDOR ON");
})