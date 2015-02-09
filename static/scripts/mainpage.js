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
app.service('rolesService', function($rootScope) {
    var user_roles = [];
    this.get_user_roles = function() {
        return user_roles;
    };
    this.set_user_roles = function(name) {
        user_roles = name;
    };

});
app.service('masterDataService', function($rootScope) {
 var MasterData = [];
 var man_names = [];
 var cat_names = [];
 var variant_names =[]; 

 this.get_MasterData = function() {
    return MasterData;
};
this.set_MasterData = function(name) {
    MasterData = name;
};

this.get_man_names = function() {
    return man_names;
};
this.set_man_names = function(name) {
    man_names = name;
};

this.get_cat_names = function() {
    return cat_names;
};
this.set_cat_names = function(name) {
    cat_names = name;
};

this.get_var_names = function() {
    return var_names;
};
this.set_var_names = function(name) {
    var_names = name;
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


app.controller('SuperAdminController', function ($scope, $modal, $http, LogoutFactory, currentid, locationsService, rolesService) {
    $scope.set_id = function(userid) {
        currentid.set_currentid(userid);
    }
    $scope.$on('getMasterData', function() {
        $scope.getMasterData();
    });
    $scope.$on('fetch_users', function() {
        $scope.fetch_users();
    });
    $scope.$on('displaylips', function() {
        $scope.displayLips();
    });
    $scope.modalShown = false;
    $scope.popUpName='';
    $scope.cur_state='';
    $scope.slaveValues ='';
    $scope.cur_user='';
    $scope.masterValues=['Category', 'Variant', 'Manufacture'];
    // $scope.customFields=[''];
    // $scope.customFields=[{name:'',value:''}];
    

    $scope.toggleModal = function (popup) {
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
    $scope.openAddOrUpdateUser = function(user_id) {
        $scope.fetch_locatios_data();
        $scope.fetch_role_data();
        $scope.set_id(user_id);

        var modalInstance = $modal.open({
            templateUrl: 'addOrUpdateUserModal',
            controller: addOrUpdateUserCtrl,
            backdrop: 'true',
        });
    };

    var addOrUpdateUserCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService, rolesService) {

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('fetch_users');

        };


        $scope.user_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        $scope.user_roles = rolesService.get_user_roles();
        
        $scope.AddOrUpdateUser = function(username, email, password, firstname, lastname, mobile, state, district, city, role) {
            var PostData = {
                username: username,
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                mobile: mobile,
                state: state,
                district: district,
                city: city,
                role: role
            };
            var success = 'User is Successfully Created';
            if ($scope.user_id != "") {
                PostData['User_id'] = $scope.user_id;
                var success = 'User is Successfully Updated';
            }
            console.log(PostData);
            $http.post('/AddOrUpdateUser/', PostData).success(function(response) {
                if (response == '"success"') {
                    $scope.cancel();
                } else if (response == '"exists"') {
                    alert('User Already Exists !')
                } else if (response == '"notcomplete"') {
                    alert('Fill required fields')
                } else if (response == '"UsernameNotValid"') {
                    alert('Special characters are not allowed in username')
                } else if (response == '"EmailNotValid"') {
                    alert('Email provided is not valid')
                } else if (response == '"MobileNotValid"') {
                    alert('Mobile Number provided is not valid')
                }
            });

        };

        $scope.fetch_user_data = function(userid) {
            console.log(userid);

            $scope.username = '';
            var PostData = {
                user_id: userid
            };
            $http.post('/fetchUser/', PostData).success(function(response) {
                console.log(response);
                cur_user = response.user;
                $scope.username = cur_user.username;
                $scope.email = cur_user.email;
                $scope.password = cur_user.password;
                $scope.firstname = cur_user.firstname;
                $scope.lastname = cur_user.lastname;
                $scope.mobile = cur_user.mobile;
                $scope.state_model = cur_user.state;
                $scope.district_model = cur_user.district;
                $scope.city_model = cur_user.city;
                $scope.user_role_model = cur_user.role;
            });
        };
        
        if ($scope.user_id != "") {
            $scope.fetch_user_data($scope.user_id);

        };
    };

    $scope.DeleteUser = function(username) {
        var PostData = {
            username: username
        };
        $http.post('/DeleteUser/', PostData).success(function(response) {
            if (response == '"success"') {
                alert('User ' + username + ' is Deleted Successfully !')
                $scope.fetch_users('user_id');
            }
        });

    };


    $scope.openAddOrUpdateCategory = function(cat_id) {
        $scope.set_id(cat_id);
        $scope.fetchCustomFields='';

        var modalInstance = $modal.open({
            templateUrl: 'addOrUpdateCategoryModal',
            controller: addOrUpdateCategoryCtrl,
            backdrop: 'true',
        });
    };

    var addOrUpdateCategoryCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService, rolesService) {

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('getMasterData');
        };
        $scope.cat_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        $scope.user_roles = rolesService.get_user_roles();

        $scope.AddOrUpdateCategory = function(categoryname, classofvehicle, superstruct, bodytype, fabricatorgrade, fabricatorname, description, updatedon, isactive, customFields) {
            var PostData = {
                'categoryname': categoryname,
                'classofvehicle': classofvehicle,
                'superstruct': superstruct,
                'bodytype': bodytype,
                'fabricatorgrade': fabricatorgrade,
                'fabricatorname': fabricatorname,
                'description': description,
                'updatedon': updatedon,
                'isactive': isactive,
                'master': 'Cmaster',
                'CustomFields': customFields
            };
            console.log(PostData);
            var success = 'Category is Successfully Created';
            if ($scope.cat_id != "") {
                PostData['cur_category'] = $scope.cat_id;
                var success = 'Category is Successfully Updated';
            }
            $http({
                url: '/superadmin_dashboard/',
                method: "POST",
                data: PostData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(response) {
                if (response == '"categoryname"') {
                    alert('Category name is required !!!')
                } else if (response == '"exists"') {
                    alert('Category Already Exists !')
                } else if (response == '"success"') {
                    $scope.cancel();
                }
            }).error(function(data) {
                alert(data);

            });
        };

        $scope.fetchCustomFields = function(master){
            var postData = {
                master: master,
            }
            $http.post('/fetchCustomFields/',postData).success(function(response){
                $scope.customFields = response;
            });
        };
        if ($scope.cat_id == "") {
            $scope.fetchCustomFields("Category");
        }
        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {
            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.model_names = response.Model;
            $scope.variant_names = response.Variant;

        });
        };
        $scope.getMasterData();

        $scope.fetch_category = function(cat_name) {
            $http.post('/fetchCategory/', {
                cat_name: cat_name
            }).success(function(response) {
            $scope.CUR_CATEGORY = cat_name;
            console.log($scope.CUR_CATEGORY)
            $scope.categoryname = response.cat_name;
            $scope.classofvehicle = response.classofvehicle;
            $scope.superstruct = response.superstruct;
            $scope.bodytype = response.bodytype;
            $scope.fabricatorgrade = response.fabricatorgrade;
            $scope.fabricatorname = response.fabricatorname;
            $scope.description = response.description;
            $scope.isactive = response.isactive;
            $scope.customFields=response.CustomFields;

        });
        };

        if ($scope.cat_id != "") {
            $scope.fetch_category($scope.cat_id);
        };

    };

    $scope.DeleteCategory = function (cat_name) {
        console.log(cat_name);
        $http.post('/DeleteCategory/', {cat_name: cat_name}).success(function (response) {
         if (response == '"success"') {alert('Category Master '+cat_name+' is Deleted Successfully !'); $scope.getMasterData();}        
        });

    };

//--------//

$scope.openAddOrUpdateManufacture = function(man_id) {
        $scope.set_id(man_id);
        $scope.fetchCustomFields='';


        var modalInstance = $modal.open({
            templateUrl: 'addOrUpdateManufactureModal',
            controller: addOrUpdateManufactureCtrl,
            backdrop: 'true',
        });
    };

    var addOrUpdateManufactureCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService, rolesService) {

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('getMasterData');

        };
        $scope.man_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        $scope.user_roles = rolesService.get_user_roles();

    $scope.AddOrUpdateManufacture = function(manufacturename, category, description, isactive, customFields) {
        var postData = {
            'manufacturename': manufacturename,
            'category': category,
            'description': description,
            'isactive': isactive,
            'master': 'Mmaster',
            'CustomFields': customFields
        };
        console.log(postData)
        var success = 'Manufacture Master is Successfully created';
        if ($scope.man_id != "") {
            postData['cur_manufacture'] = $scope.man_id;
            var success = 'Manufacture Master is Successfully Updated'
        }
        $http({
            url: '/superadmin_dashboard/',
            method: "POST",
            data: postData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            if (response == '"Manufacture name"' || response == '"Category"') {
                alert(response + ' is required !!!')
            } else if (response == '"exists"') {
                alert('Manufacture Already Exists !')
            } else if (response == '"success"') {
                $scope.getMasterData();
                $scope.cancel();
            }
        }).error(function(data) {
            alert(data)
        });
    };

        $scope.fetchCustomFields = function(master){
            var postData = {
                master: master,
            }
            $http.post('/fetchCustomFields/',postData).success(function(response){
                $scope.customFields = response;
            });
        };
        if ($scope.man_id == "") {
            $scope.fetchCustomFields("Manufacture");
        }
        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {
            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.model_names = response.Model;
            $scope.variant_names = response.Variant;
        });
        };
        $scope.getMasterData();

        $scope.fetch_manufacture = function(manufacture_id) {
        $http.post('/fetchManufacture/', {
            manufacture_id: manufacture_id
        }).success(function(response) {
            $scope.man_id = manufacture_id;
            $scope.manufacturename = response.manufacturename;
            $scope.category = response.category;
            $scope.description = response.description;
            $scope.isactive = response.isactive;
            $scope.customFields=response.CustomFields;

        });
    };

        if ($scope.man_id != "") {
            $scope.fetch_manufacture($scope.man_id);
        };


    };

    $scope.DeleteManufacture = function (manufacture_id) {
        $http.post('/DeleteManufacture/', {manufacture_id: manufacture_id}).success(function (response) {
         if (response == '"success"') {alert('Manufacture Master is Deleted Successfully !'); $scope.getMasterData();}        
        });

    };



    //--------//

