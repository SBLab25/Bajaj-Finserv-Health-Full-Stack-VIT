// Simple test file to verify the API logic locally

// Test cases based on the examples provided
const testCases = [
    {
        name: "Example A",
        input: ["a","1","334","4","R", "$"]
    },
    {
        name: "Example B", 
        input: ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
    },
    {
        name: "Example C",
        input: ["A","ABcD","DOE"]
    }
];

// Helper functions (copied from main app logic)
function isAlphabet(char) {
    return /[a-zA-Z]/.test(char);
}

function isNumeric(char) {
    return /^\d+$/.test(char);
}

function createAlternatingCaps(alphabets) {
    let allChars = [];
    
    for (let item of alphabets) {
        for (let char of item) {
            if (isAlphabet(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    }
    
    allChars.reverse();
    
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toUpperCase();
        } else {
            result += allChars[i].toLowerCase();
        }
    }
    
    return result;
}

function processData(data) {
    let oddNumbers = [];
    let evenNumbers = [];
    let alphabets = [];
    let specialCharacters = [];
    let sum = 0;
    
    for (let item of data) {
        const strItem = String(item);
        
        if (isNumeric(strItem)) {
            const num = parseInt(strItem);
            if (num % 2 === 0) {
                evenNumbers.push(strItem);
            } else {
                oddNumbers.push(strItem);
            }
            sum += num;
        } else if (isAlphabet(strItem)) {
            alphabets.push(strItem.toUpperCase());
        } else {
            specialCharacters.push(strItem);
        }
    }
    
    const concatString = createAlternatingCaps(alphabets);
    
    // Return complete API response format
    return {
        is_success: true,
        user_id: "sovan_bhakta_25102002", // Replace with your actual details
        email: "sovan.22bce8046@vitapstudent.ac.in",        // Replace with your actual email
        roll_number: "22BCE8046",       // Replace with your actual roll number
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: String(sum),
        concat_string: concatString
    };
}

// Function to test the logic
function runTests() {
    console.log('🧪 Running API Logic Tests...\n');
    
    for (let testCase of testCases) {
        console.log(`📝 Testing: ${testCase.name}`);
        console.log(`Input: ${JSON.stringify(testCase.input)}`);
        
        try {
            const result = processData(testCase.input);
            
            console.log(`✅ Complete API Response:`);
            console.log(JSON.stringify(result, null, 2));
            
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        console.log('─'.repeat(70));
    }
}

// Run the tests immediately when file is executed
runTests();

module.exports = { runTests, processData };