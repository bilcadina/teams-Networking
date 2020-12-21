
function insertPersons(members){
    const tbody = document.querySelector("#persons tbody");
     var membersHTML = members.map(member => 
         getPersonHtml(member.firstName, member.lastName, member.link));
    tbody.innerHTML = membersHTML.join('');
}

function getPersonHtml(firstName,lastName,link){
    return `<tr>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td><a target="_blank" href="https://www.linkedin.com/feed/${link}">linkedin</a></td>
 </tr>`
}
    let allPersons = [];

function getTeamMembers(){
    fetch('team.json')
    .then(response => response.json())
    .then(data => { 
        allPersons = data;
        insertPersons(data);
    });
}
  function searchPersons(text){
      console.warn('search',text,allPersons)
      return allPersons.filter(person => {
          console.info(person.firstName);
          return person.firstName == text;
      });
  } 

    const search = document.getElementById('search');
    //const search = document.querySelector('#search'); pui diez la query dar se pot chema in acelasi lucru
    
    search.addEventListener('input', e => {
        const text = e.target.value;
        const filtrate = searchPersons(text);
    })

    getTeamMembers();