$scope.openAddOrUpdateModel = function(mod_id) {
        $scope.set_id(mod_id);
        $scope.fetchCustomFields='';
        

        var modalInstance = $modal.open({
            templateUrl: 'addOrUpdateModelModal',
            controller: addOrUpdateModelCtrl,
            backdrop: 'true',
        });
    };

    var addOrUpdateModelCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService, rolesService) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('getMasterData');
        };
        $scope.mod_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        $scope.user_roles = rolesService.get_user_roles();

    $scope.AddOrUpdateModel = function(modelname, manufacture, customFields) {
        var postData = {
            'modelname': modelname,
            'manufacture': manufacture,
            'master': 'MOmaster',
            'CustomFields': customFields
        };
        var success = 'Model Master is Successfully Created'
        if ($scope.mod_id != "") {
            postData['cur_model'] = $scope.mod_id;
            var success = 'Model Master is Successfully Updated'
        }
        $http({
            url: '/superadmin_dashboard/',
            method: "POST",
            data: postData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            console.log(response);            
            if (response == '"Model name"' || response == '"Manufacture"') {
                alert(response + ' is required !!!')
            } else if (response == '"exists"') {
                alert('Model Already Exists !')
            } else if (response == '"success"') {
                $scope.cancel();                
            }
        }).error(function(data) {
            alert(data)
        });
    };
        $scope.fetchCustomFields = function(master){
            var postData = {
                master: master,
            }
            $http.post('/fetchCustomFields/',postData).success(function(response){
                $scope.customFields = response;
            });
        };
        if ($scope.mod_id == "") {
            $scope.fetchCustomFields("Variant");
        }
        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {

            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.model_names = response.Model;
            $scope.variant_names = response.Variant;
            
        });

        };
        $scope.getMasterData();

        $scope.fetch_model = function(model_id) {
            $http.post('/fetchModel/', {
                model_id: model_id
            }).success(function(response) {
                $scope.mod_id = model_id;
                $scope.modelname = response.modelname;
                $scope.manufacture = response.manufacture;
                $scope.customFields=response.CustomFields;
            });
        };

        if ($scope.mod_id != "") {
            $scope.fetch_model($scope.mod_id);
        };
    };

    $scope.DeleteModel = function (model_id) {
        $http.post('/DeleteModel/', {model_id: model_id}).success(function (response) {
         if (response == '"success"') {alert('Model Master is Deleted Successfully !'); $scope.getMasterData();}        
        });

    };

    //--------//

