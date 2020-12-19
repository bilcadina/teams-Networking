
// function insertPersons(members){
//     const tbody = document.querySelector("#persons tbody");

//     var membersHTML = '';
//     members.forEach(member => {
//         console.log(member.firstName, member.lastName, member.link);
//         membersHTML += getPersonHtml(member.firstName, member.lastName, member.link);
//     });
//     tbody.innerHTML =membersHTML;
// }

function insertPersons(members){
    const tbody = document.querySelector("#persons tbody");

     var membersHTML = members.map(member => {
        return getPersonHtml(member.firstName, member.lastName, member.link, member.age);
    });
    console.log('members: ', membersHTML);
    tbody.innerHTML = membersHTML.join('');
}

function getPersonHtml(firstName,lastName,link, age)
{
    return `<tr>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td><a target="_blank" href="https://www.linkedin.com/feed/${link}">linkedin</a></td>
    <td>${age}</td>
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

