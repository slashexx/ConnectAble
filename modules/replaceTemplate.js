// replaceTemplate.js

function secondsToDateTime(seconds) {
  // Create a new Date object using the seconds converted to milliseconds
  var date = new Date(seconds * 1000);
  
  // Extract the individual components of the date and time
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  var day = String(date.getDate()).padStart(2, '0');
  var hours = String(date.getHours()).padStart(2, '0');
  var minutes = String(date.getMinutes()).padStart(2, '0');
  var seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Format the date and time as desired
  var formattedDate = `${year}-${month}-${day}`;
  var formattedTime = `${hours}:${minutes}:${seconds}`;
  
  return `${formattedDate} ${formattedTime}`;
}


const replace = (temp, product) => {
  let output = temp.replace(/{%EVENT_NAME%}/g, product.title);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%LOCATION%}/g, product.location);
  output = output.replace(/{%TIME%}/g, secondsToDateTime(product.date.seconds));
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id || 'NO ID');
  output = output.replace(/{%HOST_NAME%}/g, product.hostName);
  
  // if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}

export default replace;
