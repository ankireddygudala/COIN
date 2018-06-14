
// validating user data

//validate email
function validateEmail(emailField) {

    var email = emailField;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
        alert('Please provide a valid email address');
        return false;
    }
    else if (emailField.length<6){
        return false;
    }
    else return true;
}

// validate Password
function validatePassword(inputText){
    if(inputText=="" || inputText.length<6){
        window.alert("invalid password!");
        return false;
    }
    else{
        return true;
    }
}

function doSignUpAction() {
    var full_name = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;
    var cnf_pwd = document.getElementById("cnfPwd").value;
    var ref_code = document.getElementById("referralCode").value;


    if(validateEmail(email)) {
        if (pwd == cnf_pwd) {
            if (validatePassword(pwd) && validatePassword(cnf_pwd)) {
                axios.post('http://localhost:3000/api/user/signup', {
                    fullname: full_name,
                    email: email,
                    password: pwd
                })
                    .then(function (response) {
                        console.log(response);
                        window.alert("User registered successfully!");
                        $(location).attr('href', 'http://localhost:63342/AKT%20Wallet/html/login.html');

                        if (response.data.status == true) {
                            alert(JSON.stringify(response.data, undefined, 2));
                            $(location).attr('href', 'http://localhost:63342/AKT%20Wallet/html/login.html');

                        }
                        else {
                            alert(JSON.stringify(response.data, undefined, 2));

                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(JSON.stringify(error, undefined, 2));

                    });
            }
        }

    }
    console.log(full_name, email,pwd,cnf_pwd,ref_code);

}



function doLoginVerification(email1, pwd1 ,callback) {
    //request api
    var email = email1;
    var pwd = pwd1;
    axios.post('http://localhost:3000/api/user/login', {
        email: email,
        password: pwd
    }).then(function (response) {
            // console.log(response);
            // window.alert(JSON.stringify(response, undefined, 2));
            if(response.data.status == true) {
                localStorage.setItem('token', response.data.token);
                // $(location).attr('href', 'http://localhost:63342/AKT%20Wallet/html/dashboard/index.html');
                window.location.assign("/AKT%20Wallet/html/dashboard/index.html");
                callback("true");
            }
            else{
                window.alert(JSON.stringify(response, undefined, 2));
                callback("error");
            }
            //window.location = 'http://www.yourdomain.com';
        })
        .catch(function (error) {
            window.alert(error);
            callback(error);
        });
}
// to verify signin

function doLoginAction() {
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;

    if(validateEmail(email) && validatePassword(pwd) ) {

        doLoginVerification(email, pwd, function (message) {
            if(message === "true"){
                 window.location.assign("/AKT%20Wallet/html/dashboard/index.html");
            }
            else{
                window.alert('Something went wrong, please try again!');
                 window.location.assign("/AKT%20Wallet/html/login.html");
            }
        })
    }
}







