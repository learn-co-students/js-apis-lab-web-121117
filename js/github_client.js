$(document).ready(function(){
});


  var toKen = '';
  var uName = 'djovercash';


  //define functions here
  var createGist = function(file_name, content, description, token){
    $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: 'token ' + token
      },
      data: JSON.stringify({
        "description": description,
        "public": true,
        "files": {
          [file_name]: {
          "content": content
          }
        }
      })
    }).then(function(res){
      setTimeout(myGists(res.owner.login, token), 1000);
    })
  };

  var submit = document.getElementById('submitGist');
  submit.addEventListener('click', getValues);

  function getValues(event) {
    event.preventDefault();
    var fileNameInput = document.getElementsByTagName('input')[0];
    var fileDescriptionInput = document.getElementsByTagName('input')[1];
    var fileContentInput = document.getElementsByTagName('input')[2];
    var fileTokenInput = document.getElementsByTagName('input')[3];
    var file_name = fileNameInput.value;
    var description = fileDescriptionInput.value;
    var content = fileDescriptionInput.value;
    var token = fileTokenInput.value;
    createGist(file_name, content, description, token);
    fileNameInput.value = "";
    fileDescriptionInput.value = "";
    fileContentInput.value = "";
    fileTokenInput.value = "";
  }

  var myGists = function (username, token){
    $.ajax({
      url: 'https://api.github.com/users/' + username + '/gists',
      type: 'GET',
      dataType: 'json',
      headers: {
        Authorization: 'token ' + token
      }
    }).then(function(res){
       showGists(res)})
  };

  var bindCreateButton = function() {
    // call functions here

  };

  var showGists = function(res) {
    console.log("about to show")
    var ul = document.getElementById('userGists')
    ul.innerHTML = "";
    res.forEach(function(r) {
      var fileName = Object.keys(r.files)[0];
      var fileTitle = String(fileName);
      var fileDescription = r.description;
      var files = Object.values(r.files)[0];
      var fileURL = files.raw_url;
      var liTitle = document.createElement('li')
      liTitle.innerHTML = fileTitle;
      var liDescription = document.createElement('li')
      liDescription.innerHTML = fileDescription;
      var liComments = document.createElement('li')
      liComments.innerHTML = fileURL
      var ul2 = document.createElement('ul')
      ul2.append(liDescription);
      ul2.append(liComments);
      liTitle.append(ul2);
      ul.append(liTitle);
    })
  };

myGists(uName, toKen);
