const TOKEN = '846ec6ed43b704c592dee6439c76f338230c1baa'

var createGist = function(file_name, content, description, token){
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify({
      "description": description,
      "public": true,
      "files": {
        [file_name]:{
          "content": content
        }
      }
    })
  }).done(function(data){
    myGists('julientregoat', token)
  })
};

var myGists = function (username, token){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    }
  }).done(function(data){
    for (ele of data){
      var description = ele.description
      var link = ele.url
      var newEle = document.createElement('li')
      newEle.innerHTML = `<b>${description}</b> <a href='${link}'>View Gist</a>`
      document.getElementById('gists-results').appendChild(newEle)
    }
  })
};

var bindCreateButton = function() {
  $('#gists-request').on('click', (e) => {
    createGist($('#file_name').val(), $('#description').val(), $('#contents').val(), TOKEN)
  })
};

$(document).ready(function(){
  bindCreateButton()
});
