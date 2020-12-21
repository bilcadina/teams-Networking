
function insertPersons(members){
    const tbody = document.querySelector("#persons tbody");

     var membersHTML = members.map(member => {
        return getPersonHtml(member.firstName, member.lastName, member.link, member.telephone);
    });
    console.log('members: ', membersHTML);
    tbody.innerHTML = membersHTML.join('');
}

function getPersonHtml(firstName,lastName,link,telephone)
{
    return `<tr>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td><a target="_blank" href="https://www.linkedin.com/feed/${link}">linkedin</a></td>
    <td>${telephone}</td>
 </tr>`
}

function getTeamMembers(){
    fetch('team.json')
    .then(response => response.json())
    .then(members => {
        console.log('datele mele: ', members)
        insertPersons(members);
    });
}

    getTeamMembers();

//todo map 

