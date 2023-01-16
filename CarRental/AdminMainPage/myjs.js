document.getElementById("nameNav").textContent = "Hi " + localStorage.getItem("userName") + " " + localStorage.getItem("userLastName");

document.getElementById("logOutNav").addEventListener("click", function () {
    window.location.assign("http://127.0.0.1:3000/MainPage/index.html");
})


document.getElementById('carsNav').addEventListener('click', function (){
     document.getElementById("newCarBtnDiv").style.display="flex";
     document.getElementById('tableDiv').style.display = "block";
    document.getElementById('updateCarDiv').style.display = "none";
    document.getElementById('rentTableDiv').style.display = "none";
    document.getElementById('updateRentDiv').style.display = "none";
    document.getElementById(`userTableDiv`).style.display="none";
    document.getElementById(`updateUserDiv`).style.display="none";
})

document.getElementById('rentsNav').addEventListener('click', function(){
    document.getElementById('updateCarDiv').style.display = "none";
    document.getElementById('tableDiv').style.display = "none";
    document.getElementById('rentTableDiv').style.display = "block";
    document.getElementById('updateRentDiv').style.display = "none";
    document.getElementById("newCarBtnDiv").style.display="none";
    document.getElementById(`userTableDiv`).style.display="none";
    document.getElementById(`updateUserDiv`).style.display="none";

})

document.getElementById('usersNav').addEventListener('click', function(){
    document.getElementById('updateCarDiv').style.display = "none";
    document.getElementById('tableDiv').style.display = "none";
    document.getElementById('rentTableDiv').style.display = "none";
    document.getElementById('updateRentDiv').style.display = "none";
    document.getElementById("newCarBtnDiv").style.display="none";
    document.getElementById(`userTableDiv`).style.display="block";
    document.getElementById(`updateUserDiv`).style.display="none";

})

document.getElementById("newCarBtn").addEventListener("click",function(){
    document.getElementById('tableDiv').style.display = "none";

    
});
//load main page
function loadMainAdminPage(){
    window.location.assign("http://127.0.0.1:3000/UserMainPage/index.html");
}


//Car table 


document.getElementById('carsNav').addEventListener('click', addToCarTable)
function addToCarTable() {
    document.getElementById('tableData').textContent = "";
    fetch(`http://localhost:8090/car`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => data.forEach(car => {

            const tableBody = document.getElementById("tableData");
            tableBody.innerHTML += ` <tr>
        <td class="carId"> ${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.name}</td>
        <td>${car.licensePlate}</td>
        <td>${car.productionDate}</td>
        <td>${car.engine}</td>
        <td>${car.classification}</td>
        <td>${car.gearBox}</td>
        <td>${car.doors}</td>
        <td>${car.seats}</td>
        <td>${car.pricePerDay}</td>
        <td> <input class="editBtn" id="listBtn" type="submit" value="Edit">  </td>
        <td> <input class="deleteBtn" id="listBtn" type="submit" value="Delete"> </td>

    </tr>`
        }))

}



//Car Table delete 
let table = document.getElementById("table");
table.addEventListener("click", onDeleteRow);
function onDeleteRow(e) {
    if (!e.target.classList.contains('deleteBtn')) {
        return;
    }
    const btn = e.target;
    let x = btn.closest('tr');
    console.log(x);
    let carId = x.children.item("carID").textContent;
    localStorage.setItem('carId', carId);

    if (confirm("Are you sure you want to delete?") == true) {
        fetch(`http://localhost:8090/car/${carId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())

        setTimeout(() => {
            addToCarTable();
        }, 100)

    }
    else {

    }
}


//Car Table edit
let updateBtn=document.createElement("input");
updateBtn.setAttribute("type","submit");
updateBtn.setAttribute("id","update");
updateBtn.setAttribute("value","Update")

table.addEventListener("click", onEditRow);
function onEditRow(e) {
    document.getElementById("carFormButton").textContent="";
    document.getElementById("carFormButton").appendChild(updateBtn);
    document.getElementById('carForm').reset();


    if (!e.target.classList.contains('editBtn')) {
        return;
    }
    const btn = e.target;
    let x = btn.closest('tr');
    console.log(x);
    let carId = x.children.item("carID").textContent;
    localStorage.setItem('carId', carId);

console.log(document.getElementById("rented").textContent);
document.getElementById("update").setAttribute("value","Update");
    fetch(`http://localhost:8090/car/${localStorage.getItem('carId')}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(car => {
            console.log(localStorage.getItem('carId'));
            document.getElementById('tableDiv').style.display = "none";
            document.getElementById('updateCarDiv').style.display = "flex";


            document.getElementById(`${car.brand}`).setAttribute('selected', `selected`);
            document.getElementById('name').setAttribute('value', `${car.name}`)
            document.getElementById('licensePlate').setAttribute('value', `${car.licensePlate}`)
            document.getElementById('productionDate').setAttribute('value', `${car.productionDate}`)
            document.getElementById('engine').setAttribute('value', `${car.engine}`)
            document.getElementById(`${car.classification}`).setAttribute('selected', `selected`);
            document.getElementById(`${car.gearBox}`).setAttribute('selected', `selected`);
            
            document.getElementById('doors').setAttribute('value', `${car.doors}`)
            document.getElementById('seats').setAttribute('value', `${car.seats}`)
            document.getElementById('pricePerDay').setAttribute('value', `${car.pricePerDay}`)
        })


}

