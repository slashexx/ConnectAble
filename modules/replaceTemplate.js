// replaceTemplate.js

function secondsToDateTime(seconds) {

  console.log(seconds);
  // if (!seconds && seconds !== 0) {
  //   return "Invalid Date";
  // }
  
  // Create a new Date object using the seconds converted to milliseconds
  const date = new Date(seconds * 1000);
  
  // Extract the individual components of the date and time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const secondsPart = String(date.getSeconds()).padStart(2, '0');
  
  // Format the date and time as desired
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${secondsPart}`;
  
  return `${formattedDate} ${formattedTime}`;
}



const replace = (temp, product) => {
  console.log(product);
  let output = temp.replace(/{%EVENT_NAME%}/g, product.title);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%LOCATION%}/g, product.location);
  output = output.replace(/{%TIME%}/g, secondsToDateTime(product.date.seconds));
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id || 'NO ID');
  output = output.replace(/{%HOST_NAME%}/g, product.hostName);
  
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
}


export default replace;
