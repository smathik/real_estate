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


app.controller('fieldUserController', function ($scope, $http, LogoutFactory) {
    $scope.modalShown = false;
    $scope.old_jobs=[];
    $scope.new_jobs=[];
    $scope.filepath='';


    $scope.status_options={'Approved':'Approved','Pending':'Pending','Rejected':'Rejected','All':''}

    $scope.toggleModal = function (data) {
        
        $scope.job_data=data;
        
        console.log($scope.job_data)
        $scope.modalShown = !$scope.modalShown;
        
    };

    $scope.logout = function () {
        LogoutFactory.logout(function (response) {
            // if(response.data == "Logout Successfully.")
            // {
                window.location = '/';
            // }
        })
    };




    





    



    $scope.process_job = function (job_data){
        console.log(job_data);
        // console.log(job_id+lipprice+description+specification+filepath)
        // var PostData = {
        //     job_id: job_id,
        //     lipprice: lipprice,
        //     description: description,
        //     specification: specification,
        //     description: description
        // };

        $http.post('/submit_lip/', job_data).success(function (response) {
            // $scope.new_jobs = response;
            $scope.toggleModal();
            $scope.fetch_new_jobs();

        });   

    };


    $scope.fetch_new_jobs = function () {
        $http.post('/fetch_new_jobs/', {}).success(function (response) {
            $scope.new_jobs = response;
        });    

    };


    $scope.fetch_old_jobs = function () {
        $http.post('/fetch_old_jobs/', {}).success(function (response) {
            $scope.old_jobs = response.roles;
        });    

    };

       $scope.upload_file = function () {
        $http.post('/upload_file/', {}).success(function (response) {
            $scope.filepath = response.roles;
        });    

    };

    $scope.fetch_submitedjob = function(){
        $http.post('/fetch_submitedjob/', {}).success(function (response) {
            $scope.submitedjob = response;
        });   

    }




});

