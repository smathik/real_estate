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
    		url: '/api/properties/add_user/',
    		method: "POST",
    		data : PostData,
    	}).success(function(response){
    		if(response == '"success"'){
    			alert('User has been added Successfully');
    		}
    	});
    }

    $scope.fetch_property = function(){
        $http({
            url:'/api/properties/fetch_property/',
            method: 'GET' ,
            }).success(function(data){
                console.log('success')
                $scope.fetch_property_data = data;
            });
        };
        

    $scope.approve_property = function(){
        $http({
            url:'/api/properties/approve_property/',
            method: 'GET' ,
            }).success(function(data){
                console.log('success')
                $scope.fetch_property_data = data;
            });
        };


    $scope.buy_property = function(obj, plot, flat){
        var PostData = {
            obj : obj,
            plot:plot,
            flat:flat
        };
        console .log(PostData)
        $http({
            url: '/buy_propertys/',
            method: "POST",
            data : PostData,
            // username : username,
        });
    };

});





