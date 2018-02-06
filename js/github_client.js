//define functions here
var createGist = function(fileName, gistContent, gistDescription, token) {
  let apitoken = token;
  let postdata = {
    files: {
      [fileName]: {
        content: gistContent
      }
    },
    description: gistDescription
  };
  console.log(postdata);

  fetch("https://api.github.com/gists", {
    method: "POST",
    body: JSON.stringify(postdata),
    headers: {
      Authorization: `token ${apitoken}`
    }
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

function makeLis(json) {
  let list = document.querySelector("#currentGists");
  json.forEach(function(gist) {
    let gistA = document.createElement("a");
    gistA.setAttribute("href", gist.html_url);
    let text = document.createTextNode(gist.description);
    gistA.appendChild(text);
    let gistLi = document.createElement("li");
    gistLi.appendChild(gistA);
    list.appendChild(gistLi);
  });
}

var myGists = function(username, token) {
  let apitoken = token;

  fetch(`https://api.github.com/users/` + username + `/gists`, {
    headers: { Authorization: `token ${apitoken}` }
  })
    .then(res => res.json())
    .then(json => makeLis(json));
};

var bindCreateButton = function() {
  // call functions here
  const submitButton = document.querySelector("#submit");
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let fileName = document.querySelector("#fileName").value;
    let gistContent = document.querySelector("#gistContent").value;
    let gistDescription = document.querySelector("#gistDescription").value;
    let token = document.querySelector("#userToken").value;
    createGist(fileName, gistContent, gistDescription, token);
    let lis = document.querySelectorAll("li");
    lis.forEach(function(li) {
      document.querySelector("ol").removeChild(li);
    });
    myGists("johneckert", token);
  });
};

$(document).ready(function() {
  const token = "";
  bindCreateButton();

  myGists("johneckert", token);
});
