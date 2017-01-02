 $(function () {

    var IDarray = new Array();
    var flag = 0;
    IDarray = [];
  // (new Date(startDt).getTime() > new Date(endDt).getTime())
    

    temp = [];
    tempObj = JSON.parse(localStorage.getItem('users'));
    console.log(tempObj.firstName);

    function findAge() {
      var tempdate = tempObj.dob;
      var today = new Date();
      var format = tempdate.split("/");
      var birthdate = new Date(format[2], format[1], format[0]);
      var diff = today-birthdate; // This is the difference in milliseconds
      var age = Math.floor(diff/31557600000);
      return age;
    }

    $('#firstname').val(tempObj.firstName);
    $('#lastname').val(tempObj.lastName);
    $('#age').val(findAge());
    $('#marital_status').val(tempObj.maritalStatus);
    $('#gender').val(tempObj.gender);
    $('#fathername').val(tempObj.fatherName);
    $('#mothername').val(tempObj.motherName);
    $('#emailID').val(tempObj.email);
    $('#mobile').val(tempObj.mobile);
    $('#company').val(tempObj.company);
    $('#desig').val(tempObj.desig);

    var $radios = $('input:radio[name=gender_type]');
    if($radios.is(':checked') === false) {
        
        if(tempObj.gender === 'male')
        {
          $radios.filter('[value=male]').prop('checked', true);
        }
        else
        {
          $radios.filter('[value=female]').prop('checked', true);
        }
    }

    $(".username").append(" " + tempObj.firstName + " ");

    if(tempObj.spouseName == 'Select') {
      $("#spousedetails").hide();
    }
    else if(tempObj.spouseName == "") {
      $("#spousedetails").hide();
    } 
    else {
      $('#spousename').val(tempObj.spouseName);
      $("#spousedetails").show();   
    }  

    // DISABLING ALL INPUTS
    $("#target :input").prop("disabled", true); 

});
