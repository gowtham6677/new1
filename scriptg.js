document.addEventListener('DOMContentLoaded', () => {
    let users = [];
    let currentUser = null;

    const adminButton = document.getElementById('adminButton');
    const userButton = document.getElementById('userButton');
    const adminSubmitButton = document.getElementById('adminSubmitButton');
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const depositForm = document.getElementById('depositForm');
    const withdrawForm = document.getElementById('withdrawForm');
    const checkBalanceButton = document.getElementById('checkBalanceButton');

    adminButton.addEventListener('click', showAdminPasswordField);
    userButton.addEventListener('click', showUserLoginPage);
    adminSubmitButton.addEventListener('click', showAdminPage);
    registrationForm.addEventListener('submit', registerUser);
    loginForm.addEventListener('submit', loginUser);
    logoutButton.addEventListener('click', logout);
    depositForm.addEventListener('submit', depositMoney);
    withdrawForm.addEventListener('submit', withdrawMoney);
    checkBalanceButton.addEventListener('click', checkBalance);

    function showAdminPasswordField() {
        document.getElementById('admin-password-field').style.display = 'block';
        document.getElementById('admin-page').style.display = 'none';
        document.getElementById('user-registration').style.display = 'none';
        document.getElementById('user-login').style.display = 'none';
        document.getElementById('user-page').style.display = 'none';
    }

    function showAdminPage() {
        const admpass = document.getElementById('admin-pass').value;
        const correctPassword = "gowtham";

        if (admpass === correctPassword) {
            document.getElementById('admin-page').style.display = 'block';
            document.getElementById('admin-password-field').style.display = 'none';
            document.getElementById('user-registration').style.display = 'none';
            document.getElementById('user-login').style.display = 'none';
            document.getElementById('user-page').style.display = 'none';
            updateUserList();
        } else {
            alert("You cannot access the admin page without the correct password!!");
        }
    }

    function showUserRegistration() {
        document.getElementById('admin-page').style.display = 'none';
        document.getElementById('user-registration').style.display = 'block';
        document.getElementById('user-login').style.display = 'none';
        document.getElementById('user-page').style.display = 'none';
    }

    function showUserLoginPage() {
        document.getElementById('admin-page').style.display = 'none';
        document.getElementById('admin-password-field').style.display = 'none';
        document.getElementById('user-registration').style.display = 'block';
        document.getElementById('user-login').style.display = 'block';
        document.getElementById('user-page').style.display = 'none';
    }

    function registerUser(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userId = 'U' + Date.now();
        users.push({ userId, username, password, balance: 0 });
        if (username === password) {
            alert("Username and password should not be the same!!");
        } else {
            alert('User registered with ID: ' + userId);
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    }

    function loginUser(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        currentUser = users.find(user => user.username === username && user.password === password);
        if (currentUser) {
            document.getElementById('user-login').style.display = 'none';
            document.getElementById('user-page').style.display = 'block';
            updateAccountInfo();
            document.getElementById('login-username').value = '';
            document.getElementById('login-password').value = '';
        } else {
            alert('Invalid username or password');
        }
    }

    function logout() {
        currentUser = null;
        document.getElementById('user-page').style.display = 'none';
        document.getElementById('user-login').style.display = 'block';
    }

    function depositMoney(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('deposit-amount').value);
        if (currentUser && amount > 0) {
            currentUser.balance += amount;
            updateAccountInfo();
            document.getElementById('deposit-amount').value = '';
        }
    }

    function withdrawMoney(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('withdraw-amount').value);
        if (currentUser && amount > 0 && currentUser.balance >= amount) {
            currentUser.balance -= amount;
            updateAccountInfo();
            document.getElementById('withdraw-amount').value = '';
        } else {
            alert('Invalid amount or insufficient balance');
        }
    }

    function checkBalance() {
        if (currentUser) {
            alert(`Your current balance is INR ${currentUser.balance}`);
        }
    }

    function updateUserList() {
        const userList = document.getElementById('user
