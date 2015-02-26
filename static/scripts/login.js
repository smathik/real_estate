var app = angular.module('homepage', ['ngCookies','ALL.factories','ngResource']);

// app.controller('HomeMainController',function ($scope,$modal) {
// 'use strict';
// });
app.run(function($rootScope, $http, $cookies){
    // set the CSRF token here
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

app.controller('LoginController',function ($cookies,$scope,$http,$location) {
'use strict';
$scope.condition = false;
$scope.error_status = false;

$scope.submit = function(username,password) {
         if ($scope.username,password) {
           $scope.push(this.username,password);
     
            }
        }
$scope.login_show = function(value){
	if(value == false){
		$scope.condition = true;
	}
	else{
		$scope.condition = false;
	}

}

$scope.continue_login = function(username,password){

	if(!username){
		$scope.error_status = true;
		$scope.error_message = 'Username incorrect';
	}
	else if(!password){
		$scope.error_status = true;
		$scope.error_message = 'Enter your Password';
    $scope.push(this.username,password);
	}
	else{
			var d = {  
                      username: username,
                      password: password
                      
                  };
                  console.log(d)
                  // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
                  var to = "/api/properties/login_user/";
                  $http.post(to, d).success(function (response) {
                      console.log(response)
                      if(response['response'] ==  '"admin"'){
                        window.location =  '/home/';
                      }
                      else if (response['response'] == '"client"'){
                        alert('Client login')
                        window.location =  '/clientpage/';
                        $scope.username = response['username'];
                        console.log(response)
                        console.log($scope.username)
                      }
                      else if (response == '"user not registered"'){
                        alert('This User is not registered')
                      }
                      // if (data.redirect) {
                      //     window.location.href = data.redirect;
                      //     $modalInstance.close();
                      // }
                  }).error(function (data) {
                          
                              // console.log(data.error_message);

                              // $scope.error1 = true;
                              // $scope.errormsg = data.error_message;

                          

                      });
        }
         
}
});