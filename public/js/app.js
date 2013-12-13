angular.module('collabjs', [
    'ngRoute',
    'ngSanitize',
    'collabjs.services',
    'collabjs.filters',
    'collabjs.directives',
    'collabjs.controllers',
    'angularMoment',
    'infinite-scroll',
    'ui.select2',
    'chieffancypants.loadingBar',
    'ngAnimate'
  ])
  .config(['$routeProvider', 'cfpLoadingBarProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/news', { template: '<div ng-include="templateUrl"></div>', controller: 'NewsController' })
      .when('/people', { templateUrl: '/partials/people', controller: 'PeopleListController' })
      .when('/people/:account', { templateUrl: '/partials/wall', controller: 'WallController' })
      .when('/people/:account/following', { templateUrl: '/partials/following', controller: 'FollowingController' })
      .when('/people/:account/followers', { templateUrl: '/partials/followers', controller: 'FollowersController' })
      .when('/mentions', { templateUrl: '/partials/mentions', controller: 'MentionsController' })
      .when('/posts/:postId', { templateUrl: '/partials/post', controller: 'PostController' })
      .when('/account', { templateUrl: '/partials/account', controller: 'AccountController' })
      .when('/account/password', { templateUrl: '/partials/password', controller: 'PasswordController' })
      .when('/search', { templateUrl: '/partials/search', controller: 'SearchController' })
      .when('/help/:article?', { templateUrl: '/partials/help', controller: 'HelpController' })
      .otherwise({ redirectTo: '/news' });
  }]);

angular.module('collabjs.controllers', []);