
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

function getTeamMembers(){
    fetch('team.json')
    .then(response => response.json())
    .then(members => { insertPersons(members);
    });
}
    getTeamMembers();

