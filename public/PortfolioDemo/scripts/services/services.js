app = angular.module("portfolioApp")

function SkillsMatrixList() {
    var skills = {
        "1" : [
            { "id": 1, 
            "category": "Front End", 
            "skills": ["HTML5", "CSS3", "JavaScript"], 
             "global": true,
             "showIn": [1, 2] },
            { "id": 2, 
              "category": "Back End", 
              "skills": ["NodeJS", "ASP.NET MVC", "ExpressJS"], 
              "global": false, 
              "showIn": [2] }
        ]
    }
    
     this.getUserSkills = function (userId) {
        return skills[userId.toString()];
    }

    this.addSkillMatrix = function (userId, skillMatrix) {
        
        if(skillMatrix.id)
        {
            
        }
        
    }

    this.addUserSkillCategory = function (userId, ed) {
         
         var userEds = skills[userId.toString()];
         
        var lastId = userEds[userEds.length-1].id;
        
        ed.id = lastId + 1;

        userEds.push(ed);
    }
    
    this.addUserSkillsToCategory = function () {
        
    }

    this.deleteEducation = function (userId, id) {
        
         var userEds = education[userId.toString()];
         
         userEds.forEach(function (ed){
             if(ed.id === id)
             userEds.splice(userEds.indexOf(ed), 1)
         });
       
    }
    

}

function EducationList() {

    var education = {
        "1":  [          
            { "id": 1, "degree": "Bachelor of Science", "field": "Computer Science", "school": "Mississippi State University", "GPA": 9001, "gradMonth": "May", "gradYear": 2006, "global": true, "showIn": [1, 2] },
            { "id": 2, "degree": "Master of Amazement", "field": "Everything", "school": "Awesome University", "GPA": 42, "gradMonth": "Neverary", "gradYear": 2016, "global": false, "showIn": [2] }
      ] 
    }

    this.getUserEducation = function (userId) {
        return education[userId.toString()];
    }

    this.addEducation = function (userId, ed) {
         
         var userEds = education[userId.toString()];
         
        var lastId = userEds[userEds.length-1].id;
        
        ed.id = lastId + 1;

        userEds.push(ed);
    }

    this.deleteEducation = function (userId, id) {
        
         var userEds = education[userId.toString()];
         
         userEds.forEach(function (ed){
             if(ed.id === id)
             userEds.splice(userEds.indexOf(ed), 1)
         });
       
    }

}

function UserList() {
    var users = [{ "name": "Keni", "age": 28, "id": 1 }, { "name": "Sreenath", "age": 29, "id": 2 }]

    var currentUser = null;

    this.setCurrent = function (id) {
        users.forEach(function (user) {
            if (user.id === id) {
                currentUser = user;

            }
        })
    }

    this.getCurrentUser = function () {
        return currentUser;
    }

    this.getUsers = function () {
        return users;
    }
}

function PortfolioList() {
    var portfolios = [
        { "id": 1, "userId": 1 },
        { "id": 2, "userId": 1 },
        { "id": 3, "userId": 2 }
    ]

    this.currentPortfolio = null;

    this.setCurrent = function (i) {
        this.currentPortfolio = portfolios[i];

        if (!this.currentPortfolio.ind)
            this.currentPortfolio.ind = parseInt(i);
    }

    this.getUserPortfolios = function (userId) {

        var ps = [];

        portfolios.forEach(function (p) {
            if (p.userId === userId)
                ps.push(p);
        })

        return ps;
    }
}

function InfoList() {
    var infos = [
        { "id": 1, "userId": 1, "global": false, "showIn": [1], "info": "This is profile 1 specific Info for Keni" },
        { "id": 2, "userId": 1, "global": true, "showIn": [1, 2], "info": "This is global Info for Keni" },
        { "id": 3, "userId": 2, "global": true, "showIn": [1], "info": "This is global Info for Sreenath" },
        { "id": 4, "userId": 1, "global": false, "showIn": [2], "info": "This is profile 2 specific Info for Keni" }
    ]

    this.getUserInfos = function (userId) {

        var ui = [];

        infos.forEach(function (i) {
            if (i.userId === userId)
                ui.push(i);
        })

        return ui;
    }

    this.addInfo = function (info) {

        var lastId = infos[infos.length - 1].id;
        info.id = lastId + 1;

        infos.push(info)
    }

    this.deleteInfo = function (id) {
        infos.forEach(function (i) {
            if (i.id === id) {
                infos.splice(infos.indexOf(i), 1);
                return false;
            }

        });
    }

}


app.service("userList", UserList);
app.service("portfolioList", PortfolioList);
app.service("infoList", InfoList);
app.service("educationList", EducationList);