//update Car

updateBtn.addEventListener('click', updateCarInfo);

function updateCarInfo(e) {
    e.preventDefault();

    let brand = document.getElementById('brand').value;
    let name = document.getElementById('name').value;
    let licensePlate = document.getElementById('licensePlate').value;
    let productionDate = document.getElementById('productionDate').value;
    let engine = document.getElementById('engine').value;
    let classification = document.getElementById('classification').value;
    let gearBox = document.getElementById('gearBox').value;
    let doors = document.getElementById('doors').value;
    let seats = document.getElementById('seats').value;
    let pricePerDay = document.getElementById('pricePerDay').value;
    fetch(`http://localhost:8090/car/${localStorage.getItem('carId')}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ id: localStorage.getItem('carId'), brand: brand, name: name, licensePlate: licensePlate, productionDate: productionDate, engine: engine, classification: classification, gearBox: gearBox, doors: doors, seats: seats, pricePerDay: pricePerDay })
    })
        .then(res => {
            if (res.status == 200) {
                console.log("car updated ")


                document.getElementById("carsNav").click();
                


            }

            else {
                //mesk i pagrindini
            }
        })


}

//rent table 
document.getElementById('rentsNav').addEventListener('click', addToRentTable)
function addToRentTable() {
    document.getElementById('rentTableData').textContent = "";
    console.log('???');
    
    


    fetch(`http://localhost:8090/rent`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => data.forEach(rent => {
            const tableBody = document.getElementById("rentTableData");
            tableBody.innerHTML += ` <tr>
        <td class="rentId"> ${rent.id}</td>
        <td>${rent.startDate}</td>
        <td>${rent.endDate}</td>
        <td>${rent.totalPrice}</td>
        <td>${rent.totalPriceWithDiscount}</td>
        <td>${rent.discount}</td>
        <td>${rent.userId}</td>
        <td>${rent.carId}</td>
        
        <td> <input class="editBtn" id="listBtn" type="submit" value="Edit">  </td>
        <td> <input class="deleteBtn" id="listBtn" type="submit" value="Delete"> </td>

    </tr>`
        }))

}

//rent table delete button

let rentTable = document.getElementById("rentTable");
rentTable.addEventListener("click", onRentDeleteRow);
function onRentDeleteRow(e) {
    if (!e.target.classList.contains('deleteBtn')) {
        return;
    }
    const btn = e.target;
    let x = btn.closest('tr');
    console.log(x);
    let rentId = x.children.item("rentId").textContent;
    localStorage.setItem('rentId', rentId);

    if (confirm("Are you sure you want to delete?") == true) {
        fetch(`http://localhost:8090/rent/${rentId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())

        setTimeout(() => {
            addToRentTable();
        }, 100)

    }
    else {

    }
}

// rent Table edit

rentTable.addEventListener("click", onRentEditRow);
function onRentEditRow(e) {
    document.getElementById('rentForm').reset();


    if (!e.target.classList.contains('editBtn')) {
        return;
    }
    const btn = e.target;
    let x = btn.closest('tr');
    console.log(x);
    let rentId = x.children.item("rentId").textContent;
    localStorage.setItem('rentId', rentId);


    fetch(`http://localhost:8090/rent/${localStorage.getItem('rentId')}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(rent => {
            document.getElementById('rentTableDiv').style.display = "none";
            document.getElementById('updateRentDiv').style.display = "flex";


            document.getElementById('startDate').setAttribute('value', `${rent.startDate}`);
            document.getElementById('endDate').setAttribute('value', `${rent.endDate}`);
            document.getElementById('totalPrice').setAttribute('value', `${rent.totalPrice}`);
            document.getElementById('discount').setAttribute('value', `${rent.discount}`);
        })


}

document.getElementById('rentUpdate').addEventListener('click', updateRentInfo);

