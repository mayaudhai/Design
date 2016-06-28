angular.module("portfolioApp").directive("aboutContainer", function () {
    return {
        templateUrl: "templates/portfolioComponents/aboutContainer.tmpl.html",
        controllerAs: "ac",
        controller: function ($scope, $route, portfolioList, $mdDialog) {
            this.type = "About Me"
            this.portfolioId = parseInt($route.current.params.portfolioId);
        }
    }
})