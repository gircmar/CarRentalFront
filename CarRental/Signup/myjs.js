let register=document.getElementById("register");
register.addEventListener("click",confirmRegister);


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
function loadMainPageSignup(){
    window.location.assign("http://127.0.0.1:3000/MainPage/index.html");
}

function confirmRegister(e){
    e.preventDefault();
    console.log("??")
    let myname = document.getElementById("firstName").value;
    let mysurname = document.getElementById("lastName").value;
    let myemail = document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let repeatPassword=document.getElementById("repeatPassword").value;

    fetch('http://localhost:8090/api/auth/signup', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify({name:myname,lastName:mysurname,email:myemail,password:password,repeatPassword:repeatPassword    })
    
}).then(res =>{
    if(res.status==200){
        console.log('resok');
        window.location.assign("http://127.0.0.1:3000/Login/index.html");
    }
} )
}



