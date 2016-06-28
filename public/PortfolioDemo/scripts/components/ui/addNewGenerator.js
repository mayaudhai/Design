angular.module("portfolioApp").directive("inputGenerator", function ($compile) {
    return {
        scope: {
          type : '=',
          newResource: '='
        },
        link: function (scope, element) {
            var containerTemplate = '<div ' + scope.type.toLowerCase() + '-inputs new-resource="newResource" > </div>';
            element.append($compile(containerTemplate)(scope));
        }
    }
})