/* eslint-disable camelcase */
const password = document.getElementById('pass');
const confirm_Password = document.getElementById('pass_rep');

function validatePassword() {
  if (password.value !== confirm_Password.value) {
    confirm_Password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_Password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_Password.onkeyup = validatePassword;
