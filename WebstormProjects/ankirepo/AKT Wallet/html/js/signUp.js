$('.signup-button').click(function () {
    var full_name = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;
    var cnf_pwd = document.getElementById("cnfPwd").value;
    var ref_code = document.getElementById("referralCode").value;


    if(full_name.length == 0 || email.length < 0 || pwd.length <0 || cnf_pwd < 0 ){
        window.alert("Invalid details!");
    }
    else if(pwd != cnf_pwd){
        window.alert("Invalid password!");
    }
    else {
        axios.post('http://localhost:3000/api/user/signup', {
            fullname: full_name,
            email:email,
            password:pwd
        })
            .then(function (response){
                console.log(response);

                if(response.data.status == true){
                    alert(JSON.stringify(response.data, undefined,2));
                      $(location).attr('href','http://localhost:63342/AKT%20Wallet/html/login.html');

                }
                else {
                    alert(JSON.stringify(response.data, undefined,2));

                }
            })
            .catch(function (error) {
                // console.log(error);
                alert(JSON.stringify(error, undefined,2));

            });
    }


    console.log(full_name, email,pwd,cnf_pwd,ref_code);

});
