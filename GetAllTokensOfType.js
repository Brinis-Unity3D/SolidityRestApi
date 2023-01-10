const express = require('express');
const https = require('https');
var uri="https://api.metaversenftleaders.com/api/80001/0x96d1FAcf242F5dD5d7Bd8de6EB0Eaf3D4B5Cf1A9/f_GetTokenType/mars_0112";
https.get(uri, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});



