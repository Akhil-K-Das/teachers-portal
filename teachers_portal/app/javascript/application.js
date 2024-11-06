// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";
import "./students.js";

document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.querySelector(".toggle-password");
  const passwordField = document.querySelector("input[type='password']");

  if (togglePassword && passwordField) {
    togglePassword.addEventListener("click", function () {
      // Toggle the password visibility
      const type =
        passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);

      // Toggle the eye icon (assuming you're using Font Awesome)
      this.classList.toggle("fa-eye-slash");
      this.classList.toggle("fa-eye");
    });
  }
});
