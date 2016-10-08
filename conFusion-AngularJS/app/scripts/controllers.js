/**
 * Created by taowang on 9/30/2016.
 */
'use strict';
angular.module("confusionApp") //delete empty array [], but why??????????????????
    .controller("MenuController", ['$scope', 'menuFactory', function ($scope, menuFactory) { //by convention, the controller name is UpperCamelCase
        //attributes
        $scope.showMenu = false;
        $scope.message = "loading...";

        menuFactory.getDishes().query(
            function (response) {
                //The big difference between $http and $resource is when request successful, the returned response object
                //is just wanted data, not including the state of response, etc.
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        //methods
        $scope.selectTab = function (tab) {
            this.tab = tab;
            if (2 === tab) {
                this.filtText = "appetizer";
            }
            else if (3 === tab) {
                this.filtText = "mains";
            }
            else if (4 === tab) {
                this.filtText = "dessert";
            }
            else //while clicking the first tab, show all menu
            {
                this.filtText = '';
            }
        };

        $scope.isSelected = function (tab) {
            return tab === this.tab;
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])
    .controller("ContactController", ['$scope', function ($scope) {
        $scope.feedback = {
            myChannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        $scope.channels =
            [{value: "tel", label: "Tel."}, {value: "email", label: "Email"}];

        $scope.invalidChannelSelection = false;

    }])
    .controller('FeedbackController', ['$scope', '$window', function ($scope, $window) {
        // child controller has access to all the elements, including DOM elements, in parent controller's scope
        $scope.sendFeedback = function () {
            $window.console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.myChannel === "")) {
                $scope.invalidChannelSelection = true;
                $window.console.log("incorrect");
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    myChannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedback.myChannel = "";
                //set the whole feedback form back to be pristine
                //feedbackForm is the value of name attribute of form tag
                $scope.feedbackForm.$setPristine();
                $window.console.log($scope.feedback);
            }
        };
    }])
    .controller('DishDetailController', ['$scope', 'menuFactory', '$stateParams', function ($scope, menuFactory, $stateParams) {
        $scope.showDish = false;
        $scope.message = "loading..";

        menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)}).$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        )

    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.review = {
            author: "",
            rating: 5,
            comment: ""
        };

        $scope.submitComment = function () {
            $scope.review.date = new Date().toISOString();

            $scope.dish.comments.push($scope.review);
            //$scope.review is just a reference. Don't worry, later on, $scope.review will point to a new object

            //submit the user's review about a dish to the server
            //Remember: all resources are located with URL in web application!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //so the first assignment of update() is not a filter but a "URL assignment" in the dishes/:id in the services.js
            menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);

            //$scope.review points to a new object with default values.
            $scope.review = {
                author: "",
                rating: 5,
                comment: ""
            };

            $scope.commentForm.$setPristine();
        };
    }])
    //IndexController controlls the home page
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        $scope.showDish = false;
        $scope.message = "loading";

        menuFactory.getDishes().get({id: 0}).$promise.then(
            function (response) {
                $scope.featuredDish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.featuredPromotion = menuFactory.getPromotion(0);
        $scope.executiveChef = corporateFactory.getLeader(3);
    }])
    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();
    }])
;



