angular.module("portfolioApp").directive("infoContainer", function () {
    return {
        bindToController: {
          sectionData : '='  
        },
        templateUrl: "templates/infoContainerTemplate.html",
        controllerAs: "ic",
        controller: function ($scope, $route, portfolioList, $mdDialog) {
            this.type = "Info"
            this.infos = this.sectionData;
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
                    controller: DialogController,
                    templateUrl: 'templates/addDialog.tmpl.html',
                    locals: { "pId": this.portfolioId, "infos": this.infos, "updateId": null },
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (retval) {
                        var info = retval[0];
                        if (retval[1] === 1) {
                            info.userId = parseInt($route.current.params.userId);
                            info.showIn = [];
                            //had to be done this way due to the scope of the promise.
              
                            if (info.global) {
                                $scope.ic.setGlobally(info);
                            }
                            else {
                                info.showIn.push($scope.ic.portfolioId)
                            }
                            addNewInfo(info);
                        }
                        else {
                            addExistingInfo(info);
                        }


                    });
            }

            this.showUpdateDialog = function (ev, id) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/updateDialog.tmpl.html',
                    locals: { "pId": this.portfolioId, "infos": this.infos, "updateId": id },
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (info) {
                        $scope.ic.infos.forEach(function (i) {

                            if (info.id == i.id) {
                                i.info = info.info;
                                return false;
                            }

                        })
                    });
            }

            function addNewInfo(newInfo) {
                if (newInfo.existing || newInfo.existing == null)
                    delete newInfo.existing;

                infoList.addInfo(newInfo);
                $scope.ic.infos.push(newInfo);
            }
            function addExistingInfo(newInfo) {
                newInfo.existing.forEach(function (info) {
                    info.showIn.push($scope.ic.portfolioId);
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
                    infoList.deleteInfo(infoId);

                    $scope.ic.infos.forEach(function (i) {
                        if (i.id === infoId) {
                            $scope.ic.infos.splice($scope.ic.infos.indexOf(i), 1);
                            return false;
                        }

                    });
                });


            }



        }
    }
})