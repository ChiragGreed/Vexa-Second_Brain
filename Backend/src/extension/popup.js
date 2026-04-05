const API = "https://second-brain-td6n.onrender.com/api"

document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token")

    if (token) showSaveView()

    document.getElementById("loginBtn").onclick = loginHandler
    document.getElementById("saveBtn").onclick = saveItemHandler
    document.getElementById("logoutBtn").onclick = logoutHandler

})

async function loginHandler() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    setMsg("message", "", "")

    try {

        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        if (data.token) {
            localStorage.setItem("token", data.token)
            showSaveView()
        } else {
            setMsg("message", data.error || "Login failed", "error")
        }

    } catch (err) {
        setMsg("message", "Cannot reach server", "error")
    }

}

function logoutHandler() {
    localStorage.removeItem("token")
    document.getElementById("authView").style.display = "block"
    document.getElementById("saveView").style.display = "none"
}

async function saveItemHandler() {

    const title             = document.getElementById("title").value.trim()
    const content           = document.getElementById("content").value.trim()
    const url               = document.getElementById("url").value.trim()
    const existingCollection = document.getElementById("existingCollection").value.trim()
    const newCollection     = document.getElementById("newCollection").value.trim()

    if (!title || !content || !url) {
        setMsg("saveMessage", "Title, notes and URL are required", "error")
        return
    }

    if (existingCollection && newCollection) {
        setMsg("saveMessage", "Use only one collection field", "error")
        return
    }

    setMsg("saveMessage", "Saving...", "")

    try {

        const res = await fetch(`${API}/items/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title,
                content,
                url,
                existingCollection: existingCollection || undefined,
                newCollection:      newCollection      || undefined
            })
        })

        const data = await res.json()

        if (data.success) {
            setMsg("saveMessage", "Saved to Vexa ✓", "success")
            clearForm()
        } else {
            setMsg("saveMessage", data.error || "Save failed", "error")
        }

    } catch (err) {
        setMsg("saveMessage", "Cannot reach server", "error")
    }

}

function showSaveView() {
    document.getElementById("authView").style.display = "none"
    document.getElementById("saveView").style.display = "block"
    autofillURL()
}

function autofillURL() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            document.getElementById("url").value = tabs[0].url
        }
    })
}

function clearForm() {
    document.getElementById("title").value              = ""
    document.getElementById("content").value            = ""
    document.getElementById("url").value                = ""
    document.getElementById("existingCollection").value = ""
    document.getElementById("newCollection").value      = ""
}

function setMsg(id, text, type) {
    const el = document.getElementById(id)
    el.textContent = text
    el.className   = "msg" + (type ? " " + type : "")
}