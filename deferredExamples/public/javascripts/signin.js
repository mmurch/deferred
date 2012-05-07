(function(){

	var loginForm = {

		defaults: {
			email: null,
			password: null
		},

		init: function(){
			var self = this;
			
			self.$form = $('.SignIn form');
			
			self.$form.find('button').click(function(e){
				self.submitForm(e, self);
			});
		},

		submitForm: function(e, self){
			
			e.preventDefault();
			e.stopPropagation();

			var formData = $.extend({}, self.defaults, {
				email: self.$form.find('#email').val(),
				password: self.$form.find('#password').val()
			}), 
				client = self.clientCheck(formData, self),
				validation = client.pipe(function(succeeded){
					return self.serverCheck(formData, self, succeeded);
				});

			validation.done(self.handleSuccess);

			validation.fail(self.handleError);

			// self.clientCheck(formData, self)
			// 	.done(self.serverCheck(formData, self)
			// 		.done(self.handleSuccess), self.handleError)
			// 	.fail(self.handleError);
				// .done(self.handleSuccess);

		},

		clientCheck: function(formData, self){
			var deferred = $.Deferred();

			if (formData.email == null || formData.email.trim() == ''){
		     	deferred.reject('Please enter an email address');
		     	// return false;
		    }
		    else if (!self.isValidEmail(formData.email)){
		     	deferred.reject('Email address is invalid');
		     	// return false;
		    }
		    else if (formData.password == null || formData.password.trim() == ''){
		     	deferred.reject('Please enter a password');
		     	// return false;
		    }
		    else if (formData.password.length < 6){
		     	deferred.reject('Password is too short.');
		     	// return false;
		    }
		    else {
		    	deferred.resolve();
		    }
		    return deferred.promise();
		},

		serverCheck: function(formData, self, clientSideSucceeded){

			if (!clientSideSucceeded){
				return $.Deferred().reject();
			}

			var resp = $.ajax({
				type: 'POST',
				url: '/signin',
				data: formData
			});

			resp.success = function(response){
				if (response.error){
					resp.reject(response.error);
				}
				else if (response.success){
					resp.resolve();
				}
			};

			resp.error = function(){
				resp.reject('Server error, try again');
			};
			return resp.promise();
		},

		handleError: function(error){
			alert(error);
		},

		handleSuccess: function(){
			location.href = '/success';
		},

		isValidEmail: function(email){ 
		    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		    return re.test(email);
		},

		isValidPassword: function(password){
			return password != null && password.length > 6;
		}
	};

	$(function(){
		loginForm.init();
	});
})();