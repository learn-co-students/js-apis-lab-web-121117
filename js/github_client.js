TOKEN = "451370662dfff548c567bbe6505da5fe2a4bd59b";

//define functions here
var createGist = function(file_name, content, description, token) {
  var data = {
    description: description,
    public: true,
    files: {
      [file_name]: {
        content: content
      }
    }
  };
  fetch("https://api.github.com/gists", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: "token " + token
    }
  })
    .then(res => res.json())
    .then(json => console.log(json));
};

var myGists = function(username, token) {
  fetch("https://api.github.com/users/" + username + "/gists", {
    headers: {
      Authorization: "token " + token
    }
  })
    .then(res => res.json())
    .then(json => showGist(json));
};

var bindCreateButton = function() {
  var formData = document.getElementById("form");
  formData.addEventListener("submit", function(event) {
    event.preventDefault();
    var fileName = formData.elements[0].value;
    var content = formData.elements[1].value;
    var description = formData.elements[2].value;
    createGist(fileName, content, description, TOKEN);
  });
};

var showGist = function(json) {
  json.forEach(gist => {
    liItem = document.createElement("li");
    text = document.createTextNode(gist.url);
    liItem.append(text);
    document.getElementById("gists").append(liItem);
  });
};

$(document).ready(function() {
  myGists("k1k1272", TOKEN);
  bindCreateButton();
});
