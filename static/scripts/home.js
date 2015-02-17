var app = angular.module('homepage', ['ngCookies','ngResource']);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.run(function($rootScope, $http, $cookies){
    // set the CSRF token here
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

  });


app.controller('SuperAdminController',function ($scope,$http,$cookies) {


        $scope.add_property = function(propertyname, plots, flats) {                

                var PostData = {
                propertyname: propertyname,
                plots : plots,
                flats: flats,
            };
            console.log(PostData)

            $http({
                url: '/api/properties/add_property/',
                method: "POST",
                data: PostData,
           }).success(function(response) {   

            if (response == '"success"' ) {    
                alert('Branch has been Created Successfully!!!');                                
                
            }
            // else if (response == '"Exist"' ) {
            //     setTimeout(function () {                  
            //       appBusy.set("Exist ...");
            //     }, 50);
            //     // $scope.brancherrormsg = true;
            //     // $scope.brancherror = 'Branch name Already Exist!!!';
            // }
         
        });
    }

    $scope.add_user = function(username, paswrd, mob_no, city){
    	var PostData = {
    		username : username,
    		paswrd : paswrd,
            mob_no : mob_no,
            city : city

    	};
    	console .log(PostData)
    	$http({
    		url: '/add_user/',
    		method: "POST",
    		data : PostData,
    	// }).success(function(response)){
    	// 	if(response == 'success'){
    	// 		alert('User has been added Successfully');
    	// 	}
    	});
    };
    $scope.fetch_property = function(){
        $http({
            url:'/fetch_property/',
            method:'GET',
            }).success(function(data){
                console.log('success')
                $scope.fetch_property_data = data;
            });
        };

    $scope.buy_property = function(obj, username){
        // var PostData = {
        //     project_name:project_name,
        // };
        console .log(obj)
        $http({
            url: '/buy_property/',
            method: "POST",
            data : obj,
            username : username,
        });
    };

});





