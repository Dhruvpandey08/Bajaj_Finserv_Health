const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const user_details = {
    user_id: "Dhruv_Pandey_08102003",
    email: "dhruvpandey928@gmail.com",
    roll_number: "21BCE5560"
};

app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id: user_details.user_id,
        email: user_details.email,
        roll_number: user_details.roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
