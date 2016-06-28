var app = angular.module("taskApp", ["ngRoute", "ngAnimate", "ngMaterial"])
var mov = false;

var current;

function TaskList(tks) {
    var tasks = tks
   
    this.currentTask = null;

    this.next = function () {
        if ( this.currentTask.ind + 1 < tasks.length) {
            return true;
        }
        else {
            return false;
        }
    }

    this.prev = function () {
        if (this.currentTask.ind - 1 > - 1) {
            return true;
        }
        else {
            return false;
        }
    }

    this.setCurrent = function (i) {
        this.currentTask = tasks[i];
        
        if(!this.currentTask.ind)
        this.currentTask.ind = parseInt(i);
    }

    this.getTasks = function () {
        return tasks;
    }
}


app.provider('taskList', function () {

    var tasks = [{ "location": "tasks/videoTask.html", "done": false, "name": "Video Task", "desc": "Learn more about material design with a short video that explains it from the creators!" },
        { "location": "tasks/quizTask.html", "done": false, "name": "Quiz Task", "desc": "Take a brief quiz to reinforce what you know about material design.", "img": "http://vignette4.wikia.nocookie.net/community-sitcom/images/a/af/Question_mark.png/revision/latest?cb=20120714155934", "alt": "Quiz" },
        { "location": "tasks/createArtifact.html", "done": false, "name": "Artifact Task", "desc": "For this task you will research information about data flow diagrams.  You will also generate a diagram for practice.", "img": "http://www.smartdraw.com/data-flow-diagram/img/data-flow-diagram.jpg", "alt": "Data Flow Diagram" }, { "location": "tasks/makeProjectDesc.html", "done": false, "name": "SRS Task", "desc": "Use this task in order to create the project description of the SRS document", "img": "http://www.smartdraw.com/data-flow-diagram/img/data-flow-diagram.jpg", "alt": "Data Flow Diagram" }
    ];

    var v = new TaskList(tasks);

    this.findTaskLocation = function findTaskLocation(rp) {
        v.setCurrent(rp.id);
        return tasks[rp.id].location;
    }

    this.$get = function () {
        return v;
    }
});

app.config(["$routeProvider", "$locationProvider", "taskListProvider", function ($routeProvider, $locationProvider, taskListProvider) {
    $locationProvider.html5Mode(false);

    $routeProvider.when("/task/:id", {
        templateUrl: taskListProvider.findTaskLocation,
        controller: "taskCtrl"
    });
    $routeProvider.otherwise({
        templateUrl: "templates/overview.html"
    });

}]);




app.controller("defaultCtrl", ["$scope", "$mdSidenav", "$location", "taskList", function ($scope, $mdSidenav, $location, taskList) {
    var vm = this;
    var tasks = taskList.getTasks();
    vm.tasks = taskList.getTasks();

    $scope.taskComplete = function () {
        if (taskList.currentTask)
            return taskList.currentTask.name + " " + (taskList.currentTask.done ? "Completed" : "")
    }

    $scope.checkTask = function () {
        if (taskList.currentTask.ind)
            return true;
        else
            return false;
    }

    $scope.getValue = function () {
        var complete = 0;
        angular.forEach(tasks, function (task) {
            if (task.done)
                complete++;
        })
        return { "percent": (complete / tasks.length) * 100, "complete": complete };
    }

    $scope.switchTask = function (ind, $event) {
        if (ind >= 0) {
            $location.path("/task/" + ind);
            taskList.currentTask = tasks[ind];
            taskList.currentTask.ind = parseInt(ind);
            taskList.currentTask.selected = true;
        }
        else {
            $location.path("/overview");
            taskList.currentTask = null;
        }
    }


    $scope.UP = function (click) {
        $scope.progress = $scope.getValue();
        if (click) {
            if (taskList.currentTask.ind + 1 < tasks.length)
                $scope.switchTask(taskList.currentTask.ind + 1);
            else
                $scope.switchTask(-1);
        }
    }

    $scope.UP();

    $scope.printProgress = function () {
        if ($scope.progress.complete != tasks.length)
            return $scope.progress.complete + " of " + tasks.length + " tasks completed"
        else
            return "CONGRATULATIONS! You've completed this eInternship!"
    }

    $scope.highlight = function (task) {
        if (task.done)
            return 'success'
        else
            return 'md-accent'
    }

    $scope.complete = function (task) {
        if (task.done)
            return 'done';
    }

    vm.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
}])

