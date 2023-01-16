document.getElementById("nameNav").textContent = "Hi " + localStorage.getItem("userName") + " " + localStorage.getItem("userLastName");

document.getElementById("logOutNav").addEventListener("click", function () {
    window.location.assign("http://127.0.0.1:3000/MainPage/index.html");
})

document.getElementById("admin").addEventListener("click", function () {
    window.location.assign("http://127.0.0.1:3000/AdminMainPage/index.html");
})

document.getElementById("aboutUs").addEventListener("click", function () {
    document.getElementById("aboutUsDiv").style.display = "block";
    document.getElementById("mainPageDiv").style.display = "none";
    document.getElementById("contactUsDiv").style.display = "none";
    document.getElementById("allCarsCards").style.display = "none";
    document.getElementById("mainRentACarDiv").style.display = "none";
    document.getElementById("mainReservationsDiv").style.display = "none";

})

document.getElementById("reservations").addEventListener("click", function () {
    document.getElementById("mainReservationsDiv").style.display = "flex";
    document.getElementById("aboutUsDiv").style.display = "none";
    document.getElementById("mainPageDiv").style.display = "none";
    document.getElementById("contactUsDiv").style.display = "none";
    document.getElementById("allCarsCards").style.display = "none";
    document.getElementById("mainRentACarDiv").style.display = "none";
})

document.getElementById("contactUs").addEventListener("click", function () {
    document.getElementById("contactUsDiv").style.display = "block";
    document.getElementById("aboutUsDiv").style.display = "none";
    document.getElementById("mainPageDiv").style.display = "none";
    document.getElementById("allCarsCards").style.display = "none";
    document.getElementById("mainRentACarDiv").style.display = "none";
    document.getElementById("mainReservationsDiv").style.display = "none";
})

let discountCodes = ["10discount", "15discount", "20discount"];
//load main page
function loadMainPage() {
    window.location.assign("http://127.0.0.1:3000/UserMainPage/index.html");
}

// creating pick and return card 
var form = document.createElement("form");

var bigD = document.createElement("div");
bigD.setAttribute("id", "selectDateCard");

var title = document.createElement("div");
title.setAttribute("id", "rentCardTitle")
title.textContent = "Pick up & return"

var rentDetailsDiv1 = document.createElement("div");
var rentDetailsDiv2 = document.createElement("div");
var rentDetailsDiv3 = document.createElement("div");
rentDetailsDiv1.setAttribute("id", "rentDetails");
rentDetailsDiv2.setAttribute("id", "rentDetails");
rentDetailsDiv3.setAttribute("id", "rentDetails");

var rentCardInputs = document.createElement("div");
rentCardInputs.setAttribute("id", "rentCardInputs");

var pickUp = document.createElement("div");
pickUp.textContent = "Pick up date";

var startDateInput = document.createElement("input");
startDateInput.setAttribute("type", "date");
startDateInput.setAttribute("id", "startDate");
let minDate= new Date();
let ye=new Intl.DateTimeFormat('en',{year:'numeric'}).format(minDate);
let mo=new Intl.DateTimeFormat('en',{month:'2-digit'}).format(minDate);
let da=new Intl.DateTimeFormat('en',{day:'2-digit'}).format(minDate);
startDateInput.setAttribute("min",`${ye}-${mo}-${da}`);
let startDateValue = startDateInput.textContent;
console.log(`${ye}-${mo}-${da}`);

var returnDate = document.createElement("div");
returnDate.textContent = "Return date";

var endDateInput = document.createElement("input");
endDateInput.setAttribute("type", "date");
endDateInput.setAttribute("id", "endDate");

var discountDiv = document.createElement("div");
discountDiv.textContent = "Discount code";

var discountCodeDiv = document.createElement("div");
var discountCodeInput = document.createElement("input");
discountCodeInput.setAttribute("type", "string");

var rentbtndiv = document.createElement("div");
rentbtndiv.setAttribute("id", "btnDiv");
rentbtndiv.style.display="flex";

let message= document.createElement('div');

var rentbutton = document.createElement("input");
rentbutton.setAttribute("type", "button");
rentbutton.setAttribute("value", "Check Pricing");
rentbutton.setAttribute("id", "rentBtn");

bigD.appendChild(title);
bigD.appendChild(form);
form.appendChild(rentCardInputs);
rentDetailsDiv1.appendChild(pickUp);
rentDetailsDiv1.appendChild(startDateInput);
rentDetailsDiv2.appendChild(returnDate);
rentDetailsDiv2.appendChild(endDateInput);
rentDetailsDiv3.appendChild(discountDiv);
rentDetailsDiv3.appendChild(discountCodeInput);
rentbtndiv.appendChild(rentbutton);
rentDetailsDiv3.appendChild(message);
rentCardInputs.appendChild(rentDetailsDiv1);
rentCardInputs.appendChild(rentDetailsDiv2);
rentCardInputs.appendChild(rentDetailsDiv3);
rentCardInputs.appendChild(rentbtndiv);

