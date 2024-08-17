let users = [];
let currentUser = null;

function showAdminPage() {
    document.getElementById('admin-page').style.display = 'block';
    document.getElementById('user-registration').style.display = 'none';
    document.getElementById('user-login').style.display = 'none';
    document.getElementById('user-page').style.display = 'none';
    updateUserList();
}

function showUserRegistration() {
    document.getElementById('admin-page').style.display = 'none';
    document.getElementById('user-registration').style.display = 'block';
    document.getElementById('user-login').style.display = 'none';
    document.getElementById('user-page').style.display = 'none';
}

function showUserLoginPage() {
    document.getElementById('admin-page').style.display = 'none';
    document.getElementById('user-registration').style.display = 'none';
    document.getElementById('user-login').style.display = 'block';
    document.getElementById('user-page').style.display = 'none';
    document.getElementById('usr').style.display = 'block';
  
}

function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userId = 'U' + Date.now();
    users.push({ userId, username, password, balance: 0 });
    alert('User registered with ID: ' + userId);
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
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
const password = document.getElementById('login-password').value;
    const userList = document.getElementById('user-list');
    userList.innerHTML = '<h3>Registered Users</h3>';
    users.forEach(user => {
        userList.innerHTML += `<p>ID: ${user.userId}, Username: ${user.username}, Balance: INR ${user.balance}, Password:${user.password}</p>`;
    });
}

function updateAccountInfo() {
    document.getElementById('account-info').textContent = `User ID: ${currentUser.userId}, Balance: INR ${currentUser.balance}`;
}
function pwd()
{
    document.getElementById("adm-pass").style.display="block";
    document.getElementById("pwd-btn").style.display="block";

}
function pwdcheck()
{
    var admpass=document.getElementById("adm-pass").value
    var correctpass="gowtham"
    if(admpass==correctpass)
    {
        showAdminPage()
    }
    else
    {
        alert("Enter the correct admin password!!")
        document.getElementById
    }
}