function showForm() {
    var x = document.getElementById("contact_form");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("showform");
    button.addEventListener("click", showForm);
});