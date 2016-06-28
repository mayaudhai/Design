angular.module("portfolioApp").directive("educationContainer", function () {
    return {
        bindToController: {
          sectionData : '='  
        },
        templateUrl: "templates/portfolioComponents/educationContainer.tmpl.html",
        controllerAs: "ec",
        controller: function ($scope, $route, portfolioList, $mdDialog, skillMatrixList) {
            this.type = "Education"
            this.infos = educationList.getUserEducation($route.current.params.userId)
            this.portfolioId = parseInt($route.current.params.portfolioId);

            this.setGlobally = function (info) {

                if (info.global) {
                    info.showIn = [];

                    portfolioList.getUserPortfolios(parseInt($route.current.params.userId)).forEach(function (p) {
                        info.showIn.push(p.id);
                    })
                }
            }

            this.showAddDialog = function (ev) {
                $mdDialog.show({
                    controllerAs: "dlg",
                    controller: DlgController,
                    templateUrl: 'templates/addDialog.tmpl.html',
                    locals: { "pId": this.portfolioId, "resourceData": this.infos, "resource": null, "type":this.type  },
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (retval) {
                        var ed = retval[0];
                        if (retval[1] === 1) {
                            ed.showIn = [];
                            //had to be done this way due to this pointing to the object of the promise
                            //not the actual controller
              
                            if (ed.global) {
                                $scope.ec.setGlobally(ed);
                            }
                            else {
                                ed.showIn.push($scope.ec.portfolioId)
                            }
                            addNewInfo(ed);
                        }
                        else {
                            addExistingInfo(ed);
                        }


                    });
            }

            this.showUpdateDialog = function (ev, resource) {
                $mdDialog.show({
                    controllerAs: "dlg",
                    controller: DlgController,
                    templateUrl: 'templates/updateDialog.tmpl.html',
                    locals: { "pId": this.portfolioId,"resourceData": this.infos, "resource": resource,"type" : this.type},
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (info) {
                               //SUCCESS
                    });
            }

            function addNewInfo(newInfo) {
                if (newInfo.existing || newInfo.existing == null)
                    delete newInfo.existing;

                educationList.addEducation($route.current.params.userId, newInfo);
                 //due to the datastructure this line of code is not needed
                //$scope.ec.infos.push(newInfo);
            }
            function addExistingInfo(newInfo) {
                newInfo.forEach(function (info) {
                    info.showIn.push($scope.ec.portfolioId);
                })
            }

            this.removeInfo = function (ev, pId, infoId) {

                this.infos.forEach(function (i) {
                    if (i.id === infoId) {
                        if (i.global) {

                            var confirm = $mdDialog.confirm()
                                .title('Removal Warning')
                                .textContent('Removing an info from a portfolio when marked as global automatically sets it to not global. Are you sure?')
                                .ariaLabel('Global Warning')
                                .targetEvent(ev)
                                .ok('Yes, remove from global.')
                                .cancel('No, keep as global.');

                            $mdDialog.show(confirm).then(function () {
                                i.global = false;

                                if (!i.showIn) {
                                    i.showIn = [];
                                }
                                else {
                                    if (i.showIn.indexOf(pId) > -1)
                                        i.showIn.splice(i.showIn.indexOf(pId), 1)
                                }
                            });

                        }
                        else {
                            if (!i.showIn) {
                                i.showIn = [];
                            }
                            else {
                                if (i.showIn.indexOf(pId) > -1)
                                    i.showIn.splice(i.showIn.indexOf(pId), 1)
                            }

                        }


                        return false;
                    }

                });

            }

            this.deleteInfo = function (ev, infoId) {

                var confirm = $mdDialog.confirm()
                    .title('Delete Warning')
                    .textContent('This will permanantly delete this info. Are you Sure?')
                    .ariaLabel('Delete Warning')
                    .targetEvent(ev)
                    .ok('Yes, fully delete from system..')
                    .cancel("Cancel");

                $mdDialog.show(confirm).then(function () {
                    educationList.deleteEducation($route.current.params.userId, infoId);
                });


            }



        }
    }
})