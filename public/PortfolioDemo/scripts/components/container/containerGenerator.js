angular.module("portfolioApp").directive("containerGenerator", function ($compile) {
    return {
        scope: {
           portfolioInfo: '=',
           sectionData: '='
        },
        link: function (scope, element) {
            var containerTemplate = '<div ' + scope.portfolioInfo + '-container section-data="sectionData"> </div>';
            element.append($compile(containerTemplate)(scope));
        }
    }
})