//creating confirm rent card 
var bigD2 = document.createElement("div");
bigD2.setAttribute("id", "selectDateCard");

var dates1 = document.createElement("div");
dates1.setAttribute("class", "dates")

var title1 = document.createElement("h2");
title1.setAttribute("class", "datesTitle");
title1.textContent = "Pick up date";

var startDateDiv = document.createElement("div");

var hr = document.createElement("hr");

var dates2 = document.createElement("div");
dates2.setAttribute("class", "dates")

var title2 = document.createElement("h2");
title2.setAttribute("class", "datesTitle");
title2.textContent = "Return date";

var returnDateDiv = document.createElement("div");

var price = document.createElement("div");
price.setAttribute("class", "price")

var confirmRentBtn = document.createElement("input");
confirmRentBtn.setAttribute("class", "confirmRent");
confirmRentBtn.setAttribute("type", "button");
confirmRentBtn.setAttribute("value", "Rent");

dates1.appendChild(title1);
dates1.appendChild(startDateDiv);

dates2.appendChild(title2);
dates2.appendChild(returnDateDiv);

bigD2.appendChild(dates1);
bigD2.appendChild(hr);
bigD2.appendChild(dates2);
bigD2.appendChild(hr.cloneNode(true));
bigD2.appendChild(price);
bigD2.appendChild(confirmRentBtn);

//reservations page cards

document.getElementById("reservations").addEventListener("click", allUserReservations)

function allUserReservations() {
    document.getElementById("childRentACarDivReservations").textContent = "";
    let numeber = 0;
    fetch(`http://localhost:8090/rent/myrent/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => data.forEach(element => {
            document.getElementById("childRentACarDivReservations").innerHTML += `<div id="reservationsCards"> 
            <div class="dates">
                <h2 class="datesTitle">Pick up date</h2>
                <div>${element.startDate} </div>
            </div>
            <hr>
            <div class="dates">
                <h2 class="datesTitle">Return date</h2>
                <div>${element.endDate} </div>
            </div>
            <hr>
            <h2 class="datesTitle">Rent status</h2>
            <div class="dates"> ${rentStatus(element.startDate, element.endDate)}</div>
            </div>
            <div class="carReservationCard" id="insertCarCardReservationsCard${numeber}">${singleCarCardReservations(element.carId, numeber)} </div>`

            numeber++;
        }))

}


//all cars display
loadAllCars();
function loadAllCars() {
    fetch(`http://localhost:8090/car`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => data.forEach(element => {
            if(element.rented==false){

            
            document.getElementById("allCarsCards").innerHTML += `<div id="carCard">
            <img style="height: 100px; width: 200px; margin-top:5px" src="/Pictures/${element.name}.jpg" alt="">
            <div id="carCardText"> ${element.name} </div>
            <div id="carCardText"> ${element.classification}</div>
            <div id="carCardText" style="display: flex; justify-content: center;"> <img src="/Pictures/door.png"
                    alt="" srcset="">
                <div id="carCardText">${element.doors}</div> <img src="/Pictures/passengers.png" alt="" srcset="">
                <div id="carCardText">${element.seats}</div>
                <img src="/Pictures/transmision.png" alt="" srcset="">
                <div id="carCardText">${element.gearBox}</div>
                
            </div>
            <div id="carCardText">€${element.pricePerDay} | day </div>
            <div id="carId" style="display:none";><p>${element.id} </p></div>
            <input class="rentACarButton" type="button" onclick="rentACar(${element.id});getCarDetails(${element.id});" value="Rent" id="rentCarBtn" />
        </div>`}

        }))
}

//single car card

