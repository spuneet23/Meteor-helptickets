Template.add_departments.events({
	'submit .add-departments-form':function(event){
		var name = event.target.name.value;
		var head = event.target.head.value;


		//INSERT Dept

		Departments.insert({
			name:name,
			head:head,
			createdAt:new Date() // current time
		});


		FlashMessages.sendSuccess('Department Added');

		Router.go('/staff/departments');

		//Prevent submit
		return false;

	}

});

Template.departments.events({
	'click .delete-department':function(event) {
			if(confirm("Are you sure ?")) {
			Departments.remove(this._id);
			FlashMessages.sendSuccess("Department Deleted");

			//prevent submit
			return false;
		}
	}
})