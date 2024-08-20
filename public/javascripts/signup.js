const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the eye icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
document.addEventListener('DOMContentLoaded', function() {
    var picker = new Pikaday({
      field: document.getElementById('dateInput'),
      format: 'DD/MM/YYYY'
    });
  
    document.querySelector('.calendar-icon').addEventListener('click', function() {
      picker.show();
    });
  });