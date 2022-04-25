const editProfile = document.querySelector('#edit-form');
const loggedoutlinks = document.querySelectorAll('.logged-out');
const loggedinlinks = document.querySelectorAll('.logged-in');
const profilesList = document.querySelector('.collapsible');
const githubinfo = document.querySelector('.githubinfo');
const accountDetails = document.querySelector('.account-details');
const setupUI = (user) => {
    if (user) {
        //account info
        db.collection('profiles').doc(user.uid).get().then(doc => {
            const html = `
            <a href="#" id="editbtn" class="grey-text modal-trigger" data-target="modal-edit" type="button" 
            onclick="document.getElementById('modal-edit').style.display='flex'">edit</a>
            <div id="logged-in-as">Logged in as ${user.email}</div>
            <div class="info-param">Name : <p class="infoinside">${doc.data().name}</<p></div>
            <div class="info-param">College :<p class="infoinside"> ${doc.data().college}</p></div>
            <div class="info-param">Year of study : <p class="infoinside">${doc.data().yearofstudy}</p></div>
            <div class="info-param">Skills :<p class="infoinside"> ${doc.data().skills}</p></div>
            <div class="info-param">Techstack :<p class="infoinside"> ${doc.data().techstack}</p></div>
            <div class="info-param">Linkedin profile link :<p class="infoinside"> ${doc.data().linkedin}</p></div>
            <div class="info-param">Github profile link :<p class="infoinside"> ${doc.data().github}</p></div>
            <div class="info-param">Your codeforces username :<p class="infoinside"> ${doc.data().codeforces}</p></div>
            <div class="info-param">What are you lokking for in your teammate?<p class="infoinside"> ${doc.data().content2}</p></div>
            <div class="info-param">list some of your recent projects along with a brief explanation of each : <p class="infoinside">${doc.data().projects}</p></div>
          
     
           
            `;
            editProfile["0"].value=doc.data().name,
            editProfile["1"].value=doc.data().skills,

            editProfile["2"].value=doc.data().college
            editProfile["3"].value =doc.data().techstack,
            editProfile["4"].value =doc.data().yearofstudy,
            editProfile["5"].value=doc.data().projects,
           editProfile["6"].value=user.email,
         editProfile["7"].value=doc.data().content2,
            editProfile["8"].value=doc.data().password,
            editProfile["9"].value=doc.data().codeforces,
           editProfile["10"].value=doc.data().github,
           editProfile["11"].value=doc.data().linkedin
            
            accountDetails.innerHTML = html;
        })



        //toggle ui elements
        loggedinlinks.forEach(item => item.style.display = 'inline-flex');
        loggedoutlinks.forEach(item => item.style.display = 'none');
    } else {
        //hide account info
        accountDetails.innerHTML = '';
        //toggle ui elements
        loggedinlinks.forEach(item => item.style.display = 'none');
        loggedoutlinks.forEach(item => item.style.display = 'inline-flex');
    }
}
//setup profiles and display them onscreen
let count = 0;
const setupProfiles = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            count++;
            const profile = doc.data();
            console.log(profile);





            const githubUrl = profile.github;
            const githubUserId = githubUrl.substring(githubUrl.lastIndexOf('/') + 1);
            const url = 'https://api.github.com/users/' + githubUserId;

            console.log(url);
            const profileid = "profiletile-" + count;
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("NETWORK RESPONSE ERROR");
                    }
                }).then(data => {
                    console.log(data);

                    displayData(data);
                })
                .catch((error) => console.error("FETCH ERROR:", error));
            function displayData(data) {
                const heading=document.createElement('p')
                heading.innerText = `Github information:`;
                document.getElementById(profileid).appendChild(heading);

                const publicrepos = data.public_repos;
                const list1 = document.createElement('li')
                list1.innerText = `NUMBER OF PUBLIC REPOSITORIES : ${publicrepos}`;
                document.getElementById(profileid).appendChild(list1);


            }




            ;
            const repourl = 'https://api.github.com/users/' + githubUserId + '/repos';
            console.log(repourl);

            fetch(repourl)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("NETWORK RESPONSE ERROR");
                    }
                }).then(data => {
                    console.log(data);
                    showData(data);
                })
            function showData(data) {
             
                data.forEach(repo => {
                    const reponame = document.createElement('li')
                    reponame.innerText = `Name of repository : ${repo.name}`;
                    document.getElementById(profileid).appendChild(reponame);

                    const forks = document.createElement('li')
                    forks.innerText = `Number of forks : ${repo.forks}`;

                    document.getElementById(profileid).appendChild(forks);
                    const stars = document.createElement('li')
                    stars.innerText = `Number of stars : ${repo.stargazers_count}`;

                    document.getElementById(profileid).appendChild(stars);


                })
            }










            const username = profile.codeforces;

            const codeforcesurl = 'https://codeforces.com/api/user.info?handles=' + username;
            console.log(codeforcesurl);

            fetch(codeforcesurl)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("NETWORK RESPONSE ERROR");
                    }
                }).then(data => {
                    console.log(data);

                    showcodeforcesData(data);
                })

            function showcodeforcesData(data) {
                data.result.forEach(result => {
                    const heading=document.createElement('p')
                    heading.innerText = `Codeforces information:`;
                    document.getElementById(profileid).appendChild(heading);
                    const rank = document.createElement('li')
                    rank.innerText = `Rank on Codeforces : ${result.rank}`;
                    document.getElementById(profileid).appendChild(rank);
                    const rating = document.createElement('li')
                    rating.innerText = `Rating on Codeforces : ${result.rating}`;
                    document.getElementById(profileid).appendChild(rating);
                    // const stars = document.createElement('li')
                    // stars.innerText = `Number of stars : ${repo.stargazers_count}`;


                })

            }















            const li = `
   
    <li class="profiletile" id= ${profileid} >
    

    <div class = "collapsible"><span>Name:</span>${profile.name}</div><br>
    <div class = "collapsible"><span>College Name:</span>${profile.college}</div><br>
    <div class = "collapsible"><span>Year of Study:</span>${profile.yearofstudy}</div><br>
 
    <div class="collapsible" id="techinfo">
    <div class = "collapsible"><span>Skills:</span>${profile.skills}</div><br>
    <div class = "collapsible"><span>Technological stack:</span>${profile.techstack}</div><br>

    <div class = "collapsible"><span>list some of your recent projects along with a brief explanation of each:</span>${profile.projects}</div><br>
    <div class = "collapsible"><span>what are you looking for in your teammate?:</span>${profile.content2}</div><br>
  
    <div class = "collapsible" class="links"><span>Github profile link:</span>${profile.github}</div><br>
    <div class = "collapsible" class="links"><span>Linkedin profile link:</span>${profile.linkedin}</div><br>
    <div class = "collapsible" class="links"><span>Codeforces username:</span>${profile.codeforces}</div><br>
    
   </li>
   
    `;

            html += li
        });

        profilesList.innerHTML = html;
    } else {
        profilesList.innerHTML = '<h5 class="center-align" style.color="rgba(0,136,169,1)">Login to view user profiles</h5>'
    }

}


//setting up materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});







//edit account details

function updateUserProfile(e) {
    e.preventDefault()
    const userdocref = db.collection('profiles').doc(firebase.auth().currentUser.uid);
    userdocref.update({
        name: editProfile["0"].value,
        skills: editProfile["1"].value,
        college: editProfile["2"].value,
        techstack: editProfile["3"].value,
        yearofstudy: editProfile["4"].value,
        projects: editProfile["5"].value,
        email: editProfile["6"].value,
        content2: editProfile["7"].value,
        password: editProfile["8"].value,
        codeforces: editProfile["9"].value,
        github: editProfile["10"].value,
        linkedin: editProfile["11"].value

    })
    const modal = document.querySelector('#modal-edit');
    M.Modal.getInstance(modal).close();
    editProfile.reset();

}







$("#btnresetpassword").click(function(){
var auth= firebase.auth();
var email=$("#reset-email").val();
if (email != ""){
auth.sendPasswordResetEmail(email).then(function(){
window.alert("An alert has been sent to you please check and verify.")
})
.catch(function(error){
    throw new Error("NETWORK RESPONSE ERROR");
});
} else{
    window.alert("Please enter your email address")
}

});