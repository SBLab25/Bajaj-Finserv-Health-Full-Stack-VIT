const https = require('https');

const testCases = [
    {
        name: "Example A",
        data: ["a","1","334","4","R", "$"]
    },
    {
        name: "Example B",
        data: ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
    },
    {
        name: "Example C",
        data: ["A","ABcD","DOE"]
    }
];

function testAPI(testCase, callback) {
    const data = JSON.stringify({ data: testCase.data });
    
    const options = {
        hostname: 'bfhl-anm2c61h9-sovans-projects.vercel.app',
        port: 443,
        path: '/bfhl',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log(`\n📝 Testing: ${testCase.name}`);
    console.log(`Input: ${JSON.stringify(testCase.data)}`);

    const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        
        res.on('end', () => {
            console.log('✅ Response Status:', res.statusCode);
            try {
                const parsed = JSON.parse(responseData);
                console.log('📄 Response:');
                console.log(JSON.stringify(parsed, null, 2));
            } catch (e) {
                console.log('Raw Response:', responseData);
            }
            console.log('─'.repeat(70));
            callback();
        });
    });

    req.on('error', (error) => {
        console.error('❌ Error:', error.message);
        callback();
    });

    req.write(data);
    req.end();
}

// Test all examples
let currentTest = 0;
function runNextTest() {
    if (currentTest < testCases.length) {
        testAPI(testCases[currentTest], () => {
            currentTest++;
            runNextTest();
        });
    } else {
        console.log('\n🎉 All tests completed!');
    }
}

console.log('🧪 Testing Live API: https://bfhl-anm2c61h9-sovans-projects.vercel.app/bfhl');
runNextTest();