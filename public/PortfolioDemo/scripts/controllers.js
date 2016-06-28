
function DialogController($scope, $mdDialog, pId, infos, updateId) {
    
    $scope.infos = infos;
    $scope.pId = pId;
    $scope.newInfo = {};
    
    infos.forEach(function (i){
        
        if(updateId == i.id)
          $scope.newInfo = { "info": i.info};
        
        
    });
    
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  
  $scope.addExisting = function (info) 
  {
      if(typeof($scope.newInfo.existing) == 'undefined')
      $scope.newInfo.existing = [];
      
          $scope.newInfo.existing.push(info);
  }
  
  
      var addNewOrExistingInfo = 1;
  
  
    $scope.addNewInfo = function (){
         addNewOrExistingInfo = 1;
    }
    
    $scope.addExistingInfo = function () {
        addNewOrExistingInfo = 2;
    }
  
  //this will be one info if new is added it will be an array if existing are to be used
  $scope.addInfo = function(info) {
      
      var retval = [];
      retval.push(info);
      retval.push(addNewOrExistingInfo);
      
    $mdDialog.hide(retval);
  };
  
   $scope.updateInfo = function(info) {
       info.id = updateId;
    $mdDialog.hide(info);
  };
  
  
}


function DlgController($scope, $mdDialog, pId, resource, type, resourceData)
{
    this.type = type;
    this.pId = pId;
    this.resource = resource;
    this.resourceData = resourceData;
    
    this.newResource = {};
    this.existingAdditions = [];
    
    var addNewOrExistingInfo = 1;
  
  
    this.addNewInfo = function (){
         addNewOrExistingInfo = 1;
    }
    
     this.addExistingInfo = function () {
        addNewOrExistingInfo = 2;
    }
    
      this.addExisting = function (info, add) 
  {
      if(add)
          this.existingAdditions.push(info);
          else
           this.existingAdditions.splice(info, 1);
  }
    
    
  this.hide = function() {
    $mdDialog.hide();
  };
 
  this.cancel = function() {
    $mdDialog.cancel();
  };
  
  this.performAddition = function (newResource, addExisting)
  {
      if(addNewOrExistingInfo == 1)
      {
          this.addNewResource(newResource);
      }
      else{
         this.addNewResource(addExisting);
      }
  }
  
  this.addNewResource = function(singleResourceData) {
      
      var retval = [];
      retval.push(singleResourceData);
      retval.push(addNewOrExistingInfo);
      $mdDialog.hide(retval);
  };
  
}