$scope.openAddOrUpdateVariant = function(var_id) {
        $scope.set_id(var_id);
        $scope.fetchCustomFields='';
        

        var modalInstance = $modal.open({
            templateUrl: 'addOrUpdateVariantModal',
            controller: addOrUpdateVariantCtrl,
            backdrop: 'true',
        });
    };

    var addOrUpdateVariantCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService, rolesService) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('getMasterData');
        };
        $scope.var_id = currentid.get_currentid();
        $scope.locations_data = locationsService.get_locations_data();
        $scope.user_roles = rolesService.get_user_roles();

    $scope.AddOrUpdateVariant = function(model, variant, isobsolute, customFields) {
        var postData = {
            'model': model,
            'variant': variant,
            'isobsolute': isobsolute,
            'master': 'Vmaster',
            'CustomFields': customFields
        };
        var success = 'Variant Master is Successfully Created'
        if ($scope.var_id != "") {
            postData['cur_variant'] = $scope.var_id;
            var success = 'Variant Master is Successfully Updated'
        }
        $http({
            url: '/superadmin_dashboard/',
            method: "POST",
            data: postData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            console.log(response);            
            if (response == '"Model name"' || response == '"Variant"' || response == '"Manufacture"') {
                alert(response + ' is required !!!')
            } else if (response == '"exists"') {
                alert('Variant Already Exists !')
            } else if (response == '"success"') {
                $scope.cancel();                
            }
        }).error(function(data) {
            alert(data)
        });
    };
        $scope.fetchCustomFields = function(master){
            var postData = {
                master: master,
            }
            $http.post('/fetchCustomFields/',postData).success(function(response){
                $scope.customFields = response;
            });
        };
        if ($scope.var_id == "") {
            $scope.fetchCustomFields("Variant");
        }
        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {

            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.model_names = response.Model;
            $scope.variant_names = response.Variant;
        });

        };
        $scope.getMasterData();

        $scope.fetch_variant = function(variant_id) {
            console.log(variant_id)
            $http.post('/fetchVariant/', {
                variant_id: variant_id
            }).success(function(response) {
                $scope.var_id = variant_id;
                $scope.model = response.model;
                $scope.variant = response.variant;
                $scope.isobsolute = response.isobsolute;
                $scope.customFields=response.CustomFields;
            });
        };

        if ($scope.var_id != "") {
            $scope.fetch_variant($scope.var_id);
        };
    };

    // ----------- 

    $scope.DeleteVariant = function (variant_id) {
        $http.post('/DeleteVariant/', {variant_id: variant_id}).success(function (response) {
         if (response == '"success"') {alert('Variant Master is Deleted Successfully !'); $scope.getMasterData();}        
        });

    };  

    $scope.getMasterData = function () {
        $http.post('/getMasterData/', {}).success(function (response) {
            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.model_names = response.Model;
            $scope.variant_names = response.Variant;              
        });
    }; 




    $scope.AddOrUpdateCustomField = function(master, field){
        var postData = {
            'custom_master': master,
            'field': field,
            'master': 'Custom'
        };
        var success = 'Custom Field is Successfully Created'
        if ($scope.CUR_CUSTOMFIELD != ""){
            postData['cur_CustomField'] = $scope.CUR_CUSTOMFIELD;
            var success = 'Custom Field is Successfully Updated'
        }
        console.log(postData)
        $http.post('/superadmin_dashboard/', postData).success(function (response) {
        	if (response == '"exists"'){alert('Entry Already Exists !')}
            else if (response == '"notcomplete"'){alert('Fill All Fields')}
            else if (response == '"success"') {
            	 alert(success);
                 $scope.DisplayCustomFields();
            	 $scope.modalShown = !$scope.modalShown;
            }
        }).error(function(data){
        	alert('Error  '+data)
        });
    }

    $scope.fetch_locatios_data = function () {
        $http.post('/fetchLocationData/', {}).success(function (response) {
            $scope.locations_data = response;
            locationsService.set_locations_data(response);
        }).error(function (data) {
            alert(data)
        });
    }

    $scope.add_location = function (state, district, city, text) {
        var PostData = {
            state: state,
            district: district,
            city: city,            
            text: text
        };
        if ($scope.cur_location != ''){PostData['cur_location'] = $scope.cur_location;}
        // console.log(PostData)
        $http.post('/addLocation/', PostData).success(function (response) {
            
        	if (response == '"exists"'){alert('Already Exists !')}
            else if (response == '"noData"'){alert('No data !!!')}    
            else if (response == '"success"'){
                $scope.Sedit='off';
                $scope.Dedit='off';
                $scope.Cedit='off';
                $scope.cur_location = '';
                $scope.fetch_locatios_data();
            }
        }).error(function(data){
        	if (text=='District'){var msg = 'State';}
        	else if (text=='City'){var msg = 'District';}
        	alert('select any '+msg+' under which you want to add the '+text)
        });

    };

    $scope.delete_location = function (state, district, city, text) {
        var PostData = {
            state: state,
            district: district,
            city: city,            
            text: text
        };
        // console.log(PostData)
        $http.post('/deleteLocation/', PostData).success(function (response) {
        	alert('Deleted !')
            $scope.fetch_locatios_data();
            if(text == 'State'){
                $scope.cur_state = '';
                $scope.cur_district = '';
            }
            else if(text == 'District'){
                $scope.cur_district = '';
                $scope.cur_city = '';
            }
            else if(text == 'City'){
                $scope.cur_city = '';
            }
        }).error(function(data){
        	alert('select any '+text+' to be deleted')
        });

    };

    $scope.change_location = function(location, category){
    	// $scope.cur_state = ''
    	// alert('///'+location+category+$scope.cur_state)

    	if (category == 'state'){
    		$scope.cur_state = location;
    		$scope.cur_district = '';
            $scope.cur_city = '';
            // $scope.DISTRICTS = Object.keys($scope.locations_data[location])
    	}
    	else if (category == 'district'){
    		// console.log($scope.cur_state)
    		$scope.cur_district = location;
            $scope.cur_city = '';
    	}
    	else if (category == 'city'){
    		$scope.cur_city = location;
    	}
    }

   // $scope.AddOrUpdateRole = function(role){
   //      var PostData = {role: role};
   //      var success = 'Role is Successfully Created';
   //      if ($scope.cur_role != ""){
   //          PostData['oldRole'] = $scope.cur_role;
   //          var success = 'Role '+role+' is Successfully Updated';
   //      }
   // 	    // console.log(PostData)
   //      $http.post('/AddOrUpdateRole/',PostData).success(function(response){
   //          if (response=='"exists"'){alert('Already Exists')}
   //          else {alert(success);$scope.fetch_role_data();$scope.modalShown = !$scope.modalShown;}
   // 	    });
   // }

     $scope.fetch_role_data = function () {
        $http.post('/fetchRoles/', {}).success(function (response) {
            rolesService.set_user_roles(response.roles);
        	// $scope.Roles = response.roles;
        	// console.log(response.roles);
        });

    };
    $scope.Change_Item = function (item, data){
    	if (item=='role'){$scope.Role = data}
    }
    
   

   $scope.fetch_users = function (){
    $http.post('/fetchUsers/',{}).success(function(response){
        $scope.Users = response;
    });
   
   };

    $scope.fetch_user_data = function (user_id){
        var PostData = {user_id: user_id};
        $http.post('/fetchUser/',PostData).success(function(response){
        // console.log(response)
            $scope.CUR_ID = user_id;
            cur_user = response.user;
            $scope.username = cur_user.username;
            $scope.email = cur_user.email;
            $scope.password = cur_user.password;
            $scope.firstname = cur_user.firstname;
            $scope.lastname = cur_user.lastname;
            $scope.mobile = cur_user.mobile;
            $scope.state_model = cur_user.state;
            $scope.district_model = cur_user.district;
            $scope.city_model = cur_user.city;
            $scope.Role = cur_user.role;
    });

   
   };


   // $scope.cleardata= function(){
   //              $scope.CUR_ID ='' ;
   //          cur_user ='' ;
   //          $scope.username ='' ;
   //          $scope.email ='' ;
   //          $scope.password ='' ;
   //          $scope.firstname ='' ;
   //          $scope.lastname ='' ;
   //          $scope.state_model ='' ;
   //          $scope.district_model ='' ;
   //          $scope.city_model ='' ;
   //          $scope.Role ='' ;

   // }

   $scope.fetch_years = function(){
    var max = new Date().getFullYear();
    $scope.YEARS = []
    for (i=max; i>=1950; i--){
      $scope.YEARS.push(i) 
    }
    $scope.MONTHS = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    // if (year == 'vehicleYear') {
    //     $http.post('/fetchVehicleYears/', {}).success(function(response){
    //     $scope.vehicle_years = response;
    //     });
    // }
   }

   $scope.AddOrUpdateVehicleYear = function (year,month,cat_name,man_name,mod_name,var_name){
        var PostData = {
            year: year,
            month: month,
            cat_name: cat_name,
            man_name: man_name,
            mod_name: mod_name,
            var_name: var_name
        };
        var success = 'New Vehicle Year is saved';
        if ($scope.CUR_VEHICLEYEAR != "") {
            PostData['cur_VehicleYear'] = $scope.CUR_VEHICLEYEAR;
            var success = 'Vehicle Year is Successfully Updated'; 
        }
        $http.post('/AddOrUpdateVehicleYear/',PostData).success(function(response){
                if (response == '"success"'){alert(success);$scope.modalShown = !$scope.modalShown;}
                else if (response == '"exists"'){alert('Entry Already Exists !')}
                else if (response == '"notcomplete"'){alert('Fill All fields')}
            // $scope.Users = response;

        });
   
   };





    //--------//

