const API = "https://second-brain-td6n.onrender.com/api"

document.addEventListener("DOMContentLoaded", () => {

    const token =
        localStorage.getItem("token")


    if (token)
        showSaveView()

    document
        .getElementById("loginBtn")
        .onclick = async () => { loginHandler() }

    document
        .getElementById("saveBtn")
        .onclick = async () => { saveItemHandler() }

    document
        .getElementById("logoutBtn")
        .onclick = logoutHandler

})

// LOGIN

async function loginHandler() {
    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    console.log("hey");

    try {

        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                username, password
            })

        }

        )


        const data = await res.json()


        if (data.token) {

            localStorage.setItem(

                "token",
                data.token

            )

            showSaveView()

        }

        else {

            document.getElementById("message").innerText = data.error || "Login failed"

        }

    }

    catch (err) {

        document
            .getElementById("message").innerText = err

    }

}

function logoutHandler() {

    localStorage.removeItem("token")

    document
        .getElementById("authView")
        .style.display =
        "block"


    document
        .getElementById("saveView")
        .style.display =
        "none"

}


async function saveItemHandler() {
    const title =
        document
            .getElementById("title")
            .value

    const content =
        document
            .getElementById("content")
            .value

    const url =
        document
            .getElementById("url")
            .value


    try {

        const res =
            await fetch(

                `${API}/items/save`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:

                            `Bearer ${localStorage
                                .getItem("token")
                            }`

                    },

                    body:
                        JSON.stringify({

                            title,
                            content,
                            url

                        })

                }

            )


        const data =
            await res.json()


        document
            .getElementById("saveMessage")
            .innerText =
            data.message
            || data.error


        clearForm()

    }

    catch (err) {

        document
            .getElementById("saveMessage")
            .innerText =
            "Error saving item"

    }

}



function showSaveView() {

    document
        .getElementById("authView")
        .style.display =
        "none"


    document
        .getElementById("saveView")
        .style.display =
        "block"


    autofillURL()

}



function autofillURL() {

    chrome.tabs.query(

        {

            active: true,
            currentWindow: true

        },

        (tabs) => {

            if (tabs[0]) {

                document
                    .getElementById("url")
                    .value =
                    tabs[0].url

            }

        }

    )

}



function clearForm() {

    document
        .getElementById("title")
        .value = ""

    document
        .getElementById("content")
        .value = ""

}