// Invoke ready and pass in a callback function
ready(function () {
  console.log("Client script loaded.");

  function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    console.log("xhr", xhr);
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //console.log('responseText:' + xhr.responseText);
        callback(this.responseText);
      } else {
        console.log(this.status);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }

  // Creating JSON table to fetch drinks.js
  const jsonBtn = document.getElementById("json-btn");
  const jsonTable = document.getElementById("json-table");

  jsonBtn.addEventListener("click", displayJsonTable);

  function displayJsonTable() {
    jsonBtn.style.display = "none";
    fetch("/drinks?format=json")
      .then((response) => response.json())
      .then((data) => {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        const th4 = document.createElement("th");
        const th5 = document.createElement("th");

        th1.textContent = "Title";
        th2.textContent = "Description";
        th3.textContent = "Prep Time";
        th4.textContent = "Source";
        th5.textContent = "Link";

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);

        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);

        data.forEach((item) => {
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          const td2 = document.createElement("td");
          const td3 = document.createElement("td");
          const td4 = document.createElement("td");
          const td5 = document.createElement("td");

          td1.textContent = item.title;
          td2.textContent = item.description;
          td3.innerHTML = item["prep time"];
          td4.textContent = item.source;
          td5.innerHTML = `<a href="${item.link}" target="_blank">View Recipe</a>`;

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);

          tbody.appendChild(tr);
        });

        jsonTable.innerHTML = "";
        jsonTable.appendChild(table);
        listBtn.style.display = "inline-block";
      })
      .catch((error) => console.error(error));
  }

  // Creating JSON list to display drinks.js
  const listBtn = document.getElementById("list-btn");
  const drinkList = document.getElementById("drink-list");

  listBtn.addEventListener("click", displayDrinkList);

  function displayDrinkList() {
    listBtn.style.display = "none";
    fetch("/drinks?format=json")
      .then((response) => response.json())
      .then((data) => {
        const ul = document.createElement("ul");
        drinkList.appendChild(ul);

        data.forEach((item) => {
          const li = document.createElement("li");
          const h3 = document.createElement("h3");
          const p1 = document.createElement("p");
          const p2 = document.createElement("p");
          const p3 = document.createElement("p");
          const a = document.createElement("a");

          h3.textContent = item.title;
          p1.textContent = item.description;
          p2.textContent = `Prep Time: ${item["prep time"]}`;
          p3.textContent = `Source: ${item.source}`;
          a.href = item.link;
          a.target = "_blank";
          a.textContent = "View Recipe";

          li.appendChild(h3);
          li.appendChild(p1);
          li.appendChild(p2);
          li.appendChild(p3);
          li.appendChild(a);

          ul.appendChild(li);
        });
      })
      .catch((error) => console.error(error));
  }
});

// Callback function declaration
function ready(callback) {
  if (document.readyState != "loading") {
    callback();
    console.log("Ready state is 'complete'");
  } else {
    document.addEventListener("DOMContentLoaded", callback);
    console.log("Listener was invoked");
  }
}
