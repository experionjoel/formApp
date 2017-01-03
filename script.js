 $(function () {

	var IDarray = new Array();
	var flag = 0;
	IDarray = [];
  var dob;
  var temp = {};
  var imgStore = new Image();
  var tempArray = [];
  $('#myImg').hide();

  // DATEPICKER SETTINGS
  $('#DOB').datepicker(
	{
      dateFormat: 'dd/mm/yy',
      autoclose: true,
      pickerPosition: "bottom-left",
      todayHighlight: true,
      defaultDate: new Date(),
      yearRange: '1950:2050',
      changeMonth: true,
      changeYear: true,
      maxDate: '+0d',
  });

  //FUNCTION TO CHECK IF MARRIED
  function checkSpouse(latest) {
       	if($('#marital_status').val() === "Married")
            {
                console.log("married");
                return true;
   		    }
            else
            {
                console.log("single");
                return false;
            }
     };

  //IMAGE UPLOAD HANDLER FUNCTIONS
    $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
            $('#myImg').show();
            $("#profile").hide();
        });
    });

    function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);
        console.log(e.target.result);
        imgStore = e.target.result;
    };

  //FUNCTION TO VALIDATE AGE > 0
    function ageValidator() {
      var tempdate = $('#DOB').val();
      var today = new Date();
      var format = tempdate.split("/");
      var birthdate = new Date(format[2], format[1], format[0]);
      var diff = today-birthdate; // This is the difference in milliseconds
      var age = Math.floor(diff/31557600000);
      if(age > 0)
        return true;
      else
      {
          alert("You have entered an invalid date !!");
          return false;
      }
    };

  //FUNCTION TO VALIDATE INDIAN PHONE NUMBER
    function phonenumValidator(phoneNum)
     {
          var phoneno = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
         if((phoneNum.match(phoneno)))
              {
                  return true;
               }
          else
               {
                  alert("You have entered an invalid phone number !!");
                  return false;
              }
     }
  //FUNCTION TO VALIDATE EMAIL
    function emailValidator(new_email) {
      var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
         if (filter.test(new_email)) {
              return true;
         }
        else {
                alert("You have entered an invalid email ID !!");
                return false;
        }
    }

// CONTROL OF DIV CONTAINING MARITAL STATUS FIELD
    $("#marital_status").change(function () {

        if ($(this).find(':selected').text() === 'Married') {
            $("#spousedetails").show();
        }
        else if ($(this).find(':selected').text() === 'Single') {
             $("#spousedetails").hide();
        }
        else if ($(this).find(':selected').text() === 'Select') {
             $("#spousedetails").hide();
        }
        else {
             $("#spousedetails").show();
        }    
    });

    $("#marital_status").click(function(){
        if(checkSpouse())
           { $("spousedetails").hide(); }
    });

    // PREVENTING INVALID CHARACTERS FOR INPUT FIELDS

    $('#firstname').on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
        event.preventDefault();
        return false;
        }
    });
    $('#lastname').on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
        event.preventDefault();
        return false;
        }
    });
    $('#fathername').on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
        event.preventDefault();
        return false;
        }
    });
    $('#mothername').on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
        event.preventDefault();
        return false;
        }
    });
    $('#spousename').on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
        event.preventDefault();
        return false;
        }
    });

    // END OF VALIDATION - PREVENT SPECIAL CHARACTERS


// REGISTER BUTTON CLICK
   $('#save').click(function(e)
   {
   		e.preventDefault();
   		if($('#firstname').val() === ""){
   			alert('Please fill first name field.');
   		}
   		else if($('#lastname').val() === ""){
   			alert('Please fill Last Name field.');
   		}
   		else if($('#marital_status').val() === "select"){
   			alert('Please select marital status');
   		}
   		else if($('#DOB').val() === new Date()){
   			alert('Please fill D.O.B field.');
   		}
   		else if($('#gender').val() === ""){
   			alert('Please select your gender');
   		}
   		else if($('#fathername').val() === ""){
   			alert('Please enter Father\'s name');
   		}
   		else if($('#mothername').val() === ""){
   			alert('Please enter Mother\'s name');
   		}
   		else if(($('#spousename').val() === "")&&(checkSpouse())){
            alert('Please enter spouse name.');
        }
   		else if($('#emailID').val() === ""){
   			alert('Please enter Email ID');
   		}
   		else if($('#mobile').val() === ""){
   			alert('Please enter mobile number');
   		}
   		else if($('#company').val() === ""){
   			alert('Please enter company name');
   		}
   		else if($('#desig').val() === ""){
            alert('Please enter your designation.');
        }
        else{

            if(checkSpouse) {
                temp = {
                    firstName: $('#firstname').val(),
                    lastName: $('#lastname').val(),
                    maritalStatus: $('#marital_status').val(),
                    dob: $('#DOB').val(),
                    gender: $('#gender').val(),
                    fatherName: $('#fathername').val(),
                    motherName: $('#mothername').val(),
                    spouseName: $('#spousename').val(),
                    email: $('#emailID').val(),
                    mobile: $('#mobile').val(),
                    company: $('#company').val(),
                    desig: $('#desig').val(),
                };
            }
            else {
                temp = {
                    firstName: $('#firstname').val(),
                    lastName: $('#lastname').val(),
                    maritalStatus: $('#marital_status').val(),
                    dob: $('#DOB').val(),
                    gender: $('#gender').val(),
                    fatherName: $('#fathername').val(),
                    motherName: $('#mothername').val(),
                    spouseName: "",
                    email: $('#emailID').val(),
                    mobile: $('#mobile').val(),
                    company: $('#company').val(),
                    desig: $('#desig').val(),
                };   
            }

            if( ageValidator() && emailValidator( $('#emailID').val()) && phonenumValidator($('#mobile').val()) ){

        // STORING INTO LOCAL STORAGE
                    if (localStorage.getItem("users") === null) {
                        localStorage.setItem('users', JSON.stringify(temp));
                    }
                    else{
                        tempArray = JSON.parse(localStorage.getItem('users'));
                        localStorage.clear();
                        localStorage.setItem('users', JSON.stringify(temp));
                        localStorage.setItem('profileImg', imgStore);
                    }
        // REDIRECTING TO USER DETAIL PAGE

                    window.location.href = "./user_detail/userDetail.html";
            }

   		}


   	});

});
