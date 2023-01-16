document.getElementById("title").textContent="Hi "+localStorage.getItem("userName")+" "+localStorage.getItem("userLastName");
document.getElementById("nameNav").textContent=localStorage.getItem("userName")+" "+localStorage.getItem("userLastName");

document.getElementById("logOutNav").addEventListener("click",function(){
    window.location.assign("http://127.0.0.1:3000/MainPage/index.html");
})
document.getElementById("confirm").addEventListener("click",updateInfo);
let empty="";
function updateInfo(e){
    e.preventDefault();
    
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let driverLicenseNumber = document.getElementById("driverLicenseNumber").value;
    let dateOfBirth=document.getElementById("dateOfBirth").value;
    
if(address==empty||phoneNumber==empty||driverLicenseNumber==empty||dateOfBirth==empty){
    console.log('empty');
    document.getElementById("message").textContent="*All fields must be filled"
}
else{
    fetch(`http://localhost:8090/user/${localStorage.getItem("userId")}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("token")
        },
        body:JSON.stringify({
            id:localStorage.getItem("userId"),
            name:localStorage.getItem("userName"),
            lastName:localStorage.getItem("userLastName"),
            email:localStorage.getItem("userEmail"),
            dateOfBirth:dateOfBirth,
            address:address,
            phoneNumber:phoneNumber,
            driverLicenseNumber:driverLicenseNumber
        
        })
    
}).then(res=>{
    if(res.status=200){
        
        window.location.assign("http://127.0.0.1:3000/UserMainPage/index.html");
    }
})
}
    
}
