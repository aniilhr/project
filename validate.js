
        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('login-form');
            const usernameField = document.getElementById('username');
            const emailField = document.getElementById('email');
            const passwordField = document.getElementById('password');

            // Redirect if already logged in
            if (localStorage.getItem('authToken')) {
                window.location.href = '/home';
            }

            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Validation
                let isValid = true;
                const username = usernameField.value;
                const email = emailField.value;
                const password = passwordField.value;

                // Username validation
                if (username !== 'emilys') {
                    isValid = false;
                    document.getElementById('username-error').textContent = 'Username must be "emilys"';
                } else {
                    document.getElementById('username-error').textContent = '';
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    isValid = false;
                    document.getElementById('email-error').textContent = 'Invalid email format';
                } else {
                    document.getElementById('email-error').textContent = '';
                }

                // Password validation
                if (password.length < 8) {
                    isValid = false;
                    document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
                } else {
                    document.getElementById('password-error').textContent = '';
                }

                if (!isValid) return;

                // API Integration
                try {
                    const response = await fetch('https://dummyjson.com/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username,
                            email,
                            password
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('authToken', data.token);
                        window.location.href = '/home';
                    } else {
                        alert('Invalid credentials');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
