(function(){


 async function infectionRisk() {
    try {


        let inputValue = "lljhgfd";
        if (inputValue.trim() === "")
        {
            return;
        }

        else{

            var my_json = {visited:[
                {countryName: "Italy", dateOfArriaval: "2021-01-30", durationDays: "7"},
                {countryName: "Netherlands", dateOfArriaval: "2021-01-08", durationDays: "11"},
                {countryName: "Norway", dateOfArriaval: "2021-01-19",durationDays: "3"}]};


            for( i  = 0 ; i < my_json.visited.length ; i++) {

                var concat_trl =  json_object_to_url(my_json.visited[i]);

                console.log(concat_trl);

                get_data_api(concat_trl)
                    .then (list => {
                        let html = "";
                        var  num =1;
                        calculate_risk(list);

                    });
            }
        };

    } catch (error) {
        console.error(error);
    }
};



    document.addEventListener('DOMContentLoaded',function () {
            document.getElementById("covid19").addEventListener('click',infectionRisk)}, false);


})();

//********************************    json_object_to_url   *************************************************************************

function json_object_to_url(json_obj) {
    var basic_url = 'https://api.covid19api.com/country/';
    console.log(json_obj.countryName);
    let country = json_obj.countryName;
   // let dateOfArriaval = json_obj.dateOfArriaval;

//date minus 1
    let dateOfArriaval = calculate_leaving_date(json_obj , '-1');
    console.log("jdateOfArriaval");
    console.log(dateOfArriaval);

    let leaving_date = calculate_leaving_date(json_obj , json_obj.durationDays);

    var concat_url = basic_url.concat(country,"?from=" , dateOfArriaval , "T00:00:00Z&to=" , leaving_date , "T00:00:00Z" );

    return concat_url;
}

//**********************************************  get_data_api   ******************************************************

async  function get_data_api(url) {
 /*var my_data = " ";
    //return await fetch(url).then(res => res.json());
    const data = await fetch(url)
        .then((response) => response.json()) //2
        .then((data) => {
            //console.log( "get_data_api    " + JSON.stringify(data));//JSON.stringify(data) ); //3
       // .then(data => console.log(JSON.stringify(data))
            my_data = JSON.stringify(data);
           // console.log( "get_data_api    " + my_data);//JSON.stringify(data) ); //3
        });

    return my_data;*/
    return await fetch(url).then(res => res.json());
}
//****************************************    calculate_leaving_date****************************************************
function calculate_leaving_date(json_obj , num_of_days_to_add_or_sub) {

    var year = json_obj.dateOfArriaval.substring(0, 4);
    var month = json_obj.dateOfArriaval.substring(5, 7);
    var day = json_obj.dateOfArriaval.substring(8, 10);

    var my_date = new Date();

    var day_int = parseInt(day);
    var duration =parseInt(num_of_days_to_add_or_sub);
    console.log("duration  " +duration);
    day_int = day_int + duration;

    console.log("day_int  " +day_int);

    var day_string = day_int.toString();
    console.log("day_string" + day_string);
    my_date.setFullYear(year, month, day_string);

    var m_day = my_date.getDate();
    console.log("getFullYear  " +  month );

    if(m_day.length < 2)
        m_day = "0".concat(m_day);

    var m_month = my_date.getMonth().toString();
    if(m_month.length < 2)
        m_month = "0".concat(m_month);

    var leaving_date = my_date.getFullYear().toString().concat("-" , m_month , "-" , m_day );

    console.log("wwwwwwwwwwwyyyyyyyyyy");
    console.log(leaving_date);
    return leaving_date;
}
//**********************************************  calculate_risk   ******************************************************
 function calculate_risk(data_returned_from_api) {

   let avrage_risk = 0;
    for( let j  = 0 ; j < data_returned_from_api.length-1 ; j++) {  //-1???????????????????????????

        let day_before_X_active_cases =  parseInt(data_returned_from_api[j].Active);
        let day_X_active_cases = parseInt(data_returned_from_api[j+1].Active);
        let day_x_confirmed_cases = parseInt(data_returned_from_api[j+1].Confirmed);
        let dayXNewCases = (day_X_active_cases - day_before_X_active_cases);
        let sickPopulationRatioFactor = day_X_active_cases / day_x_confirmed_cases * 100;
        let estimatedRisk = (dayXNewCases / day_X_active_cases * 100) * sickPopulationRatioFactor * 0.5;
        //console.log("estimatedRisk         @@@@@@@@@" + estimatedRisk);
        avrage_risk += estimatedRisk;
    }
     console.log("day_before_X_active_cases    " + avrage_risk/data_returned_from_api.length);

    return 1;
}











