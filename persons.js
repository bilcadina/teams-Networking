const API = {
    CREATE: {
        URL:"http://localhost:3000/teams-json/create",
        METHOD: "POST"
    },
    READ:{
        URL:"http://localhost:3000/teams-json",
        METHOD: "GET"
    },
    UPDATE:{
        URL:"http://localhost:3000/teams-json/update",
        METHOD: "PUT"
    },
    DELETE:{
        URL:"http://localhost:3000/teams-json/delete",
        METHOD: "DELETE"
    }
};

function insertPersons(persons) {
    const tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml (persons) {
    return persons.map(getPersonHtml).join("");
}

function getPersonHtml (person) {
    const gitHub = person.gitHub;
    return `<tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td><a target="_blank" href="https://github.com/${gitHub}">GitHub</a></td>
        <td>
        <a href="#" class="delete-row" data-id="${person.id}">&#10006;</a>
        <a href="#" class="edit-row" data-id="${person.id}">&#9998;</a>
        </td>
 </tr>`;
}

let allPersons = [];

function loadList(){
    fetch(API.READ.URL)
    .then(response => response.json())
    .then(data => { 
        allPersons = data;
        insertPersons(data);
    });
}

loadList();

function searchPersons(text) {
    text = text.toLowerCase();
    console.warn("search", text);
    return allPersons.filter(person => {
          console.info(person.firstName);
        return person.firstName.toLowerCase().indexOf(text) > -1 || 
          person.lastName.toLowerCase().indexOf(text) > -1;
    });
  }  
    
function saveMember() {
    const firstName = document.querySelector("input[name=firstName]").value;
    const lastName = document.querySelector("input[name=lastName]").value;
    const gitHub = document.querySelector("input[name=gitHub]").value;
    
    const person ={
        firstName, 
        lastName,
        gitHub: gitHub
    };
    console.info('saving...', person,JSON.stringify(person));

    fetch(API.CREATE.URL, {
        method:API.CREATE.METHOD,
        headers: {
        "Content-Type": "application/json"
        },
        body:API.CREATE.METHOD === "GET" ? null: JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
          console.warn(r);
          if (r.success) {
                loadList();
          } 
      });
}

function deleteTeamMember(id){
    fetch(API.DELETE.URL,{
        method: API.DELETE.METHOD,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(r => {
        console.warn(r);
        if(r.success) {
            loadList();
        }
    });  
}

function editTeamMember(){
    
}

function addEventListeners(){
    const search = document.getElementById('search');
    search.addEventListener('input', e => {
        const text = e.target.value;

        const filtrate = searchPersons(text);
        console.info({filtrate})
    
        insertPersons(filtrate);
    });
 
    const saveBtn = document.querySelector("#list tfoot button");
    saveBtn.addEventListener("click", () => {
        saveMember();
    });

    const table = document.querySelector("#list tbody");
    table.addEventListener("click", (e) => {
        const target = e.target;
        if ( target.matches("a.delete-row")) {
            const id = target.getAttribute("data-id");
            console.warn('delete', id);
            deleteTeamMember(id);
        }
    });
}

addEventListeners();