function singleCarCard(id) {
    fetch(`http://localhost:8090/car/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(element => {
            document.getElementById('insertCarCard').innerHTML = `<div id="carCard">
            <img style="height: 100px; width: 200px; margin-top:5px" src="/Pictures/${element.name}.jpg" alt="">
            <div id="carCardText"> ${element.name} </div>
            <div id="carCardText"> ${element.classification}</div>
            <div id="carCardText" style="display: flex; justify-content: center;"> <img src="/Pictures/door.png"
                    alt="" srcset="">
                <div id="carCardText">${element.doors}</div> <img src="/Pictures/passengers.png" alt="" srcset="">
                <div id="carCardText">${element.seats}</div>
                <img src="/Pictures/transmision.png" alt="" srcset="">
                <div id="carCardText">${element.gearBox}</div>
                
            </div>
            <div id="carCardText">€${element.pricePerDay} | day </div>
            <div id="carId" style="display:none";> ${element.id}</div>
            
        </div>`
        })
}

//single car card for reservations

function singleCarCardReservations(id, number) {

    fetch(`http://localhost:8090/car/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(element => {
            document.getElementById(`insertCarCardReservationsCard${number}`).innerHTML =
                `<div id="carCard">
            <img style="height: 100px; width: 200px; margin-top:5px" src="/Pictures/${element.name}.jpg" alt="">
            <div id="carCardText"> ${element.name} </div>
            <div id="carCardText"> ${element.classification}</div>
            <div id="carCardText" style="display: flex; justify-content: center;"> <img src="/Pictures/door.png"
                    alt="" srcset="">
                <div id="carCardText">${element.doors}</div> <img src="/Pictures/passengers.png" alt="" srcset="">
                <div id="carCardText">${element.seats}</div>
                <img src="/Pictures/transmision.png" alt="" srcset="">
                <div id="carCardText">${element.gearBox}</div>
                
            </div>
            <div id="carCardText">€${element.pricePerDay} | day </div>
            <div id="carId" style="display:none";> ${element.id}</div>
            
        </div>`;
        })
}

//rent a car function for rent button

function rentACar(e) {
    message.textContent="";
    document.getElementById("mainRentACarDiv").style.display = "flex";
    bigD2.remove();
    form.reset();
    bigD.remove();
    localStorage.setItem("carId", e);
    document.getElementById("mainRentACarDiv").style.display = "flex";
    document.getElementById('insertCarCard').innerHTML = "";
    document.getElementById("childRentACarDiv").prepend(bigD);
    singleCarCard(e);

}
// rentbutton.addEventListener("click", checkPricing);
rentbutton.addEventListener("click", calculatePrice);


//get car details if needed
function getCarDetails(e) {
    fetch(`http://localhost:8090/car/${e}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(element => {
            localStorage.setItem("carPrice", element.pricePerDay)

        })
}

//function for check pricing button
function checkPricing() {
    startDateDiv.textContent = startDateInput.value;
    returnDateDiv.textContent = endDateInput.value;
    bigD.remove();

    document.getElementById("childRentACarDiv").prepend(bigD2);

}

//function for confirm rent button or rent save
confirmRentBtn.addEventListener("click", confirmRent);
function confirmRent() {
    console.log('2');


    fetch(`http://localhost:8090/rent`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            // "Authorization": "Bearer "+ localStorage.getItem("token")
        },
        body: JSON.stringify({

            startDate: startDateInput.value,
            endDate: endDateInput.value,
            totalPrice: localStorage.getItem("totalPrice"),
            totalPriceWithDiscount: localStorage.getItem("discountedPrice"),
            discount: discountCodeInput.value,
            userId: localStorage.getItem("userId"),
            carId: localStorage.getItem("carId")

        })

    }).then(res => {
        if (res.status = 200) {
            console.log('rent saved');
            document.getElementById("reservations").click();
            
        }
    })


}

//calculate price of rented car
rentbutton.addEventListener("click", calculatePrice);
function calculatePrice() {
    try {
        
        let startDate = new Date(startDateInput.value);
        let endDate = new Date(endDateInput.value);
       
        
        if(endDate<startDate||startDate.toDateString()==endDate.toDateString()){
           let invalidDate= document.createTextNode="*Invalid return date"
           message.textContent=invalidDate;
            console.log('??');
        }
        else{
            let z = endDate - startDate;

        let totalDays = z / (1000 * 3600 * 24);

        let totalPrice = totalDays * localStorage.getItem("carPrice");

        let discountCode = discountCodeInput.value;
        localStorage.setItem("totalPrice", totalPrice)
        localStorage.setItem("discountedPrice", "0");
        if (discountCodes.includes(discountCode)) {

            let percentage = discountCode.substr(0, 2);
            localStorage.setItem("discountCode", percentage);

            let a = totalPrice * percentage / 100;
            let discountedPrice = totalPrice - a;

            localStorage.setItem("discountedPrice", discountedPrice);

            price.textContent = "€" + discountedPrice;
            checkPricing();
        }
        else {

            price.textContent = "€" + totalPrice;
            checkPricing();
        }
        }
        
    }
    catch (err) {

    }


}

//check if rent is active or not
function rentStatus(sdate, fdate) {
    let startDate = new Date(sdate);
    let endDate = new Date(fdate);

    let today = new Date();
    if (endDate < today) {
        return "Rent finished";
    }
    if (startDate > today) {
        return "Rent not active yet";
    }
    if (startDate < today && endDate > today) {
        return "Rent active";
    }
}
//check if user is admin
checkIfAdmin();

function checkIfAdmin(){
    fetch(`http://localhost:8090/user/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(element => {
          
            if(element.rolesIds.includes(2)){
                console.log('admin');
                document.getElementById("admin").style.visibility="visible";
            }

        })


}

