const contact_form = document.querySelector('.contact__form');
const circle_group_first = document.querySelector('.circle__group-first');
const circle_group_second = document.querySelector('.circle__group-second');
const notification_button = document.querySelector('.notification__button');
const contact_form_button = document.querySelector('.contact-form__button');
const form_checkbox_input = document.querySelector('.form-checkbox__input');
const circle_fifth = document.querySelector('.circle-fifth');
const notification = document.querySelector('.notification');
const site_container_content = document.querySelector('.site-container__content');
const field_inputs = document.querySelectorAll('.field__input');
const field_labels = document.querySelectorAll('.field__label');

field_inputs.forEach(field_input => {
  field_input.addEventListener('click', labelHidden);

  function labelHidden () {
    field_input.closest('.contact-form__field').querySelector('.field__label').classList.add('field__label--mobile');
  }
})

const contact_form_inputs = contact_form.querySelectorAll('.form__input-required');

contact_form_inputs.forEach(input_form => {
  input_form.addEventListener('change', fieldValidate);
  input_form.addEventListener('keydown', fieldValidate);
  input_form.addEventListener('keyup', fieldValidate);
})

const icon_errors = document.querySelectorAll('.field__input-icon--error').forEach(icon_error => {
  icon_error.addEventListener('mouseover', function(e){
    const input_message = icon_error.closest('.contact-form__field').querySelector('.form__input-message');
    input_message.classList.add('form__input-message--active');
  })

  icon_error.addEventListener('mouseout', function(e){
    const input_message = icon_error.closest('.contact-form__field').querySelector('.form__input-message');
    input_message.classList.remove('form__input-message--active');
  })
});

notification_button.addEventListener('click', startForm);

contact_form.addEventListener('submit', contactFormSend);

contact_form.addEventListener('change', contactFormBtn);
contact_form.addEventListener('keyup', contactFormBtn);

function startForm (event) {
  circle_fifth.classList.add('circle-fifth--active');
  setTimeout(() => {
    notification.classList.add('hidden-elements');
    circle_group_second.classList.add('hidden-elements');

    contact_form.classList.remove('hidden-elements');
    circle_group_first.classList.remove('hidden-elements');
    site_container_content.classList.remove('site-container__content--second');
  }, 1500)
}

function contactFormBtn(event) {
  event.preventDefault();

  let error = formValidate(contact_form);

  if(error === 0) {
    contact_form_button.classList.add('contact-form__button--active');
  } else {
    contact_form_button.classList.remove('contact-form__button--active');
  }
}

function contactFormSend(event) {
  event.preventDefault();

  let error = formValidate(contact_form);

  if (error === 0) {
    contact_form.reset();
    contact_form.querySelectorAll('.form__input-required').forEach(input => input.classList.remove('field__input-valid'));
    form_checkbox_input.classList.add('field__input-invalid');
    circle_group_first.classList.add('hidden-elements');
    contact_form.classList.add('hidden-elements');
    field_labels.forEach(field_label => field_label.classList.remove('field__label--mobile'));
    circle_fifth.classList.remove('circle-fifth--active');
    notification.classList.remove('hidden-elements');
    circle_group_second.classList.remove('hidden-elements');
    contact_form_button.classList.remove('contact-form__button--active');
    site_container_content.classList.add('site-container__content--second');
  }
}

function fieldValidate (event){
  const input = event.currentTarget;

  const userNameTest = /^[a-zA-Z??-????-??0-9_-]{3,20}$/;
  const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  const questionTest = /^[a-zA-Z??-????-??0-9_-\s@&%#"'=!$()*+.,<>?[\]^{|}]{5,200}$/;

  formRemoveError(input);

  if (input.type === 'text') {
    if (!input.value.match(userNameTest)){
      if(input.closest('.contact-form__field').querySelector('.form__input-message')){
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
      formAddError(input);
      const error = `<div class="form__input-message"><div class="form__input-info">Please input your name in correct format. Use from 3 to 20 characters.</div><div class="form__input-triangle01"></div></div>`;
      input.insertAdjacentHTML('afterend', error);
    } else {
      formRemoveError(input);
      if(input.closest('.contact-form__field').querySelector('.form__input-message')){
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
    }
  }

  else if (input.type === 'email') {
    if (!input.value.match(emailTest)){
      if(input.closest('.contact-form__field').querySelector('.form__input-message')){
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
      formAddError(input);
      var error01 = `<div class="form__input-message"><div class="form__input-info">Please input your email address in correct format. Use @ symbol in address.</div><div class="form__input-triangle01"></div></div>`;
      var error02 = `<div class="form__input-message"><div class="form__input-info">Please input your email address in correct format.</div><div class="form__input-triangle01"></div></div>`;
      if(!input.value.includes('@')){
        input.insertAdjacentHTML('afterend', error01);
      } else {
        input.insertAdjacentHTML('afterend', error02);
      }
    } else {
      formRemoveError(input);
      if(input.closest('.contact-form__field').querySelector('.form__input-message')){
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
    }
  }

  else if (input.type === 'textarea') {
    if (!input.value.match(questionTest)){
      if(input.closest('.contact-form__field').querySelector('.form__input-message')){
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
      formAddError(input);
      const error = `<div class="form__input-message"><div class="form__input-info">Please input your question in correct format. Use from 5 to 200 characters.</div><div class="form__input-triangle01"></div><div class="form__input-triangle01"></div></div>`;
      input.insertAdjacentHTML('afterend', error);
    } else {
      formRemoveError(input);
      if(input.closest('.contact-form__field').querySelector('.form__input-message')){
        input.closest('.contact-form__field').removeChild(input.nextSibling);
      }
    }
  }

  else if (input.type === 'checkbox' && input.checked === false) {
    if (!input.checked){
      formAddError(input);
    } else {
      formRemoveError(input);
    }
  }
}

function formValidate(form) {
  let error = 0;
  let formFields = form.querySelectorAll('.form__input-required');

  formFields.forEach(input => {
    if (input.classList.contains('field__input-invalid') || input.value === '') {
      error++;
    }
  })

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
