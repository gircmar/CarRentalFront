let loginbtn=document.getElementById("login");
loginbtn.addEventListener("click",login);

let nulis=null;

let signupbtnNav=document.getElementById("signUpNav");


signupbtnNav.addEventListener("click",signup);


function signup(e){
    e.preventDefault();
    console.log("signup");
    window.location.assign("http://127.0.0.1:3000/Signup/index.html")
}

function loadMainPageLogin(){
    window.location.assign("http://127.0.0.1:3000/MainPage/index.html");
}



function login(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    fetch('http://localhost:8090/api/auth/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
           
        },
        body: JSON.stringify({ email:email, password:password })
    })
    .then(res=>{ 
        if(res.status==200){
           console.log("Log in successful")
           getDetails(email);
        res.json().then(user=>{
            localStorage.setItem(`token`,res.headers.get("Authorization"));
            console.log(user)

        })
        
      checkDetails(email);
    }
    
    
else{
    document.getElementById("loginMessage").textContent="*Wrong email or password";
}})}


function getDetails(email){
    fetch(`http://localhost:8090/user`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem("token")
    }})
.then(res => res.json())
.then(data => data.forEach(element => {
    if(element.email==email){
        console.log("user info saved")
        localStorage.setItem(`userId`,element.id)
        localStorage.setItem(`userName`,element.name)
        localStorage.setItem(`userLastName`,element.lastName)
        localStorage.setItem(`userEmail`,element.email)
        localStorage.setItem(`userPassword`,element.password)
        

    }
   
}))
}

//checking if other user info is filled
function checkDetails(email){
    fetch(`http://localhost:8090/user`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem("token")
    }})
.then(res => res.json())
.then(data => data.forEach(element => {
    if(element.email==email){
        
        if(element.address==nulis||element.dateOfBirth==nulis||element.phoneNumber==nulis||element.driverLicenseNumber==nulis){
           
            window.location.assign("http://127.0.0.1:3000/EnterDetailsPage/index.html");
            console.log("Some of user info is null ")
        }
else {
    window.location.assign("http://127.0.0.1:3000/UserMainPage/index.html");

        console.log(" user info is not null")
    }
    }
    
   
}))


}
