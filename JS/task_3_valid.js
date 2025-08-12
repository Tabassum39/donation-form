document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jobApplication');
  const ids = ['name', 'email', 'phone', 'password', 'experience', 'amount'];

  // Attach focus + real-time validation
  ids.forEach(id => {
    const el = document.getElementById(id);
    const eventType = (el.tagName.toLowerCase() === 'select') ? 'change' : 'input';

    el.addEventListener('focus', () => el.classList.add('focused'));
    el.addEventListener('blur', () => el.classList.remove('focused'));
    el.addEventListener(eventType, () => validate(el));
  });

  // Phone: only digits and max length 11
  const phone = document.getElementById('phone');
  phone.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
  });

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }

  function validate(el) {
    const { id, value } = el;
    let ok = true;

    switch (id) {
      case 'name':
        ok = /^[A-Za-z\s]{3,}$/.test(value.trim());
        break;
      case 'email':
        ok = isEmail(value);
        break;
      case 'phone':
        ok = /^\d{11}$/.test(value);
        break;
      case 'password':
        ok = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        break;
      case 'experience':
        ok = !!value;
        break;
      case 'amount':
        ok = Number(value) > 0;
        break;
      default:
        ok = value.trim() !== '';
    }

    el.classList.toggle('valid', ok);
    el.classList.toggle('invalid', !ok);
    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    ids.forEach(id => validate(document.getElementById(id)));

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const experience = document.getElementById('experience');
    const amount = document.getElementById('amount');
    const terms = document.getElementById('terms');

    const errors = [];
    if (!/^[A-Za-z\s]{3,}$/.test(name.value.trim())) {
      errors.push('• Name must be at least 3 characters (letters only).');
    }
    if (!isEmail(email.value)) {
      errors.push('• Email must be a valid email format.');
    }
    if (!/^\d{11}$/.test(phone.value)) {
      errors.push('• Phone must be exactly 11 digits.');
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.value)) {
      errors.push('• Password must be at least 8 characters and include uppercase, lowercase, and a digit.');
    }
    if (!experience.value) {
      errors.push('• Please select an experience level.');
    }
    if (!(Number(amount.value) > 0)) {
      errors.push('• Expected salary must be a positive number.');
    }
    if (!terms.checked) {
      errors.push('• You must agree to the Terms & Conditions.');
    }

    if (errors.length) {
      alert('Please fix the following:\n\n' + errors.join('\n'));
      return;
    }

    alert('Application submitted successfully!');
    form.reset();
    document.querySelectorAll('input, select').forEach(el => {
      el.classList.remove('valid', 'invalid', 'focused');
    });
  });
});
