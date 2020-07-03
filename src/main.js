import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Exchange } from './currency-exchanger';


//business logic
function doTheThing(resultWeReceive) {
  if (resultWeReceive) {
    let BRL = parseFloat(resultWeReceive.conversion_rates.BRL).toFixed(2)
    let BGN = parseFloat(resultWeReceive.conversion_rates.BGN).toFixed(2)
    let AUD = parseFloat(resultWeReceive.conversion_rates.AUD).toFixed(2)
    let ARS = parseFloat(resultWeReceive.conversion_rates.ARS).toFixed(2)
    let AED = parseFloat(resultWeReceive.conversion_rates.AED).toFixed(2)
    let USD = parseFloat($("#usDollarAmount").val()).toFixed(2);
    let exchange = new Exchange(USD, AED, ARS, AUD, BGN, BRL)


    if (parseInt($("#country").val()) === 1) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToAed() + " United Arab Emirates Dirham(AED)")
    } else if (parseInt($("#country").val()) === 2) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToArs() + " Argentine Peso(ARS)")
    } else if (parseInt($("#country").val()) === 3) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToAud() + " Australian Dollar(AUD)")
    } else if (parseInt($("#country").val()) === 4) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToBgn() + " Bulgarian Lev(BGN)")
    } else if (parseInt($("#country").val()) === 5) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToBrl() + " Brazilian Real(BRL)")
    } else if (Number.isInteger(parseInt($("#country").val())) === false) {
      $("#results").text("that currency doesn't exsist")
    }
    console.log(USD)
    console.log(AED)
    console.log(exchange)
    console.log($("#usDollarAmount").val())

    console.log(parseInt($("#country").val()))


    //JSON.stringify(resultWeReceive.conversion_rates)
    $("#thingGoesHere").text(JSON.stringify(resultWeReceive.conversion_rates))

    // $("#errorHere").html('');
  } else {
    // $("#errorHere").html(`${resultWeReceive}`);
    // $("#thingGoesHere").html('');
  }
}


// exchange = new Exchange()

//user interface logic
$(document).ready(function () {

  $("#getAPIbutton").click(function () {
    console.log($("#usDollarAmount").val())
    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`) //fetch is a shortcut; it creates a promise object that executes a GET API request on the url fed into it.
      .then(function (responseJSON) {
        if (!responseJSON.ok) {
          throw Error(responseJSON.statusText); //if response is woops, pass an error status down to catch and catch will do something with it
        }
        return responseJSON.json(); //if response is good, pass the response down to the next .then and .then will do something with it
      })
      .catch(function (error) {  //only executes if response above was woops
        return error;
      })
      .then(function (messageFromPrevious) { //if .catch triggered, messageFromPrevious will be the  error message, if .catch did NOT trigger, messageFromPrevious will be the parsed JSON info 
        doTheThing(messageFromPrevious);


      });

  });

});