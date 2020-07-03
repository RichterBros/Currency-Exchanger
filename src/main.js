import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Exchange } from './currency-exchanger';


//business logic
function doTheThing(resultWeReceive) {
  if (resultWeReceive) {
    let BGN = parseFloat(resultWeReceive.conversion_rates.BGN)
    let AUD = parseFloat(resultWeReceive.conversion_rates.AUD)
    let ARS = parseFloat(resultWeReceive.conversion_rates.ARS)
    let AED = parseFloat(resultWeReceive.conversion_rates.AED)
    let USD = parseFloat(resultWeReceive.conversion_rates.USD)
    let exchange = new Exchange(USD, AED, ARS, AUD, BGN)
 console.log(exchange.usdToAed())
 console.log(USD)
 console.log(AED)
console.log(exchange)
 
    
    $("#thingGoesHere").text(JSON.stringify(resultWeReceive.conversion_rates))
   
    // $("#errorHere").html('');
  } else {
    // $("#errorHere").html(`${resultWeReceive}`);
    // $("#thingGoesHere").html('');
  }
}


// exchange = new Exchange()

//user interface logic
$(document).ready(function() {
  
  $("#getAPIbutton").click(function() {

    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`) //fetch is a shortcut; it creates a promise object that executes a GET API request on the url fed into it.
      .then(function(responseJSON) {
        if (!responseJSON.ok) {
          throw Error(responseJSON.statusText); //if response is woops, pass an error status down to catch and catch will do something with it
        }
        return responseJSON.json(); //if response is good, pass the response down to the next .then and .then will do something with it
      })
      .catch(function(error) {  //only executes if response above was woops
        return error;
      })
      .then(function(messageFromPrevious) { //if .catch triggered, messageFromPrevious will be the  error message, if .catch did NOT trigger, messageFromPrevious will be the parsed JSON info 
        doTheThing(messageFromPrevious);
      
      });
      //let exchange = new Exchange(USD)
    });
    //let USD = parseInt($("#usDollarAmount"))
    
});