// replaceTemplate.js
const replace = (temp, product) => {
  let output = temp.replace(/{%EVENT_NAME%}/g, product.title);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%LOCATION%}/g, product.location);
  output = output.replace(/{%TIME%}/g, product.date.seconds);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id || 'NO ID');
  output = output.replace(/{%HOST_NAME%}/g, product.hostName);
  
  // if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}

export default replace;
