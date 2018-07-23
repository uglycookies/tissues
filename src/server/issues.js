 // TODO:
 // invalid input handling!!!
 // add 'close' button
 // expand description text box
 // add placeholders
 // fix styling

const button = document.createElement('button');
button.innerHTML = 'Report Issue';
document.body.appendChild(button);

button.addEventListener('click', showForm);

const popup_container = document.createElement('div');

const popup = document.createElement('div');
popup.setAttribute('id', 'popup');
popup_container.appendChild(popup);

const header_container = document.createElement('div');
header_container.setAttribute('id', 'header_container');

const bug_text_container = document.createElement('div');
const bug_text = document.createElement('h1');
bug_text.innerHTML = 'See a Bug?';
bug_text_container.appendChild(bug_text);

const bug_image_container = document.createElement('div');
const bug_image = document.createElement('img');
bug_image.setAttribute('id', 'bug_image');
bug_image.setAttribute('src', 'https://i.imgur.com/FOIoojF.png');
bug_image_container.appendChild(bug_image);

const form = document.createElement('form');
form.setAttribute('id', 'form');
form.setAttribute('method', 'post');
form.setAttribute('enctype', 'multipart/form data');
form.setAttribute('action', 'http://localhost:8080/api/issues');
form.appendChild(header_container);
header_container.appendChild(bug_text_container);
header_container.appendChild(bug_image_container);

const bug_type = document.createElement('h3');
bug_type.innerHTML = 'Issue Type';

const select = document.createElement('select'); // dropdown
select.setAttribute('id', 'issue_type');
select.setAttribute('name', 'issue_type');
select.setAttribute('class', 'inputs');

const description = document.createElement('h3');
description.innerHTML = 'Description';

const description_details = document.createElement('textarea');
description_details.setAttribute('id', 'description');
description_details.setAttribute('name', 'description');
description_details.setAttribute('class', 'inputs');

const email = document.createElement('h3');
email.innerHTML = 'Email';

const user_email = document.createElement('input');
user_email.setAttribute('id', 'user_email');
user_email.setAttribute('name', 'user_email');
user_email.setAttribute('type', 'text');
user_email.setAttribute('class', 'inputs');

const submit = document.createElement('input'); //submit button
submit.setAttribute('id', 'submit_btn');
submit.setAttribute('type', 'submit');
submit.setAttribute('value', 'Report Bug');
submit.addEventListener('click', function() {
  if (document.getElementById('issue_type').value == "Select type of issue" || document.getElementById('description').value == "") {
    document.getElementById('popup').style.display = "none";
    alert("Please enter bug type and description");

  } else {
  document.getElementById('form').submit();
    alert("But reported successfully!");
  }
})

const container1 = document.createElement('div');
container1.setAttribute('class', 'input_field');
container1.appendChild(bug_type);
container1.appendChild(select);
form.appendChild(container1);

const container2 = document.createElement('div');
container2.setAttribute('class', 'input_field');
container2.appendChild(description);
container2.appendChild(description_details);
form.appendChild(container2);

const container3 = document.createElement('div');
container3.setAttribute('class', 'input_field');
container3.appendChild(email);
container3.appendChild(user_email);
form.appendChild(container3);
form.appendChild(submit);

function showForm() {

  document.getElementsByTagName('body')[0].appendChild(popup_container);
  document.getElementById('popup').appendChild(form);
  // document.getElementById('popup').appendChild(form);
  // document.getElementById('popup').style.display = "block";

  const bug_types = ['Select type of issue','Visual', 'Functional', 'Technical', 'Content', 'Performance'];

  for(let i = 0; i < bug_types.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', bug_types[i]);
    option.innerHTML =  bug_types[i];
    document.getElementById('issue_type').appendChild(option);
  }
}
