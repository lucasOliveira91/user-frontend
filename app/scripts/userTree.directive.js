angular.module('cadastroApp').directive('userTree', function() {
  return {
    restrict: 'E',
    scope: {
      users: '=',
      selectUser: '&'
    },
    template: `
      <ul>
        <li ng-repeat="user in users">
          <div class="user-row">
            <span class="clickable-username" ng-click="selectUser({user: user})">
              {{ user.username }}
            </span>
            <span class="strength-details">
              <span class="strength-indicator" ng-class="getStrengthClass(user.passStrength)">
                {{ user.passStrength }}% <span class="strength-label">{{ getStrengthLabel(user.passStrength) }}</span>
              </span>
            </span>
          </div>
          <user-tree ng-if="user.children && user.children.length" users="user.children" select-user="selectUser({user: user})"></user-tree>
        </li>
      </ul>
`,
    link: function(scope) {
      scope.getStrengthClass = function(strength) {
        if (strength <= 40) return 'ruim';
        if (strength <= 59) return 'mediana';
        return 'forte';
      };

      scope.getStrengthLabel = function(strength) {
        if (strength <= 40) return 'Ruim';
        if (strength <= 59) return 'Mediana';
        return 'Forte';
      };
    }
  };
});