$scope.openAddOrUpdateConvLip = function(lip_id) {
        $scope.set_id(lip_id);
        console.log(lip_id);
        

        var modalInstance = $modal.open({
            templateUrl: 'addOrUpdateConvLipModal',
            controller: addOrUpdateConvLipCtrl,
            backdrop: 'true',
        });
    };

    var addOrUpdateConvLipCtrl = function($q, $rootScope, $timeout, $scope, $http, $modalInstance, $location, currentid, locationsService, rolesService) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('displaylips');
        };
        $scope.lip_id = currentid.get_currentid();
        console.log(currentid.get_currentid());
        $scope.locations_data = locationsService.get_locations_data();
        $scope.user_roles = rolesService.get_user_roles();
        $scope.fetch_years = function(){
            var max = new Date().getFullYear();
            $scope.YEARS = []
            for (i=max; i>=1950; i--){
              $scope.YEARS.push(i) 
            }
            $scope.MONTHS = ['1','2','3','4','5','6','7','8','9','10','11','12'];

           }
           $scope.fetch_years();

    $scope.AddOrUpdateConvLip = function (state,district,city,lipprice,idvprice,description,cat_name,man_name,mod_name,var_name,isobsolute,vehiclemodel,month){
        var PostData = {
            state: state,
            district: district,
            city: city,
            lipprice: lipprice,
            idvprice: idvprice,
            description: description,
            cat_name: cat_name,
            man_name: man_name,
            mod_name: mod_name,
            var_name: var_name,
            isobsolute: isobsolute,
            vehiclemodel: vehiclemodel,
            month: month
        }
        var success = 'ConvLip is Successfully Created';
        if ($scope.CUR_LIP != "") {
            PostData['cur_lip'] = $scope.CUR_LIP;
            var success = 'ConvLip is Successfully Updated'; 
        }
        $http.post('/AddOrUpdateConvLip/',PostData).success(function(response){
                if (response == '"success"'){$scope.cancel()}
                else if (response == '"exists"'){alert('Entry Already Exists !')}
                else if (response == '"notcomplete"'){alert('Fill All fields')}

        });
       
    };

        $scope.getMasterData = function() {
            $http.post('/getMasterData/', {}).success(function(response) {

            $scope.MasterData = response.MasterData;
            $scope.man_names = response.Manufacture;
            $scope.cat_names = response.Category;
            $scope.model_names = response.Model;
            $scope.variant_names = response.Variant;
        });

        };
        $scope.getMasterData();

        $scope.fetch_lip = function(lip_id){

            var PostData = {lip_id: lip_id};

            $http.post('/fetchLip/',PostData).success(function(response){
                console.log($scope.CUR_LIP)
                $scope.CUR_LIP = lip_id;
                $scope.state_model = response.state;
                $scope.district_model = response.district;
                $scope.city_model = response.city;
                $scope.isobsolute = response.isobsolute;        
                $scope.lipprice = response.lipprice;
                $scope.idvprice = response.idvprice;
                $scope.description = response.description;
                $scope.cat_name = response.cat_name;
                $scope.man_name = response.man_name; 
                $scope.mod_name = response.mod_name;
                $scope.var_name = response.var_name;
                $scope.vehiclemodel = response.vehiclemodel;
                $scope.month = response.month;                     
            });     
        };
        console.log($scope.lip_id);

        if ($scope.lip_id != "") {
            $scope.fetch_lip($scope.lip_id);
        };
    };

    // ----------- 




   $scope.AddOrUpdateConvLip = function (state,district,city,lipprice,description,cat_name,man_name,mod_name,var_name,isobsolute,vehiclemodel,month){
        var PostData = {
            state: state,
            district: district,
            city: city,
            lipprice: lipprice,
            description: description,
            cat_name: cat_name,
            man_name: man_name,
            mod_name: mod_name,
            var_name: var_name,
            isobsolute: isobsolute,
            vehiclemodel: vehiclemodel,
            month: month
        }
        var success = 'ConvLip is Successfully Created';
        if ($scope.CUR_LIP != "") {
            PostData['cur_lip'] = $scope.CUR_LIP;
            var success = 'ConvLip is Successfully Updated'; 
        }
        $http.post('/AddOrUpdateConvLip/',PostData).success(function(response){
                if (response == '"success"'){alert(success);$scope.modalShown = !$scope.modalShown;$scope.displayLips()}
                else if (response == '"exists"'){alert('Entry Already Exists !')}
                else if (response == '"notcomplete"'){alert('Fill All fields')}
            // $scope.Users = response;

        });
       
    };

  
    $scope.displayLips = function(){
        $http.post('/displayLips/', {}).success(function (response) {
            // console.log(response)
            $scope.LipDispalyData = response;                 
        });    
    };

    $scope.fetch_lip = function(lip_id,city,district,state,lipprice,description,cat_name,man_name,mod_name,var_name,isobsolute,vehiclemodel,month){
        $scope.CUR_LIP = lip_id;

        console.log($scope.CUR_LIP)
        $scope.state_model = state;
        $scope.district_model = district;
        $scope.city_model = city;
        $scope.isobsolute = isobsolute;        
        $scope.lipprice = lipprice;
        $scope.description = description;
        $scope.cat_name = cat_name;
        $scope.man_name = man_name; 
        $scope.mod_name = mod_name;
        $scope.var_name = var_name;
        $scope.vehiclemodel = vehiclemodel;          
    };

    $scope.DeleteLip = function (lip_id) {
        var postData = {
            lip_id: lip_id,
        }
        $http.post('/DeleteLip/', postData).success(function (response) {
         if (response == '"success"') {alert('Conv Lip is Deleted Successfully !'); $scope.displayLips();}        
        });

    };

    $scope.DisplayVehicleYear = function(){
        $http.post('/DisplayVehicleYear/', {}).success(function (response) {
            // console.log(response)
            $scope.VehicleYearDispalyData = response;                 
        });    
    };

    $scope.fetch_VehicleYear = function(VehicleYear_id,year,month,category,manufacture,model,variant){
        $scope.CUR_VEHICLEYEAR = VehicleYear_id;

        console.log($scope.CUR_VEHICLEYEAR)
        $scope.year = year;
        $scope.month = month;
        $scope.cat_name = category;
        $scope.man_name = manufacture; 
        $scope.mod_name = model;
        $scope.var_name = variant;
    };

    $scope.DeleteVehicleYear = function (VehicleYear_id) {
        var postData = {
            VehicleYear_id: VehicleYear_id,
        }
        $http.post('/DeleteVehicleYear/', postData).success(function (response) {
         if (response == '"success"') {alert('Vehicle Year is Deleted Successfully !'); $scope.DisplayVehicleYear();}        
        });

    };

    $scope.DisplayCustomFields = function(){
        $http.post('/DisplayCustomFields/', {}).success(function (response) {
            // console.log(response)
            $scope.CustomFieldDisplayData = response;                 
        });    
    };

    $scope.fetch_CustomField = function(master,field){
        $scope.CUR_CUSTOMFIELD = {
            custom_master: master,
            field: field,
        }
        console.log($scope.CUR_CUSTOMFIELD)
        $scope.masterValue = master;
        $scope.field = field;
    };

    $scope.DeleteCustomField = function (master,field) {
        var postData = {
            master: master,
            field: field,
        }
        $http.post('/DeleteCustomField/', postData).success(function (response) {
         if (response == '"success"') {alert('Custom Field is Deleted Successfully !'); $scope.DisplayCustomFields();}        
        });

    };


    $scope.fetch_update_logs = function (){
        console.log("entered");
    $http.post('/fetchupdatelog/',{}).success(function(response){
        $scope.logs = response;
    });


   
   };
   $scope.changeStatusInUpdateLog= function(log_id,status){
     var postData = {
            log_id: log_id,
            status: status
        }
        $http.post('/changestatusinupdatelog/', postData).success(function (response) {
         if (response == '"success"') {alert('Status updated Successfully !'); $scope.fetch_update_logs();}        
        });
   };








});

