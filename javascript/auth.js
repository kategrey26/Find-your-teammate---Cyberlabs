//listen for auth changes
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        
        db.collection('profiles').onSnapshot(snapshot=>{//the on snapshot automatically adds an event listener 
            //and gives us the updated list of profiles without having to reload as we did while using get().then instead
            setupProfiles(snapshot.docs);
           
          //delete this
            setupUI(user);
        });
        console.log('user logged in');
        
    }
    else {
        console.log('user logged out');
        setupUI();
        setupProfiles([]);
    }
});






//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


auth.createUserWithEmailAndPassword(email,password).then(cred => {

    return db.collection('profiles').doc(cred.user.uid).set({
        name: signupForm.name.value,
  
        college: signupForm.college.value,
        yearofstudy: signupForm['yearofstudy'].value,
        skills: signupForm.skills.value,
        techstack:signupForm.techstack.value,
        github: signupForm.github.value,
        linkedin: signupForm.linkedin.value,
     
       content2: signupForm.content2.value,
       projects:signupForm.projects.value,
       codeforces:signupForm.codeforces.value,



       
   

    })

    

}).then(()=>{
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();

});



});
//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
         console.log('user signed out')//not needed anymore because the state changed auth is doing that
    });
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
           console.log(cred.user);
           console.log('userloggedin')
        //close modal and reset
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }); 
})








