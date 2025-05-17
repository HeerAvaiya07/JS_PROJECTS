document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const newUser = {
            id: Date.now(),
            email,
            password,
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        form.reset();

        console.log("Saved users:", users);
        alert("User data saved successfully!");
    });
});
