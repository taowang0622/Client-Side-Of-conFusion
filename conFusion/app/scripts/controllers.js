/**
 * Created by taowang on 9/30/2016.
 */
'use strict';
angular.module("confusionApp") //delete empty array [], but why??????????????????
    .controller("MenuController", ['$scope', 'menuFactory', function ($scope, menuFactory) { //by convention, the controller name is UpperCamelCase
        //attributes
        $scope.dishes = menuFactory.getDishes();
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
    .controller('DishDetailController', ['$scope', 'menuFactory', '$stateParams' ,function ($scope, menuFactory, $stateParams) {

        $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));

    }])

    .controller('DishCommentController', ['$scope', function ($scope) {

        $scope.review = {
            author: "",
            rating: "No rating",
            comment:""
        };

        $scope.submitComment = function () {
            $scope.review.date = new Date().toISOString();

            $scope.dish.comments.push($scope.review);
            //$scope.review is just a reference. Don't worry, later on, $scope.review will point to a new object

            //debug
            // console.log($scope.dish.comments[$scope.dish.comments.length - 1]);

            //$scope.review points to a new object with default values.
            $scope.review = {
                author: "",
                rating: "No rating",
                comment:""
            };

            // console.log($scope.review);
            //debug
            $scope.commentForm.$setPristine();
        };
    }])
;



