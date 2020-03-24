function returnResults() {
    var sex = document.forms["mainform"]["sex"].value;
    var age = document.forms["mainform"]["age"].value;
    if (isInt(age) == false || sex == "") {
        alert("Please fill in both fields");
        return false;
    } else {
        if (parseInt(age) > 104 || parseInt(age) < 1) {
            alert("Please input an age lower then 105 and greater then 0");
            return false;
        } else {
            console.log(sex, age);
            document.getElementById("results").innerHTML = getResults(sex, age);            
        }
    }
}
function isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}


function getResults(sex, age) {
    var name = "";
    var hosp = [];
    var mortal = [];
    
    if (sex == "male") {    
        name = "https://ionimpulse.github.io/History-Project-COVID-19-Website/data/regressed_male_calculator_data.csv";
    } else {
        name = "https://ionimpulse.github.io/History-Project-COVID-19-Website/data/regressed_female_calculator_data.csv";
    }

    $.ajax({
        type: "GET",
        url: name,
        dataType: "text",
        success: function(data) {processData(data);},
        async: false
    });

    // Let's process the data from the data file
    function processData(data) {
        var lines = data.split(/\r\n|\n/);

        for (var j=0; j<lines.length-1; j++) {
            var values = lines[j].split(','); // Split up the comma seperated values
            hosp.push(parseFloat(values[0])); 
            mortal.push(parseFloat(values[1]));
        }
    }

    var hosp_num = hosp[parseInt(age)];
    var mortal_num = mortal[parseInt(age)];

    hosp_num = Math.round(hosp_num);
    mortal_num = Math.round(mortal_num);

    if (hosp_num < 0) {
        hosp_num = 0;
    }
    if (mortal_num < 0) {
        mortal_num = 0;
    }
    console.log("Relative chance of hospitalization: " + hosp_num.toString() + "%\nRelative chance of death: " + mortal_num.toString() + "%");
    return "Relative chance of hospitalization: " + hosp_num.toString() + "%<br>Relative chance of death: " + mortal_num.toString() + "%";
}