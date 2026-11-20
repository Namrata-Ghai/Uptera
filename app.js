// Uptera Core Application Logic (Instant Transition Fix)

// Handle Login & Role Selection
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stops the page from refreshing
    
    // Grab input values
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const society = document.getElementById('userSociety').value;
    const role = document.getElementById('userRole').value;

    if (!name || !email) {
        alert('Please fill in your details!');
        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone,
        society: society,
        role: role,
        tokens: 150,
        carbonSaved: 12.4
    };
    
    // Save to browser memory
    localStorage.setItem('uptera_user_session', JSON.stringify(user));
    
    // Instantly trigger dashboard view
    initializeUserDashboard(user);
});

// Check Session on Load
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('uptera_user_session');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        initializeUserDashboard(user);
    }
});

function initializeUserDashboard(user) {
    document.getElementById('loginScreen').classList.add('hide');
    document.getElementById('appInterface').classList.remove('hide');

    // Dynamic Time-based Greeting
    const hour = new Date().getHours();
    let greeting = "Good Morning";
    if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    else if (hour >= 17) greeting = "Good Evening";

    document.getElementById('greetingText').innerText = `${greeting}, ${user.name.split(' ')[0]}`;
    document.getElementById('headerSociety').innerText = user.society;
    document.getElementById('profileName').innerText = user.name;
    document.getElementById('profileRoleEmail').innerText = `${user.role} • ${user.email}`;
    document.getElementById('profileAvatar').innerText = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    document.getElementById('tokenCount').innerText = `${user.tokens} 🪙`;
    document.getElementById('carbonCount').innerText = `${user.carbonSaved} kg 🌿`;
}

function logout() {
    localStorage.removeItem('uptera_user_session');
    document.getElementById('appInterface').classList.add('hide');
    document.getElementById('loginScreen').classList.remove('hide');
    document.getElementById('loginForm').reset();
}

// Tab Switching Navigation
function switchTab(tab) {
    const tabDashboard = document.getElementById('tabDashboard');
    const tabScan = document.getElementById('tabScan');
    const tabProfile = document.getElementById('tabProfile');

    tabDashboard.classList.add('hide');
    tabScan.classList.add('hide');
    tabProfile.classList.add('hide');

    const inactiveClass = "flex flex-col items-center text-slate-500 text-xs font-medium transition hover:text-emerald-400";
    const activeClass = "flex flex-col items-center text-emerald-400 text-xs font-semibold scale-105 transition";

    document.getElementById('navDashboard').className = inactiveClass;
    document.getElementById('navScan').className = inactiveClass;
    document.getElementById('navProfile').className = inactiveClass;

    if (tab === 'dashboard') {
        tabDashboard.classList.remove('hide');
        document.getElementById('navDashboard').className = activeClass;
    } else if (tab === 'scan') {
        tabScan.classList.remove('hide');
        document.getElementById('navScan').className = activeClass;
    } else if (tab === 'profile') {
        tabProfile.classList.remove('hide');
        document.getElementById('navProfile').className = activeClass;
    }
}

function submitDonation() {
    alert('Donation listing published successfully! +50 Uptera Tokens added to your wallet.');
    switchTab('dashboard');
}