function updateRentInfo(e) {
    e.preventDefault();
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let totalPrice = document.getElementById('totalPrice').value;
    let discount = document.getElementById('discount').value;

    fetch(`http://localhost:8090/rent/${localStorage.getItem('rentId')}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json-patch+json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify([{ op: "replace", path: "/totalPrice", value: totalPrice },
        { op: "replace", path: "/startDate", value: startDate },
        { op: "replace", path: "/endDate", value: endDate },
        { op: "replace", path: "/discount", value: discount }
        ])
    })
        .then(res => {
            if (res.status == 200) {
                console.log("rent updated ")


                
                document.getElementById("rentsNav").click();

            }

            else {
                //mesk i pagrindini
            }
        })


}

//new car form
let createCarBtn=document.createElement("input");
createCarBtn.setAttribute("type","submit");
createCarBtn.setAttribute("id","update");
createCarBtn.setAttribute("value","Create a new car")

document.getElementById("newCarBtn").addEventListener("click",createNewCar);
function createNewCar(){
    document.getElementById("carFormButton").textContent="";
    document.getElementById("carFormButton").appendChild(createCarBtn);
    document.getElementById('carForm').reset();

    document.getElementById('updateCarDiv').style.display = "flex";
    document.getElementById("update").setAttribute("value","Create a new car");
}

//create a new car

createCarBtn.addEventListener("click",createANewCar);

function createANewCar(e){
    e.preventDefault();
    let brand = document.getElementById('brand').value;
    let name = document.getElementById('name').value;
    let licensePlate = document.getElementById('licensePlate').value;
    let productionDate = document.getElementById('productionDate').value;
    let engine = document.getElementById('engine').value;
    let classification = document.getElementById('classification').value;
    let gearBox = document.getElementById('gearBox').value;
    let doors = document.getElementById('doors').value;
    let seats = document.getElementById('seats').value;
    let pricePerDay = document.getElementById('pricePerDay').value;
    fetch(`http://localhost:8090/car`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({brand: brand, name: name, licensePlate: licensePlate, productionDate: productionDate, engine: engine, classification: classification, gearBox: gearBox, doors: doors, seats: seats, pricePerDay: pricePerDay })
    })
        .then(res => {
            if (res.status == 200) {
                console.log("car  created ")


               document.getElementById("carsNav").click();
                


            }

            else {
                //mesk i pagrindini
            }
        })

}

//user table

document.getElementById('usersNav').addEventListener('click', addToUsersTable)
function addToUsersTable() {
    document.getElementById('userTableData').textContent = "";

    fetch(`http://localhost:8090/user`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => data.forEach(user => {
            const tableBody = document.getElementById("userTableData");
            tableBody.innerHTML += ` <tr>
        <td class="userId"> ${user.id}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.dateOfBirth}</td>
        <td>${user.address}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.driverLicenseNumber}</td>
        
        <td> <input class="editBtn" id="listBtn" type="submit" value="Edit">  </td>
        <td> <input class="deleteBtn" id="listBtn" type="submit" value="Delete"> </td>

    </tr>`
        }))

}

//user table delete btn 

let userTable = document.getElementById("userTable");
userTable.addEventListener("click", onUserDeleteRow);
function onUserDeleteRow(e) {
    if (!e.target.classList.contains('deleteBtn')) {
        return;
    }
    const btn = e.target;
    let x = btn.closest('tr');
    console.log(x);
    let userId = x.children.item("userId").textContent;
    console.log(userId);

    if (confirm("Are you sure you want to delete?") == true) {
        fetch(`http://localhost:8090/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())

        setTimeout(() => {
            addToUsersTable();
        }, 100)

    }
    else {

    }
}

//user table edit btn

userTable.addEventListener("click", onUserEditRow);
function onUserEditRow(e) {
    document.getElementById('userForm').reset();
console.log('clicked');

    if (!e.target.classList.contains('editBtn')) {
        return;
    }
    const btn = e.target;
    let x = btn.closest('tr');
    console.log(x);
    let userId = x.children.item("userId").textContent;

    document.getElementById("updateUserDiv").style.display="flex";
    


    fetch(`http://localhost:8090/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(user => {
            
            document.getElementById(`userTableDiv`).style.display="none";

            document.getElementById('userName').setAttribute('value', `${user.name}`);
            document.getElementById('lastName').setAttribute('value', `${user.lastName}`);
            document.getElementById('email').setAttribute('value', `${user.email}`);
            document.getElementById('dateOfBirth').setAttribute('value', `${user.dateOfBirth}`);
            document.getElementById('address').setAttribute('value', `${user.address}`);
            document.getElementById('phoneNumber').setAttribute('value', `${user.phoneNumber}`);
            document.getElementById('driverLicense').setAttribute('value', `${user.driverLicenseNumber}`);
            document.getElementById('userId').textContent=user.id;
            console.log(user.id);
        })


}

//update user 

document.getElementById("userUpdate").addEventListener('click', updateUserInfo);

function updateUserInfo(e) {
    e.preventDefault();
    
    
    let name = document.getElementById('userName').value;

    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let dateOfBirth = document.getElementById('dateOfBirth').value;
    let address = document.getElementById('address').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let driverLicenseNumber = document.getElementById('driverLicense').value;
    let userId = document.getElementById('userId').textContent;
    console.log(userId);
    fetch(`http://localhost:8090/user/${userId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ id: userId, name: name, lastName: lastName, email: email,
            dateOfBirth: dateOfBirth, address: address, phoneNumber: phoneNumber, driverLicenseNumber: driverLicenseNumber})
    })
        .then(res => {
            if (res.status == 200) {
                console.log("user updated ")


                document.getElementById("usersNav").click();
                


            }

            else {
                //mesk i pagrindini
            }
        })


}

















