async function checkForNewPost() {
try {
const res = await fetch("https://your-backend.onrender.com/api/latest-post");
const post = await res.json();


if (!post) return;


const popup = document.createElement("div");
popup.style.position = "fixed";
popup.style.bottom = "20px";
popup.style.left = "20px";
popup.style.background = "#222";
popup.style.color = "#fff";
popup.style.padding = "15px";
popup.style.borderRadius = "10px";
popup.style.cursor = "pointer";


popup.innerHTML = `
<strong>New ${post.platform} Post!</strong><br>
<button id="readMore">Read More</button>
`;


popup.querySelector("#readMore").onclick = (e) => {
e.stopPropagation();
window.open(post.post_url, "_blank");
};


popup.onclick = () => {
window.location.href = "/blogs";
};


document.body.appendChild(popup);
} catch (err) {
console.error(err);
}
}


window.addEventListener("load", checkForNewPost);