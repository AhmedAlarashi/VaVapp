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

   $scope.roundRobin = function (){

     if($scope.process.length==0){
       $scope.errortext = "You must create process.";
       return;
     }

    var execution_time = 0;
    var context_switches = 0;
    $scope.errortext = "";

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');
    var options = {
      height:400,
      gantt: {
        trackHeight: 30
      }
    };


    var processes = $scope.process;
    var prevProcess = null;
    var i=0;
    while(i<processes.length){
      if (processes[i].num<=$scope.quantum){
        execution_time+=processes[i].num;
        data.addRows([[processes[i].id, processes[i].id, processes[i].id, null, null,eval(processes[i].num)*100, 100, prevProcess]]);
      }
      else{
        context_switches++;
        execution_time+= ($scope.quantum+$scope.contextSwitch);
          data.addRows([[processes[i].id, processes[i].id, processes[i].id, null, null, $scope.quantum*100, 100, prevProcess]]);
          processes.push[{id:processes[i].id, num:(eval(processes[i].num)-$scope.quantum)}];
      }
      prevProcess=processes[i].id;
      i++;
      }
      var chart = new google.visualization.Gantt(document.getElementById('chart_div'));
      chart.draw(data, options);

     }



   $scope.fcfsAlg = function(){
     var partialturn = 0;
     var processes = $scope.process;
     
     var prevProcess = null;

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

     var data = new google.visualization.DataTable();
     data.addColumn('string', 'Task ID');
     data.addColumn('string', 'Task Name');
     data.addColumn('string', 'Resource');
     data.addColumn('date', 'Start Date');
     data.addColumn('date', 'End Date');
     data.addColumn('number', 'Duration');
     data.addColumn('number', 'Percent Complete');
     data.addColumn('string', 'Dependencies');
     var options = {
       height:400,
       gantt: {
         trackHeight: 30
       }
     };

     for (var i = 0; i < $scope.process.length; i++) {
         $scope.totalWaitTime += partialturn;
         $scope.turnaround += (partialturn+eval($scope.process[i].num));
         data.addRows([[processes[i].id, processes[i].id, processes[i].id, null, null,eval(processes[i].num)*100, 100, prevProcess]]);
         partialturn += eval($scope.process[i].num);
         prevProcess=processes[i].id;
     }
     $scope.avgWaitTime = Math.floor($scope.totalWaitTime/$scope.process.length);
     $scope.avgTurnaroudTime = Math.floor($scope.turnaround/$scope.process.length);
     $scope.throughput = ($scope.process.length/ partialturn).toFixed(2);
     $scope.errortext = "";
     var chart = new google.visualization.Gantt(document.getElementById('chart_div'));
     chart.draw(data, options);
     $scope.showResults = true;
   }
});

google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {


}
