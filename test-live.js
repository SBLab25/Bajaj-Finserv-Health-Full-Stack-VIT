const https = require('https');

const data = JSON.stringify({
    data: ["a","1","334","4","R", "$"]
});

const hostname = 'bfhl-anm2c61h9-sovans-projects.vercel.app';
const path = '/bfhl';

const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log(`Testing live API: https://${hostname}${path}`);

const req = https.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    
    res.on('end', () => {
        console.log('✅ Response Status:', res.statusCode);
        console.log('📄 Response Body:');
        try {
            const parsed = JSON.parse(responseData);
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log(responseData);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Error:', error.message);
});

req.write(data);
req.end();