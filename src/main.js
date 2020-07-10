import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Exchange } from './currency-exchanger';
import { ExchangeService } from './exchange-service';

$(document).ready(function () {
  $("#getAPIbutton").click(function () {
    (async () => {
      let exchangeService = new ExchangeService();
      const response = await exchangeService.getExchange();
      getElements(response);
    })();
    
    function getElements(resultWeReceive) {
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
  });
});