app.controller("taskCtrl", ["$scope", "$mdDialog", "$mdMedia", "taskList", function ($scope, $mdDialog, $mdMedia, taskList) {

//boolean for showing whether or not it's done
    $scope.finished = taskList.currentTask.done;
    $scope.done = function () {
        if (taskList.currentTask)
            return taskList.currentTask.done === true ? "fail" : "success";
    }

    $scope.prevExists = function () {
        return taskList.currentTask && taskList.prev()
    }

    $scope.nextExists = function () {

        return taskList.currentTask && taskList.next()

    }


    $scope.previous = function () {

        $scope.switchTask(taskList.currentTask.ind - 1);
    }
    $scope.overview = function () {

        $scope.switchTask(-1);
    }
    $scope.next = function () {

        $scope.switchTask(taskList.currentTask.ind + 1);
    }



    $scope.updateProgress = function () {
        taskList.currentTask.done = !taskList.currentTask.done;
        $scope.complete = taskList.currentTask.done ? "Undo Complete" : "Complete Task";
        if (taskList.currentTask.done)
            $scope.UP(true);
    }

    $scope.documents = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title('Reference Documents')
                .textContent('The reference documents should download soon.')
                .ariaLabel('Ref Doc Alert')
                .ok('Got it!')
                .targetEvent(ev)
            );
    };

    $scope.desc = function (task) {
        if (task.pDesc != "" && task.pDesc != null)
            return "done md-accent"
        else
            return "md-accent";
    }

    $scope.docDone = function () {
        if (taskList.currentTask && taskList.currentTask.done)
            return "docDone"
    }

    $scope.notes = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen
        })

    };

    $scope.vidRef = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/dialog.tmpl2.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen
        })

    };

}]);

app.directive("docFill", function () {
    return {
        templateUrl: "components/docFill.html",
        link: function (scope, element, attrs) {
            $("#tabs").tabs({ disabled: [0, 2, 3, 4, 5, 6, 7], active: 1 }).addClass("ui-tabs-vertical ui-helper-clearfix");
            $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
        }
    }
})

app.directive("taskNav", function () {
    return {
        templateUrl: "templates/taskNav.tmpl.html"
    }
})

app.directive("taskVid", function ($http) {
    var xhr = $http;
    var cCue;
    var cues = [];
    return {
        templateUrl: "components/videoComponent.html",
        link: function (scope, element, attrs) {
            var v = document.querySelector("video");
            $("#play").click(function () {

                $(".backdrop").fadeOut();
                v.controls = true;
                v.play();

            });

            v.addEventListener("pause", function () {
                $(".backdrop").fadeIn();
            });

            xhr.get("resources/testTitles.vtt").then(function (data) {
                var vtt = data.data,
                    parser = new WebVTT.Parser(window, WebVTT.StringDecoder())
                parser.oncue = function (cue) {
                    cues.push(cue);
                    var s = $("<span/>")
                    s[0].cue = cue;
                    s.html(cue.text + '<br/> <br/>').appendTo("#transcript").attr("time", cue.startTime).addClass("transcript")
                        .click(function (e) {
                            e.preventDefault();
                            var v = document.querySelector("video");
                            mov = true;
                            v.currentTime = parseFloat(this.cue.startTime);
                            $(".backdrop").not(":hidden").fadeOut();
                            v.controls = true;
                            v.play();
                            mov = false;
                        });

                };
                parser.parse(vtt);
                parser.flush();

                cCue = $(".transcript").first().addClass("highlight");


                v.addEventListener("timeupdate", function (e) {
                    if (!mov) {
                        var spans = $(".transcript");

                        $.each(spans, function (ind, span) {
                            if (cCue[0] != span) {
                                if (v.currentTime >= span.cue.startTime && v.currentTime <= span.cue.endTime) {
                                    cCue.removeClass("highlight");
                                    cCue = $(span);
                                    cCue.addClass("highlight");

                                    var half = cCue.parent().height() / 2
                                    var top = cCue.position().top;
                                    if (top > half) {
                                        var scroll = cCue.position().top - half;
                                        cCue.parent().animate({
                                            scrollTop: cCue.parent().scrollTop() + scroll + (cCue.height() / 4)
                                        }, 200);
                                    }

                                }

                            }
                        })
                    }
                    else {

                    }

                });
            });
        }
    }
});
    
//for getting cues from tracks themselves
// var videoElement = document.querySelector("video");
// var textTracks = videoElement.textTracks; // one for each track element
// var textTrack = textTracks[0]; // corresponds to the first track element
// var cues = textTrack.cues;
// console.log(cues[0].text);


function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}