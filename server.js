const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const users = []; // In-memory user storage, for now

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User Registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = { username, password: hashedPassword, balance: 0 };
    users.push(user);
    res.status(201).send({ message: 'User registered successfully!' });
});

// User Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
        res.send({ message: 'Login successful!', token });
    } else {
        res.status(400).send({ message: 'Invalid credentials' });
    }
});

// Middleware to authenticate user using JWT
const authenticate = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized' });
            }
            req.user = decoded.username;
            next();
        });
    } else {
        res.status(401).send({ message: 'No token provided' });
    }
};

// Get Account Info
app.get('/account', authenticate, (req, res) => {
    const user = users.find(u => u.username === req.user);
    res.send({ username: user.username, balance: user.balance });
});

// Deposit Money
app.post('/deposit', authenticate, (req, res) => {
    const { amount } = req.body;
    const user = users.find(u => u.username === req.user);
    user.balance += parseFloat(amount);
    res.send({ message: 'Deposit successful!', balance: user.balance });
});

// Withdraw Money
app.post('/withdraw', authenticate, (req, res) => {
    const { amount } = req.body;
    const user = users.find(u => u.username === req.user);
    if (user.balance >= amount) {
        user.balance -= parseFloat(amount);
        res.send({ message: 'Withdrawal successful!', balance: user.balance });
    } else {
        res.status(400).send({ message: 'Insufficient balance' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
