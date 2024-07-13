/** @format */

// Your code here
const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployeeRecords = (employeeData) => {
  return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = (employee, dateTime) => {
  let [date, hour] = dateTime.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10)
  });
  return employee;
};

const createTimeOutEvent = (employee, dateTime) => {
  let [date, hour] = dateTime.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10)
  });
  return employee;
};

const hoursWorkedOnDate = (employee, date) => {
  let timeIn = employee.timeInEvents.find(event => event.date === date);
  let timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = (employee, date) => {
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
};

const allWagesFor = (employee) => {
  let dates = employee.timeInEvents.map(event => event.date);
  return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
};

const calculatePayroll = (employees) => {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
};

