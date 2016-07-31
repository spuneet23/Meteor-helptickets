Template.login.helpers({
	userEmail: function() {
		return Meteor.user().emails[0].address;
	}
})



Template.login.events({
	'click .register-link':function(event){
        
        $('.panel-login').hide();
         $('.panel-register').fadeIn();
	},

	'click .login-link':function(event){
        
        $('.panel-register').hide();
         $('.panel-login').fadeIn();
	},

	'submit .register-form':function(event) {
	    var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.pwd.value);
		var password2 = trimInput(event.target.pwd2.value);

         if(isNotEmpty(email)&&
           isNotEmpty(password)&&
           isNotEmpty(password2)&&
            isEmail(email) &&
           areValidPasswords(password,password2)) {


		//Create User
		Accounts.createUser({
			email:email,
			password:password,
			profile: {
				usertype:'customer'
			}
		},
          function(err) {
          	if(err) {
          		FlashMessages.sendError("There was an error with registeration");
          	}
          	else {
          		FlashMessages.sendSuccess("Account Created! You are now logged in");
          		Router.go('/');
          	}

          });
      }
		return false;
	},

	"submit .login-form": function(event) {
		var email = event.target.email.value;
		var password = event.target.pwd.value;

	  Meteor.loginWithPassword(email,password,function(err) {
	  	if(err) {
	  		event.target.email.value = email;
	  		event.target.pwd.value = password;
	  		FlashMessages.sendError(err.reason);
	  	}

	  	else {
	  		FlashMessages.sendSuccess('You are now logged in');
	  		Router.go('/');
	  	}

	  });

	  //Clear Form
	  event.target.email.value="";
	  event.target.email.value="";
	  // Prevent Submit
	  return false;
	},

	"submit .logout-form": function(event) {
		Meteor.logout(function(err){
			if(err) {
				FlashMessages.sendError(err.reason);
			}
			else {
				FlashMessages.sendSuccess("You are now logged out");
				Router.go('/');
			}
		});
	}
});


// Validation rules

// Trim Helper
var trimInput = function(val) {
	return val.replace(/^\s*|\s*$/g, "");
};

//Check For Empty Fields
isNotEmpty = function(value) {
   if(value && value !=='') {
   	   return true;
   }
   FlashMessages.sendError("Please fill in all the fields");
   return false;
};

// Validate Email
isEmail = function(value) {
	var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(filter.test(value)) {
    	return true;
    }
    FlashMessages.sendError('Please use a valid email address');
    return false;
};

//Check Password Fields
isValidPassword = function(password) {
	if(password.length < 6) {
		FlashMessages.sendError('Password must be atleast 6 characters');
		return false;
	}
	return true;
};

//Match Password
areValidPasswords = function(password,confirm) {
	if(!isValidPassword(password)) {
		return false;
	}

	if(password !== confirm) {
		FlashMessages.sendError("Passwords do not match");
		return false;
	}
	return true;
};