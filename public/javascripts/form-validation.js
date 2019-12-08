// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        var recaptcha = this.document.getElementsByClassName('recaptcha-feedback')[0];
        var username = this.document.getElementById('username');
        var emailAddress = this.document.getElementById('email');
        var password = this.document.getElementById('password');
        var validated =false;

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false || grecaptcha.getResponse() =="") {

                    if(grecaptcha.getResponse() =="") {
                        recaptcha.innerHTML="pls verify your register"; 
                        recaptcha.classList.remove('validated')
                        validated = false;
                    };
                    if(username.value == "") { username.classList.remove('validated'); validated = false; }
                    if(emailAddress.value == "") { emailAddress.classList.remove('validated'); validated = false; }
                    if(password.value == "") { password.classList.remove('validated'); validated = false; }

                    event.preventDefault()
                    event.stopPropagation()
                }
                
                if(grecaptcha.getResponse() !="") { recaptcha.innerHTML=""; recaptcha.classList.add('validated');}
                if(username.value != "") { username.classList.add('validated'); }
                if(emailAddress.value != "") { emailAddress.classList.add('validated'); }
                if(password.value != "") { password.classList.add('validated'); }
                if(recaptcha.classList.contains('validated') && username.classList.contains('validated') &&
                    emailAddress.classList.contains('validated') && password.classList.contains('validated')) { validated = true;}

                if(validated){
                    $.ajax({
                        type: "post",
                        url: "/register",
                        dataType: "json",
                        data: {
                            username: username.value,
                            email: emailAddress.value,
                            password: password.value
                        },
                        success: function(data) {
                            console.log("success");
                        },
                        error: function(){
                            console.log("fail");
                        }
                    });
                }
                
                form.classList.add('was-validated')
            }, false)
        })
    }, false)
}())
