
localStorage.setItem("userId","0");
let loginbtnNav=document.getElementById("logInNav");
let signupbtnNav=document.getElementById("signUpNav");

loginbtnNav.addEventListener("click",login);
signupbtnNav.addEventListener("click",signup);
function login(e){
e.preventDefault();
console.log("login")
window.location.assign("http://127.0.0.1:3000/Login/index.html")
}

function signup(e){
    e.preventDefault();
    console.log("signup");
    window.location.assign("http://127.0.0.1:3000/Signup/index.html")
}
document.getElementById("aboutUs").addEventListener("click",function(){
    document.getElementById("aboutUsDiv").style.display="block";
    document.getElementById("mainPageDiv").style.display="none";
    document.getElementById("contactUsDiv").style.display="none";
    document.getElementById("allCarsCards").style.display="none";
})


document.getElementById("contactUs").addEventListener("click",function(){
    document.getElementById("aboutUsDiv").style.display="none";
    document.getElementById("mainPageDiv").style.display="none";
    document.getElementById("contactUsDiv").style.display="block";
    document.getElementById("allCarsCards").style.display="none";
})

function loadMainPage(){
    window.location.assign("http://127.0.0.1:3000/MainPage/index.html");
}
loadAllCars();
function loadAllCars(){
   
  fetch(`http://localhost:8090/car` , {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem("token")
    }})
    .then(res => res.json())
    .then(data =>data.forEach(element => {
        console.log(data)
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
            <div id="carId" style="display:none";> ${element.id}</div>
            <input type="button" onclick="rentBtn()" value="Rent" id="carCardText" />
        </div>`
        
    }))  
}

function rentBtn(){
    window.location.assign("http://127.0.0.1:3000/Login/index.html");
}

// activeRents();
// function activeRents(){
//     fetch(`http://localhost:8090/rent/active` , {
//     method: "GET",
//     headers: {
//         "Content-type": "application/json",
//         "Authorization": "Bearer "+ localStorage.getItem("token")
//     }})
    

// }




    


    


