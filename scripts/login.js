const loginBtn = document.getElementById("login-btn");
const userField = document.getElementById("user-field");
const passField = document.getElementById("password-field");
loginBtn.addEventListener("click",()=>{
    if(userField.value === "admin" && passField.value==="admin123")
    {
        alert("Login Successfull.");
        window.location.assign("./home.html");
    }
    else
    {
        alert("Login Failed");
    }
});