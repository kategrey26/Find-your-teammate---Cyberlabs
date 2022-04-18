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
            const githubUserId = githubUrl.substring(githubUrl.lastIndexOf('/')+1);
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
    </div>
    <div class = "collapsible" class="links"><span>Github profile link:</span>${profile.github}</div><br>
    <div class = "collapsible" class="links"><span>Linkedin profile link:</span>${profile.linkedin}</div><br>
    <div class = "collapsible" class="links"><span>Codeforces username:</span>${profile.codeforces}</div><br>

   </li>
   
    `;

            html += li
        });

        profilesList.innerHTML = html;
    } else {
        profilesList.innerHTML = '<h5 class="center-align">Login to view user profiles</h5>'
    }

}


//setting up materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});

