import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Exchange } from './currency-exchanger';

function doTheThing(resultWeReceive) {
  if (resultWeReceive) {
    let BRL = parseFloat(resultWeReceive.conversion_rates.BRL).toFixed(2);
    let BGN = parseFloat(resultWeReceive.conversion_rates.BGN).toFixed(2);
    let AUD = parseFloat(resultWeReceive.conversion_rates.AUD).toFixed(2);
    let ARS = parseFloat(resultWeReceive.conversion_rates.ARS).toFixed(2);
    let AED = parseFloat(resultWeReceive.conversion_rates.AED).toFixed(2);
    let USD = parseFloat($("#usDollarAmount").val()).toFixed(2);
    let exchange = new Exchange(USD, AED, ARS, AUD, BGN, BRL);

    if (parseInt($("#country").val()) === 1) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToAed() + " United Arab Emirates Dirham(AED)");
    } else if (parseInt($("#country").val()) === 2) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToArs() + " Argentine Peso(ARS)");
    } else if (parseInt($("#country").val()) === 3) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToAud() + " Australian Dollar(AUD)");
    } else if (parseInt($("#country").val()) === 4) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToBgn() + " Bulgarian Lev(BGN)");
    } else if (parseInt($("#country").val()) === 5) {
      $("#results").text($("#usDollarAmount").val() + " USD is equal to: " + exchange.usdToBrl() + " Brazilian Real(BRL)");
    } else if (Number.isInteger(parseInt($("#country").val())) === false) {
      $("#results").text("that currency doesn't exsist");
    }

    JSON.stringify(resultWeReceive.conversion_rates);

  } else {
    $("#errorHere").html(`${resultWeReceive}`);
    $("#thingGoesHere").html('');
  }
}

$(document).ready(function () {
  $("#getAPIbutton").click(function () {
    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function (responseJSON) {
        if (!responseJSON.ok) {
          throw Error(responseJSON.statusText);
        }
        return responseJSON.json();
      })
      .catch(function (error) {
        return error;
      })
      .then(function (messageFromPrevious) {
        doTheThing(messageFromPrevious);
      });
  });
});