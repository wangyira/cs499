// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKz8RV3OVwh8ZRfi0urrCM_LJYPBrGlKY",
  authDomain: "curb-8ce87.firebaseapp.com",
  projectId: "curb-8ce87",
  storageBucket: "curb-8ce87.appspot.com",
  messagingSenderId: "482073724278",
  appId: "1:482073724278:web:d7226ca3edff744859a657"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//initialize variables
const auth=firebase.auth();
const database=firebase.database();

//register
function signup(){
    fullname = document.getElementById('name').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    liveNearUSC = document.getElementById('livenearby').checked;

    if(liveNearUSC === false){
        alert('For the beta, we only allow people who live near USC to signup. Please register later, sorry.')
        return
    }

    if(email.includes("@usc.edu") === false){
        alert("Please enter a valid USC email");
        return
    }

    if(validate_field(fullname) === false || validate_field(email) === false || validate_field(password) === false){
        alert('One or more fields is not filled out');
        return
    }

    if(password.length < 6){
        alert("Password must be longer than 6");
    }

    auth.createUserWithEmailAndPassword(email , password)
        .then(function(){
            var user = auth.currentUser

            // add to database
            var database_ref = database.ref()

            //Create User data
            var user_data ={
                email : email,
                fullname : fullname,
                last_login : Date.now()
            }

            database_ref.child('users/'+user.uid).set(user_data).then(function onSuccess(res){
                window.location = 'index.html'
            });
        })
        .catch(function(error){
            var error_code = error.error_code
            var error_message = error.messagingSenderId

            alert("firebase error",error_message)
        })
}

function login(){
    email2 = document.getElementById('email2').value;
    password2 = document.getElementById('password2').value;

    if(validate_field(email2) === false || validate_field(password2) === false){
        alert('One or more fields is not filled out');
        return
    }

    auth.signInWithEmailAndPassword(email2, password2)
    .then(function(){
        var user = auth.currentUser

        // add to database
        var database_ref = database.ref()

        //Create User data
        var user_data ={
            last_login : Date.now()
        }

        database_ref.child('users/'+user.uid).update(user_data).then(function onSuccess(res){
            window.location = 'index.html'
        });
    })
    .catch(function(error){
        var error_code = error.error_code
        var error_message = error.messagingSenderId

        alert("firebase error",error_message)
    })
}

function uploadItem(){
    itemName = document.getElementById('itemName').value;
    itemLocation = document.getElementById('itemLocation').value;
    itemDescription = document.getElementById('itemDescription').value;
    itemCategory = document.getElementById('itemCategory').value;
    itemGiveDate = document.getElementById('itemGiveDate').value;
    //itemImage = document.getElementById('name').value;
    
    //Create item data
    let item_data ={
        itemName : itemName,
        itemLocation : itemLocation,
        itemDescription : itemDescription,
        itemCategory : itemCategory,
        itemGiveDate : itemGiveDate
    }
    let itemRef = database.ref("items").child;
    itemRef.set(item_data);
}

function validate_field(field){
    if (field == null || field.length <= 0){
        return false;
    }
    else{
        return true;
    }
}

function changeHeart(){
    console.log("in change heart")
    if (document.getElementById("heart").src == "images/heart.png"){
        console.log("empty to full")
        document.getElementById("heart").src = "images/fullheart.png";
    } 
    // else {
    //     document.getElementById("heart").src = "http://www.userinterfaceicons.com/80x80/minimize.png";
    // }
}