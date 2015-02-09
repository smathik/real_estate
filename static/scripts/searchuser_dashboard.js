var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    'use strict';
    return window._; // assumes underscore has already been loaded on the page
});

var app = angular.module('homepage', ['ngCookies', 'ALL.factories', 'ngResource', 'underscore']);
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
app.run(function ($rootScope, $http, $cookies) {
    // set the CSRF token here
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

});

app.filter('monthfilter', function () {
    'use strict';
    return function (input) {
        return months[input - 1];
    };
});

app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            dialogTitle: '@'
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function () {
                scope.show = false;
            };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-title'><h4 class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></h4><div class='ng-modal-close' ng-click='hideModal()'><i class='fa fa-times-circle fa-lg'></i></div></div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
    };
});

app.controller('SearchUserController', function ($scope, $http, $filter) {

    $scope.modalShown = false;
    $scope.old_jobs=[];
    $scope.new_jobs=[];
    $scope.MasterData ='';
    $scope.status_options={'Approved':'Approved','Pending':'Pending','Rejected':'Rejected','All':''}

    $scope.locations_data=[];

    $scope.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    $scope.currentDate = new Date();
    $scope.currentYear = $filter('date')($scope.currentDate, 'yyyy');
    $scope.years=$filter('range')([],1940,$scope.currentYear).slice().reverse();

    $scope.vehicleTypes=[];
    $scope.makes=[];
    $scope.models=[];
    $scope.variants=[];


    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.getMasterData = function () {
        $http.post('/getMasterData/', {}).success(function (response) {
                // console.log(response)
                $scope.MasterData = response.MasterData;
                console.log($scope.MasterData)
                $scope.man_names = response.Manufacture;
                $scope.cat_names = response.Category;
                console.log($scope.cat_names)
            });
    };

    $scope.testy = function (test) {
        console.log(test);
    } 

    $scope.send_job = function (year_model,month_model,cat_model,man_model,var_model,state_model,district_model,selectedCities,job_type) {
        var PostData = {
            year: year_model,
            month: month_model,
            categoryname:cat_model,
            Manufacture:man_model,
            variant: var_model,
            state: state_model,
            district: district_model,
            cities: selectedCities,
        };

        $http.post('/submit_job/', PostData).success(function (response) {
            if (response == '"success"'){alert('Job submitted successfully');$scope.modalShown = !$scope.modalShown;}
            else if (response == '"exists"'){alert('Job Already Exists !')}
                else if (response == '"notcomplete"'){alert('Fill required fields')}
            });
    };
    
    $scope.DisplayLipData = function(cat_model,man_model,mod_model,var_model,from_year_model,to_year_model){
        var PostData = {
           cat_name: cat_model,
           man_name: man_model,
           mod_name: mod_model,
           var_name: var_model,
           from_year: from_year_model,
           to_year: to_year_model 
        }
        $http.post('/DisplayLipData/', PostData).success(function(response){
         // console.log(response)
            $scope.LipDisplayData = response;
        })

    };




    $scope.getMasterData();   

});



app.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max);
    for (var i=min; i<=max; i++)
      input.push(i);
  return input;
};
});

