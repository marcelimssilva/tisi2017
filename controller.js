var login = angular.module('Controller', []);

login.controller('Controller', function ($scope, $http) {
    var consultaUsuario = function () {
        $http.post('http://localhost:3000/login/', $scope.login)
            .then(function (response) {
                if (response.data > 0) {
                    alert("Login feito com Sucesso!!!");
                    window.location.href = "http://127.0.0.1:8080/menu.html";       
                }
                else {
                    alert("Email ou Senha inválido, tente novamente!!!");
                }

            });
    };
    var cadastroClienteFisico = function () {
        $http.post('http://localhost:3000/cadastroClienteFisico/', $scope.cliente)
            .then(function (response) {
            });
    };

    var cadastroClienteJuridico = function () {
        $http.post('http://localhost:3000/cadastroClienteJuridico/', $scope.cliente)
            .then(function (response) {
            });
    };

    $scope.entrar = function () {
        consultaUsuario();
    };
});