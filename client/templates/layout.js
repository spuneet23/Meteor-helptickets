// Check if staff
Template.registerHelper('isStaff', function(){
	if(Meteor.user().profile.usertype=='staff') {
		return true;
	}
});


//Format The Date Using MomentJS
Template.registerHelper('formatDate', function(date){
	return moment(date).format('MMMM DD YYYY, h:mm:ss a')
});

//Capitalize First Letter 
Template.registerHelper('capFirst', function(text) {
	return text.charAt(0).toUpperCase()+text.slice(1);
});