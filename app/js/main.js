"use strict";

var contact_form = document.querySelector('.contact__form');
var circle_group_first = document.querySelector('.circle__group-first');
var circle_group_second = document.querySelector('.circle__group-second');
var notification_button = document.querySelector('.notification__button');
notification_button.addEventListener('click', startForm);
contact_form.addEventListener('submit', contactFormSend);
var contact_form_inputs = contact_form.querySelectorAll('.form__input-required');
contact_form_inputs.forEach(function (input_form) {
  input_form.addEventListener('change', fieldValidate);
  input_form.addEventListener('keydown', fieldValidate);
  input_form.addEventListener('keyup', fieldValidate);
});

function startForm(event) {
  circle_group_second.classList.add('hidden-elements');
  contact_form.classList.remove('hidden-elements');
  circle_group_first.classList.remove('hidden-elements');
}

function contactFormSend(event) {
  event.preventDefault();
  var error = formValidate(contact_form);

  if (error === 0) {
    contact_form.reset();
    contact_form.querySelectorAll('.form__input-required').forEach(function (input) {
      return input.classList.remove('field__input-valid');
    });
    circle_group_first.classList.add('hidden-elements');
    contact_form.classList.add('hidden-elements');
    circle_group_second.classList.remove('hidden-elements');
  }
}

function fieldValidate(event) {
  var input = event.currentTarget;
  console.log(input, '4');
  var userNameTest = /^[a-zA-Z0-9_-]{3,16}$/;
  var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  var questionTest = /^[a-zA-Z0-9_-\s!$()*+.,<>?[\]^{|}]{7,200}$/;
  formRemoveError(input);

  if (input.type === 'text') {
    if (!input.value.match(userNameTest)) {
      if (input.closest('.contact-form__field').querySelector('.form__input-message')) {
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }

      formAddError(input);
      var error = "<div class=\"form__input-message\"><div class=\"form__input-info\">Please input your email address in correct format.</div><div class=\"form__input-triangle01\"></div></div>";
      input.insertAdjacentHTML('afterend', error);
    } else {
      formRemoveError(input);

      if (input.closest('.contact-form__field').querySelector('.form__input-message')) {
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
    }
  } else if (input.type === 'email') {
    if (!input.value.match(emailTest)) {
      if (input.closest('.contact-form__field').querySelector('.form__input-message')) {
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }

      formAddError(input);
      var _error = "<div class=\"form__input-message\"><div class=\"form__input-info\">Please input your email address in correct format. Use @ symbol in address.</div><div class=\"form__input-triangle01\"></div></div>";
      input.insertAdjacentHTML('afterend', _error);
    } else {
      formRemoveError(input);

      if (input.closest('.contact-form__field').querySelector('.form__input-message')) {
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
    }
  } else if (input.type === 'textarea') {
    if (!input.value.match(questionTest)) {
      if (input.closest('.contact-form__field').querySelector('.form__input-message')) {
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }

      formAddError(input);
      var _error2 = "<div class=\"form__input-message\"><div class=\"form__input-info\">Please input your question in correct format.</div><div class=\"form__input-triangle01\"></div><div class=\"form__input-triangle01\"></div></div>";
      input.insertAdjacentHTML('afterend', _error2);
    } else {
      formRemoveError(input);

      if (input.closest('.contact-form__field').querySelector('.form__input-message')) {
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
    }
  } else if (input.type === 'checkbox' && input.checked === false) {
    if (!input.checked) {
      formAddError(input);
    } else {
      console.log('NO!');
      formRemoveError(input);
    }
  }
}

function formValidate(form) {
  var error = 0;
  var formFields = form.querySelectorAll('.form__input-required');
  console.log(formFields, '5');
  formFields.forEach(function (input) {
    if (input.classList.contains('field__input-invalid') || input.value === '') {
      error++;
    }
  });
  return error;
}

function formAddError(input) {
  input.classList.remove('field__input-valid');
  input.classList.add('field__input-invalid');
}

function formRemoveError(input) {
  input.classList.remove('field__input-invalid');
  input.classList.add('field__input-valid');
}
//# sourceMappingURL=main.js.map
