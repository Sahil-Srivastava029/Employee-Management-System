let employees = JSON.parse(localStorage.getItem("employees")) || [];

const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");

const searchName = document.getElementById("searchName");
const searchDepartment = document.getElementById("searchDepartment");

const totalEmployees = document.getElementById("totalEmployees");
const totalDepartments = document.getElementById("totalDepartments");
const averageSalary = document.getElementById("averageSalary");


function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}


function updateDashboard() {

    totalEmployees.textContent = employees.length;

    let departments = [...new Set(employees.map(emp => emp.department))];

    totalDepartments.textContent = departments.length;

    if (employees.length === 0) {

        averageSalary.textContent = "₹0";
        return;

    }

    let totalSalary = employees.reduce(function(sum, emp){

        return sum + Number(emp.salary);

    },0);

    averageSalary.textContent =
        "₹" + Math.round(totalSalary / employees.length);

}


function displayEmployees(employeeArray){

    employeeTable.innerHTML = "";

    employeeArray.forEach(function(employee){

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>₹${employee.salary}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>
            </td>
        `;

        employeeTable.appendChild(row);

    });

}


employeeForm.addEventListener("submit", function(e){

    e.preventDefault();

    let employee = {

        id: Date.now(),

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value,

        position: document.getElementById("position").value,

        salary: document.getElementById("salary").value

    };

    employees.push(employee);

    saveEmployees();

    displayEmployees(employees);

    updateDashboard();

    employeeForm.reset();

});


function deleteEmployee(id){

    employees = employees.filter(function(emp){

        return emp.id !== id;

    });

    saveEmployees();

    displayEmployees(employees);

    updateDashboard();

}


searchName.addEventListener("keyup", filterEmployees);


searchDepartment.addEventListener("change", filterEmployees);


function filterEmployees(){

    let nameValue = searchName.value.toLowerCase();

    let departmentValue = searchDepartment.value;

    let filteredEmployees = employees.filter(function(emp){

        let matchName =
            emp.name.toLowerCase().includes(nameValue);

        let matchDepartment =
            departmentValue === "All" ||
            emp.department === departmentValue;

        return matchName && matchDepartment;

    });

    displayEmployees(filteredEmployees);

}


displayEmployees(employees);

updateDashboard();