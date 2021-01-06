const API = {
    CREATE: {
        URL:"create.json",
        METHOD: "GET" //POST
    },
    READ:{
        URL:"team.json",
        METHOD: "GET"
    },
    UPDATE:{
        URL:"",
        METHOD: "GET"
    },
    DELETE:{
        URL:"delete.json",
        METHOD: "GET"//DELETE
    }
};




function insertPersons(persons) {
    const tbody = document.querySelector("#list tbody");
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml (persons) {
    return persons.map(getPersonHtml).join("");
}

function getPersonHtml (person) {
    const linkedin = person.linkedin;
    return `<tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td><a target="_blank" href="https://www.linkedin.com/feed/${linkedin}">linkedin</a></td>
        <td>
        <a href="${API.DELETE.URL}?id=${person.id}"a123">&#10006;</a>
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
    const search = document.getElementById('search');
    search.addEventListener('input', e => {
        const text = e.target.value;

        const filtrate = searchPersons(text);
        console.info({filtrate})
    

    insertPersons(filtrate);
});

function saveMember() {
    const firstName = document.querySelector("input[name=firstName]").value;
    const lastName = document.querySelector("input[name=lastName]").value;
    const Linkedin = document.querySelector("input[name=linkedin]").value;
    
    const person ={
        firstName, 
        lastName,
        linkedin: Linkedin 
    };
    console.info('saving...', person,JSON.stringify(person));

    fetch(API.CREATE.URL, {
        method:API.CREATE.METHOD,
        body:API.CREATE.METHOD === "GET" ? null: JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
          console.warn(r);
          if (r.success) {
              setTimeout(()=> {
            //alert('saving data..please wait until we are ready.');
                console.info('refresh list');
                loadList();
              }, 30000);
          } 
      });
}
 
const saveBtn = document.querySelector("#list button");
saveBtn.addEventListener("click", () => {
    saveMember();
});

