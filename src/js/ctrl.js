angular.module('vavapp', [])
  .controller('vavappCtrl',function($scope) {
    $scope.processNumber = 1;
    $scope.errortext = "";
    $scope.process = [];
     $scope.title = "Round-Robin";
    $scope.showResults = false;

    $scope.addProcess = function () {

      if($scope.addNewProcess==""){
         $scope.errortext ="You must insert some value.";
        return;
      }
      if(isNaN($scope.addNewProcess)){
         $scope.errortext = "You must insert a numeric value.";
         return;
      }

      var newProcess = {id:"P"+    $scope.processNumber, num:$scope.addNewProcess};
      $scope.process.push(newProcess);
      $scope.addNewProcess = "";
      $scope.errortext = "";
      $scope.processNumber++;
  }

  $scope.removeProcess = function (x) {
        $scope.processNumber--;
       $scope.process.splice(x, 1);
       $scope.errortext = "";
   }

   $scope.fcfsAlg = function(){
     var partialturn = 0;
     $scope.totalWaitTime = 0;
     $scope.waitTime = 0;
     $scope.avgWaitTime = 0;
     $scope.turnaround = 0;
     $scope.avgTurnaroudTime = 0;
     $scope.throughput = 0;
     if($scope.process.length<1){
       $scope.errortext = "You must create a process.";
        $scope.showResults = false;
       return;
     }
     for (var i = 0; i < $scope.process.length; i++) {
         $scope.totalWaitTime += partialturn;
         $scope.turnaround += (partialturn+eval($scope.process[i].num));
         partialturn += eval($scope.process[i].num);
     }
     $scope.avgWaitTime = Math.floor($scope.totalWaitTime/$scope.process.length);
     $scope.avgTurnaroudTime = Math.floor($scope.turnaround/$scope.process.length);
     $scope.throughput = ($scope.process.length/ partialturn).toFixed(2);
     $scope.errortext = "";
     $scope.showResults = true;
   }
});


24
3
3


24+27+30

0+24

    24+3

         27+3
