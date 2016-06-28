var app = angular.module("portfolioApp", ["ngMaterial", "ngRoute", "ngAnimate"])

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);

    $routeProvider.when("/user/:userId", {
        templateUrl: "templates/portfolioList.html",
        controller: "portfolioListCtrl as plc",
        resolve : { "currentUser": function (userList) {
              return userList.getCurrentUser();
          }
        }
    });


     $routeProvider.when("/user/:userId/portfolio/:portfolioId", {
        templateUrl: "templates/portfolio.html",
        controller: "pCtrl as pc"
    });
    

    $routeProvider.otherwise({
        templateUrl: "templates/users.html"
    }); 

}]);

app.controller("pCtrl", function ($route, infoList, educationList) {
    
    this.containers = [];
    
    this.containers.push({
        containerType: "about"
    })
    
    this.containers.push({
        containerType: "info",
        data: infoList.getUserInfos(parseInt($route.current.params.userId))
    })
   
            this.containers.push({
        containerType: "skillMatrix"
    })
            this.containers.push({
        containerType: "equivalency"
    })
    
        this.containers.push({
        containerType: "education",
        data: educationList.getUserEducation($route.current.params.userId)
    })

        this.containers.push({
        containerType: "einternWork"
    })
    
            this.containers.push({
        containerType: "work"
    })
    
})


app.controller("mainCtrl", function (userList) {
    
   this.users = userList.getUsers();
   this.setUser = function (id) {
       userList.setCurrent(id);
   }
})

app.controller("portfolioListCtrl", function ($route, portfolioList, currentUser) {
    
    this.cu = currentUser;
   this.portfolios = portfolioList.getUserPortfolios(currentUser.id);

})
