
var searchEl = document.querySelector("#inputSearch");
var salaryEl = document.querySelector("#inputSalary");
var salarySpanEl = document.querySelector("#inputSalaryVal");

var jobTypeEl = document.querySelector("#inputSelect");
var jobCityEl = document.querySelector("#inputCity");
var searchBtnEl = document.querySelector("#searchBtn");

var jobListingGridEl = document.querySelector("#jobGrid");

var viewedListing = document.querySelector("#viewedListing");

var createListingEl = document.querySelector("#createListingMenu");
var createListingTitleEl = document.querySelector("#listingTitle");
var createListingPaymentEl = document.querySelector("#listingPayment");
var createListingTypeEl = document.querySelector("#listingType");
var createListingCityEl = document.querySelector("#listingCity");
var createListingDescriptionEl = document.querySelector("#listingDescription");

const firebaseConfig = {
    apiKey: "AIzaSyAvzpsbLDwrz_ltC6LHofp9_ACcc-WA0as",
    authDomain: "toil-531da.firebaseapp.com",
    projectId: "toil-531da",
    storageBucket: "toil-531da.appspot.com",
    messagingSenderId: "323097226675",
    appId: "1:323097226675:web:ed922ddd6049f88c1aafc6",
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Initialized the firebase app");

// DB er vår kobling til databasen.
let db  = firebase.firestore();


 //Updates the list everytime a change occurs in the database
db.collection("Jobs").onSnapshot(snapshot =>{
    console.log("IM GOING THROUGH CHANGES");
    updateListings();
});
function updateListings(){
    while(jobListingGridEl.children.length > 0) {
        jobListingGridEl.removeChild(jobListingGridEl.children[0]);
    }
    
    db.collection("Jobs").orderBy("payment", "desc").limit(25).get().then((snapshot) => {
        let jobs = snapshot.docs;
        for (let i = 0; i < jobs.length; i++) {
            let jobListing = jobs[i].data();
            let jobListingEl = document.createElement("div");
            jobListingEl.setAttribute("class","jobListing");
            jobListingEl.setAttribute("onclick", "viewListing(this)");
            jobListingEl.id = `listing${jobListing.id}`;
    
            let jobTitleEl = document.createElement("h2");
            jobTitleEl.textContent = jobListing.title;
            jobListingEl.appendChild(jobTitleEl);
    
            let jobPictureEl = document.createElement("img");
            jobPictureEl.setAttribute("src", `images/${jobListing.type}.jpg`);
            jobListingEl.appendChild(jobPictureEl);
    
            let jobDescriptionEl = document.createElement("div");
    
            let jobPriceEl = document.createElement("p");
            jobPriceEl.textContent = jobListing.payment + "$";
            jobDescriptionEl.appendChild(jobPriceEl);
    
            let jobLocationEl = document.createElement("p");
            jobLocationEl.textContent = jobListing.city;
            jobDescriptionEl.appendChild(jobLocationEl);
    
            jobListingEl.appendChild(jobDescriptionEl);
    
            jobListingGridEl.appendChild(jobListingEl);
        }
    });
}

salaryEl.addEventListener("input", () =>{
    salarySpanEl.textContent = `${salaryEl.value}$`;
    if (salaryEl.value==1000){
        salarySpanEl.textContent += "+";
    }
});


function filterListings(aes){
    while(jobListingGridEl.children.length > 0) {
        jobListingGridEl.removeChild(jobListingGridEl.children[0]);
    }
    let jobName = searchEl.value;
    let jobWage = salaryEl.value;
    let jobType = jobTypeEl.value; 
    let jobCity = jobCityEl.value;
}

function viewListing(selectedListing){
    console.log(`viewing ${selectedListing}`);
    viewedListing.style.transform ="translateX(0)";

}
function stopViewListing(){
    viewedListing.style.transform ="translateX(140%)";

}

document.getElementById("main").onclick = function(e) {
    if (!createListingMenuOpen){return;}
    if(e.target != document.getElementById('createListingMenu')) {
        openCreateListingMenu()
    }
  }
var createListingMenuOpen = false;
function openCreateListingMenu(){
    if (createListingMenuOpen){
        createListingEl.style.transform ="scaleY(0)";
        createListingMenuOpen = false
        return;
    }
    createListingEl.style.transform ="scaleY(1)";
    createListingMenuOpen = true;
}


function createListing(){//creates a new document(Job listing) in the jobs collection with the added information.
    var jobsLength;
    db.collection("Jobs").get().then((snapshot) =>{ //needs to get the amount of documents (listings) so that the jobs can get their own id
        let doc = snapshot.docs;
        jobsLength = doc.length;
    }).then( ()=>{ //needs to get the length before proceeding
        db.collection("Jobs").add({  //explains itself
            city: createListingCityEl.value,
            description: createListingDescriptionEl.value,
            employee_id:"",
            employer_id:"",
            image:"",
            location:createListingCityEl.value,
            payment: createListingPaymentEl.value,
            start_date: firebase.firestore.Timestamp.now(),
            title: createListingTitleEl.value,
            type: createListingTypeEl.value,
            upload_date: firebase.firestore.Timestamp.now(),
            status:"available",
            id: jobsLength+1,
        });
    });
}