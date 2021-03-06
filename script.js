 $(function () {

	var IDarray = new Array();
	var flag = 0;
	IDarray = [];
  var dob;
  var temp = {};
  var tempArray = [];
  // (new Date(startDt).getTime() > new Date(endDt).getTime())

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
     }

function readFile() {
  if (this.files && this.files[0]) {
    var FR= new FileReader();
    FR.onload = function(e) {
      document.getElementById("profile-op").src = e.target.result;
      $("#profile-op").show();
      console.log("reached");
      $("#profile").hide();
    };       
    FR.readAsDataURL( this.files[0] );
  }
}

document.getElementById("profimage").addEventListener("change", readFile, false);
//   function chooseFile() {
//             if (this.files && this.files[0]) {
//                 var FR = new FileReader();
//                 FR.onload = function(e) {
//                 document.getElementById("profile").src = e.target.result;
//                 // document.getElementById("b64").innerHTML = e.target.result;
//                 };       
//                 FR.readAsDataURL( this.files[0] );
//             }  
//    }

// IMAGE UPLOAD
//   function uploadBtn() {
//     $("#profimage").click( 
        
//              chooseFile()
//             // document.getElementById("profimage").addEventListener("change", chooseFile, false)
        
//     );
//   }
//   document.getElementById("profimage").addEventListener("change", readFile, false);

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
    }

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
                    }
        // REDIRECTING TO USER DETAIL PAGE

                    window.location.href = "./user_detail/userDetail.html";
            }

   		}


   	});

});
