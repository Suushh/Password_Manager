const username = document.getElementById("username");
const password = document.getElementById("password");
const website = document.getElementById("website");

const deletepswd = (websiteToDelete) => {
    let data = localStorage.getItem("passwords");
    if (data) {
        let arr = JSON.parse(data);
        let arrUpdated = arr.filter((e) => {
            return e.website !== websiteToDelete;
        });
        localStorage.setItem("passwords", JSON.stringify(arrUpdated));
        alert(`Deleted ${websiteToDelete}'s password`);
        showPswd(); // Refresh the table to show updated data
    }
};

const showPswd = () => {
    let tb = document.querySelector("table tbody");
    let data = localStorage.getItem("passwords");
    if (data == null || data === "[]") {
        tb.innerHTML = "<tr><td colspan='4'>No Data to show</td></tr>";
    } else {
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            let maskedPassword = "*".repeat(element.password.length);
            str += `<tr>
                        <td>${element.website}</td>
                        <td>${element.username}</td>
                        <td>
                            <span class="password" data-password="${element.password}">${maskedPassword}</span>
                            <button class="copy-btn" onclick="copyPassword('${element.password}')">Copy</button>
                            <button class="show-btn" onclick="togglePassword(this)">Show</button>
                        </td>
                        <td><button class="btn" onclick="deletepswd('${element.website}')">Delete</button></td>
                    </tr>`;
        }
        tb.innerHTML = str;
    }
};

const copyPassword = (password) => {
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
};

const togglePassword = (btn) => {
    const span = btn.previousElementSibling.previousElementSibling;
    if (span.textContent === span.dataset.password) {
        span.textContent = "*".repeat(span.dataset.password.length);
        btn.textContent = "Show";
    } else {
        span.textContent = span.dataset.password;
        btn.textContent = "Hide";
    }
};

document.querySelector("#Submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    if (website.value === "" || username.value === "" || password.value === "") {
        alert("Please fill in all the details.");
        return;
    }
    
    console.log("clicked");
    console.log(username.value, password.value);
    
    let passwords = localStorage.getItem("passwords");
    if (passwords == null) {
        let json = [];
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(localStorage.getItem("passwords"));
        if (!Array.isArray(json)) {
            json = [];
        }
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("Password saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPswd();
});

showPswd();




