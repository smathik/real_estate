var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    'use strict';
    return window._; // assumes underscore has already been loaded on the page
});

var app = angular.module('homepage', ['ngCookies','ngRoute' ,'ALL.factories', 'ngResource', 'underscore','ui.bootstrap','ngAnimate']);
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
app.service('currentid', function($rootScope) {
    var currentid = [];
    this.get_currentid = function() {
        return currentid;
    };
    this.set_currentid = function(name) {
        currentid = name;
    };

});
app.service('locationsService', function($rootScope) {
    var locations_data = [];
    this.get_locations_data = function() {
        return locations_data;
    };
    this.set_locations_data = function(name) {
        locations_data = name;
    };

});


app.controller('AdminController', function ($scope, $modal, $http, $filter, currentid, locationsService) {
    $scope.set_id = function(userid) {
        currentid.set_currentid(userid);
    }

    $scope.$on('fetch_new_jobs', function() {
        $scope.fetch_new_jobs();
    });

    $scope.modalShown = false;
    $scope.old_jobs=[];
    $scope.new_jobs=[];
    $scope.MasterData ='';
    $scope.status_options={'Approved':'Approved','Pending':'Pending','Rejected':'Rejected','All':''}


    $scope.openAddJob = function(job_id) {
        $scope.set_id(job_id);
        $scope.fetch_locatios_data();


        
        $scope.vehicleTypes=[];
        $scope.makes=[];
        $scope.models=[];
        $scope.variants=[];

        var modalInstance = $modal.open({
            templateUrl: 'addJobModal',
            controller: addJobCtrl,
            backdrop: 'true',
        });
    };

    var addJobCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService) {

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('fetch_new_jobs');
        };
        $scope.job_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        console.log($scope.locations_data)

        $scope.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        $scope.currentDate = new Date();
        $scope.currentYear = $filter('date')($scope.currentDate, 'yyyy');
        $scope.years=$filter('range')([],1940,$scope.currentYear).slice().reverse();
        $scope.selectedCities=[];

        $scope.addJob = function (year_model, month_model, cat_model, man_model, mod_model, var_model, state_model, district_model, selectedCities) {

            var PostData = {
                year: year_model,
                month: month_model,
                category:cat_model,
                manufacture:man_model,
                model: mod_model,
                variant: var_model,
                state: state_model,
                district: district_model,
                city: selectedCities,
            };
            
            var success = 'Job is Successfully Created';

            $http.post('/AddOrUpdateJob/', PostData).success(function (response) {
                if (response == '"success"'){
                    $scope.cancel();
                }
                else if (response == '"exists"'){alert('Job Already Exists !')}
                else if (response == '"cities"'){alert('Select any city/cities !')}
                else if (response == '"somejobs"'){alert('Some Job/Jobs not created which is already Exists !')}
                else if (response == '"notcomplete"'){alert('Fill required fields')}
                });
        };

        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {
                $scope.MasterData = response.MasterData;
                $scope.man_names = response.Manufacture;
                $scope.cat_names = response.Category;
                $scope.variant_names = response.Variant;
            });
        };
        $scope.getMasterData();

        $scope.toggleCitySelection = function (cityName) {
            var idx = $scope.selectedCities.indexOf(cityName);
            if (idx > -1) {
                $scope.selectedCities.splice(idx, 1);
                console.log(cityName+' Unselected');
            }
            else {
                $scope.selectedCities.push(cityName);
                console.log(cityName+' Selected');
            }
        };

    };

    /////////////// Update Modal
    $scope.openUpdateJob = function(job_id) {
        $scope.set_id(job_id);
        $scope.fetch_locatios_data();


        
        $scope.vehicleTypes=[];
        $scope.makes=[];
        $scope.models=[];
        $scope.variants=[];

        var modalInstance = $modal.open({
            templateUrl: 'updateJobModal',
            controller: updateJobCtrl,
            backdrop: 'true',
        });
    };

    var updateJobCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService) {

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('fetch_new_jobs');
        };
        $scope.job_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        console.log($scope.locations_data)

        $scope.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        $scope.currentDate = new Date();
        $scope.currentYear = $filter('date')($scope.currentDate, 'yyyy');
        $scope.years=$filter('range')([],1940,$scope.currentYear).slice().reverse();
        $scope.selectedCities=[];

        $scope.updateJob = function (year_model, month_model, cat_model, man_model, mod_model, var_model, state_model, district_model, city_model) {

            var PostData = {
                year: year_model,
                month: month_model,
                category:cat_model,
                manufacture:man_model,
                model: mod_model,
                variant: var_model,
                state: state_model,
                district: district_model,
                city: city_model,
            };

            var success = 'Job is Successfully Created';
            if ($scope.user_id != "") {
                PostData['job_id'] = $scope.job_id;
                var success = 'Job is Successfully Updated';
            }

            $http.post('/AddOrUpdateJob/', PostData).success(function (response) {
                if (response == '"success"'){
                    $scope.cancel();
                }
                else if (response == '"exists"'){alert('Job Already Exists !')}
                    else if (response == '"notcomplete"'){alert('Fill required fields')}
                });
        };

        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {
                $scope.MasterData = response.MasterData;
                $scope.man_names = response.Manufacture;
                $scope.cat_names = response.Category;
                $scope.variant_names = response.Variant;
            });
        };
        $scope.getMasterData();

        $scope.fetch_job = function(job_id) {
            $http.post('/fetch_new_job/', {
                job_id: job_id
            }).success(function(response) {
                job=response.job;
                console.log(job);
                $scope.job_id = job.job_id;
                $scope.year_model = job.year;
                $scope.month_model = job.month;
                $scope.cat_model = job.category;
                $scope.man_model = job.manufacture;
                $scope.mod_model = job.model;
                $scope.var_model = job.variant;
                $scope.state_model = job.state;
                $scope.district_model = job.district;
                $scope.city_model = job.city;
                // console.log(job.job_id);
            });
        };
        $scope.fetch_job($scope.job_id);
        

    };










    /////////////// update Modal





    

    $scope.getMasterData = function() {
        $http.post('/getMasterData/', {}).success(function(response) {
            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.variant_names = response.Variant;
        });
    };

    $scope.fetch_locatios_data = function () {
        $http.post('/fetchLocationData/', {}).success(function (response) {
            $scope.locations_data = response;
            locationsService.set_locations_data(response);
        }).error(function (data) {
            alert(data)
        });
    }
    

    $scope.change_job_status = function (job_id,status) {
      var PostData = {
        job_id: job_id,
        status: status,
    };

    $http.post('/change_job_status/', PostData).success(function (response) {
        $scope.cur_old_job = response.cur_old_job;

    });    

};

$scope.fetch_submited_jobs = function(){
    $http.post('/fetch_all_submitedjob/', {}).success(function (response) {
        $scope.all_submitedjob = response;
    });   

}
$scope.fetch_new_jobs = function () {
    $http.post('/fetch_new_jobs/', {}).success(function (response) {
        $scope.new_jobs = response;
    });    

};
$scope.update_status = function (id,status) {
    console.log(id);
    console.log(status);
    var PostData = {
        id:id,
        status:status,
    };
    $http.post('/update_status/', PostData).success(function (response) {
        $scope.new_jobs = response;
        $scope.fetch_submited_jobs();
    });    

};

$scope.fetch_locatios_data();
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

