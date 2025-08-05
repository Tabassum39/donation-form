document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('donationForm');
  const fields = ['name', 'email', 'phone', 'password', 'amount'];

  fields.forEach(fieldId => {
    const input = document.getElementById(fieldId);

    input.addEventListener('focus', () => {
      input.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.classList.remove('focused');
    });

    input.addEventListener('input', () => {
      validateField(input);
    });
  });

  function validateField(input) {
    const id = input.id;
    let valid = true;

    switch(id) {
      case 'name':
        valid = input.value.trim().length >= 3;
        break;
      case 'phone':
        valid = /^[0-9]{11}$/.test(input.value);
        break;
      case 'password':
        valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/.test(input.value);
        break;
      default:
        valid = input.value.trim() !== '';
    }

    input.classList.toggle('valid', valid);
    input.classList.toggle('invalid', !valid);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const amount = document.getElementById('amount');
    const terms = document.getElementById('terms');

    if (name.value.trim().length < 3) {
      alert('Name must be at least 3 characters.');
      valid = false;
    }

    if (!/^[0-9]{11}$/.test(phone.value)) {
      alert('Phone number must be exactly 11 digits.');
      valid = false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/.test(password.value)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, and one digit.');
      valid = false;
    }

    if (!terms.checked) {
      alert('You must agree to the Terms & Conditions.');
      valid = false;
    }

    if (valid) {
      alert('Form submitted successfully!');
      form.reset();
      document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
    }
  });
});
