var processes = [3, 2, 1, 4, 2, 8];

//Round-Robin.
var quantum = 4;
var num_processes = processes.length;
var execution_time = 0;
var avg_turnaround = 0;
var context_switches = 0;
var context_switch = 2;
var i = 0;

while (i < processes.length) {
    if (processes[i] <= quantum) {
        console.log("Process executed");
        execution_time += processes[i];
        console.log("Execution time = " + execution_time);
    } else {
        console.log("process interrupted");
        var remain_time = processes[i] - quantum
        context_switches += 1
        console.log("time process executed: " + quantum);
        execution_time += quantum;
        execution_time += context_switch;
        console.log("execution time " + String(execution_time));
        processes.push(remain_time);
    }
    console.log(processes);
    console.log(execution_time);
    i++;
}

console.log(execution_time);
console.log(num_processes);
avg_turnaround = (execution_time) / (num_processes);

console.log("Round-Robin average turnaround = " + avg_turnaround);
console.log();
