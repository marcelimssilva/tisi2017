var controller = angular.module('Controller', ['ngCookies']);
controller.controller('Controller', function ($scope, $http, $cookies) {
    var consultaUsuario = function () {
        $http.post('http://localhost:3000/logar/', $scope.login)
            .then(function (response) {
                if (response.data > 0) {
                    alert("Login feito com Sucesso!!!");
                    $cookies.put('email1', $scope.login.email, {'domain': 'localhost'}); 
                    window.location.href = "http://localhost:3000/menu";
                }
                else {
                    alert("Email ou Senha inválido, tente novamente!!!");
                }

            });
    };

    var cadastarClienteFisica = function () {
        $http.post('http://localhost:3000/cadastroClienteFisico/', $scope.cliente)
            .then(function (response) {
                alert("Cliente inserido com sucesso!!!");
            });
    };

    var cadastarClienteJuridica = function () {
        $http.post('http://localhost:3000/cadastroClienteJuridico/', $scope.clienteJ)
            .then(function (response) {
                alert("Cliente inserido com sucesso!!!");
            });
    };

    var cadastarEmpresa = function () {
        $http.post('http://localhost:3000/cadastroEmpresa/', $scope.empresa)
            .then(function (response) {
                alert("Cadastro realizado com Sucesso !!!");
            });
    };

    var cadastarServico = function () {
        $http.post('http://localhost:3000/cadastrarServico/', $scope.servico)
            .then(function (response) {
                alert("Cadastro realizado com Sucesso !!!");
            });
    };

    var cadastrarProduto = function () {
        $http.post('http://localhost:3000/cadastrarProduto/', $scope.produto)
            .then(function (response) {
                alert("Cadastro realizado com Sucesso !!!");
            });
    };

    $scope.entrar = function () {
        consultaUsuario();
    };

    $scope.insereCliFisico = function () {
        cadastarClienteFisica();
    };

    $scope.insereCliJuridico = function () {
        cadastarClienteJuridica();
    };

    $scope.insereEmpresa = function () {
        cadastarEmpresa();
    };

    $scope.cadastroServico = function () {
        cadastarServico();
    };

    $scope.cadastroProduto = function(){
        cadastrarProduto();
    };

    $scope.receber = function () {
		if (angular.isDefined($cookies.get('email1'))){
			console.log('Bem vindo: ' + $cookies.get('email1'));
			$scope.usuario = $cookies.get('email1');
		}
	};
	
	$scope.logout = function () {
		$cookies.remove('email1')
		window.location.href = '/logout';
    };

});




