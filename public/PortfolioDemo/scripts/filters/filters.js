var app = angular.module("portfolioApp")

app.filter("showInfos", function () {
    
    return function (infos, pId) {
        var  retval = [];
        
        infos.forEach( function (info) {
            
            if(info.global || (info.showIn && info.showIn.indexOf(pId) > -1))
            retval.push(info);
           
        })

        return retval;
    }
})


app.filter("notShown", function () {
    
    return function (infos, pId) {
        var  retval = [];
        
        infos.forEach( function (info) {
            
            if(!info.global && (info.showIn && info.showIn.indexOf(pId) == -1))
            retval.push(info);
           
        })

        return retval;
    }
})
