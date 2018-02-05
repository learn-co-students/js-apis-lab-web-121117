$(document).ready(function(){
//define functions here


var createGist = function(file_name, content, description, token){
  var postData = {
    "description": description,
    "public": true,
    "files": {
      file_name: {
        "content": content
      }
    }
  }
  var data = fetch('https://api.github.com/gists', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: 'token '+token
    }
  })
};

var myGists = function (username, token){
  var data = fetch('https://api.github.com/users/'+username+'/gists', {
    headers: {
      Authorization: 'token '+token
    }
  })
  .then( res => res.json().then ( data =>  {
    for (let i = 0; i < data.length; i++) {
      $('#gist-list-ul').append(`<a href="${data[i].html_url}"><li>${data[i].description}</li></a>`)
    }
  }) )
};

// var gistReturn = myGist()
// var desc = gistReturn.description
// var url = gistReturn.url
// var username = gistReturn.owner.login
// var file_name = gistReturn.files.file_name.filename
//
// $('#gist_username').append(username)

var bindGetButton = function() {
  $('#btn-get-gist').on('click', function(e){
    e.preventDefault()
    myGists('olegchursin', '081eca4af1883422487309fe86a58cf61f4533a7')
  })
}

var bindCreateButton = function() {
  // call functions here
  console.log("pre click")
  $('#btn-create-gist').on('click', function(event) {
    event.preventDefault()
    var file_name = $('#file-name').val();
    var content = $('#content').val();
    var description = $('#desc').val();
    var token = $('#token').val();
    var username = $('#username').val();
    console.log("in button", file_name, content)
    createGist(file_name, content, description, token);
    // debugger
    myGists(username, token)
  })
};

bindCreateButton()
bindGetButton()

});
