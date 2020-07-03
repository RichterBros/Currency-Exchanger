import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Exchange } from './currency-exchanger';

function getElements(response) {
  
  let exchange;
  
  if (response) {

    exchange = new Exchange(response.conversion_rates);
    //dino.splitDino();

   

  } else {
    $('#dino-output').text("");
    $('#error-output').text(`There was an error: ${response.message}`);
  }
}





$(document).ready(function() {
  //$('#generate').click(function() {

    $('.keyboard').remove();
    $('span').remove();

    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      })
      .then(function(jsonifiedResponse) {
        getElements(jsonifiedResponse);
      //});
  });
});