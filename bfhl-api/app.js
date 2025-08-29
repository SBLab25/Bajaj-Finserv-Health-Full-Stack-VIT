const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to check if a character is alphabetic
function isAlphabet(char) {
    return /[a-zA-Z]/.test(char);
}

// Helper function to check if a character is numeric
function isNumeric(char) {
    return /^\d+$/.test(char);
}

// Helper function to check if a character is special
function isSpecialChar(char) {
    return !isAlphabet(char) && !isNumeric(char);
}

// Helper function to create alternating caps string
function createAlternatingCaps(alphabets) {
    // Extract all alphabetical characters and join them
    let allChars = [];
    
    for (let item of alphabets) {
        for (let char of item) {
            if (isAlphabet(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    }
    
    // Reverse the array
    allChars.reverse();
    
    // Apply alternating caps (starting with UPPERCASE for first char)
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

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }
        
        // Initialize arrays and variables
        let oddNumbers = [];
        let evenNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let sum = 0;
        
        // Process each item in the data array
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
                // For alphabetic strings, convert to uppercase
                alphabets.push(strItem.toUpperCase());
            } else {
                // Special characters
                specialCharacters.push(strItem);
            }
        }
        
        // Create concatenated string with alternating caps
        const concatString = createAlternatingCaps(alphabets);
        
        // Response object
        const response = {
            is_success: true,
            user_id: "sovan_bhakta_25102002", // Replace with your actual details
            email: "sovan.22bce8046@vitapstudent.ac.in", // Replace with your actual email
            roll_number: "22BCE8046", // Replace with your actual roll number
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum),
            concat_string: concatString
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET /bfhl endpoint (for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: "BFHL API is running",
        endpoints: {
            POST: "/bfhl - Main API endpoint",
            GET: "/bfhl - Operation code endpoint"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;