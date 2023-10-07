angular.module('cadastroApp')
  .service('CadastroService', ['$http', function($http) {
    let baseUrl = 'http://localhost:8080/api/users';

    this.salvar = function(usuario) {
      return $http.post(baseUrl, usuario);
    };

    this.listar = function() {
      return $http.get(baseUrl);
    };
  }]);
