angular.module('cadastroApp')
  .controller('CadastroController', ['CadastroService', '$timeout', function(CadastroService, $timeout) {
    var vm = this;
    vm.usuario = {};
    vm.usuarios = [];
    vm.usuarioPaiSelecionado = null; // Added this line to keep track of the selected parent user
    vm.errorMessage = null;
    vm.successMessage = null;

    vm.salvar = function() {
      if (vm.usuarioPaiSelecionado) {
        vm.usuario.pai = vm.usuarioPaiSelecionado.id;
      }
      CadastroService.salvar(vm.usuario).then(function(response) {
        vm.usuario = {};
        vm.usuarioPaiSelecionado = null;
        vm.listarCadastros();
        vm.successMessage = "Usuário salvo com sucesso!";
        vm.errorMessage = null;
        displayMessage();
      }, function(error) {
        vm.errorMessage = "Erro ao salvar o usuário: " + error.data.message;
        vm.successMessage = null;
        displayMessage();
      });
    };

    function displayMessage() {
      var messageElement = angular.element(document.querySelector('.floating-message'));
      console.log(document.querySelector('.floating-message'))
      messageElement.css('display', 'block');
      console.log(document.body.innerHTML)
      $timeout(function() {
        messageElement.css('display', 'none');
        vm.successMessage = null;
        vm.errorMessage = null;
      }, 3000); //Para mensagem sumir em 3 segundos
    }

    vm.listarCadastros = function() {
      CadastroService.listar().then(function(response) {
        vm.usuarios = response.data;
      }, function(error) {
        vm.errorMessage = "Erro ao listar os usuários: " + error.data.message;
      });
    };


    vm.selecionarPai = function(usuario) {
      console.log('id', usuario)
      vm.usuarioPaiSelecionado = usuario;
      vm.usuario.parentUserId = usuario.id;

    };

    // Initialize the list
    vm.listarCadastros();
  }]);
