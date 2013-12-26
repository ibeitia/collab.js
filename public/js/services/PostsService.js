angular.module('collabjs.services')
  .service('postsService', ['$http', '$q', function ($http, $q) {
    'use strict';
    return {
      getNews: function (topId) {
        var d = $q.defer()
          , query = '/api/timeline/posts';
        if (topId) { query = query + '?topId=' + topId; }
        $http.get(query).success(function (data) { d.resolve(data || []); });
        return d.promise;
      },
      getNewsUpdatesCount: function (topId) {
        var d = $q.defer()
          , query = '/api/timeline/updates/count?topId=' + topId;
        $http.get(query)
          .success(function (data) { d.resolve(data.posts || 0); })
          .error(function () { d.resolve(0); });
        return d.promise;
      },
      getNewsUpdates: function (topId) {
        var d = $q.defer()
          , query = '/api/timeline/updates?topId=' + topId;
        $http.get(query).success(function (data) { d.resolve(data || []); });
        return d.promise;
      },
      getWall: function (account, topId) {
        var d = $q.defer()
          , query = '/api/people/' + account + '/timeline';
        if (topId) { query = query + '?topId=' + topId; }
        $http.get(query).success(function (data) { d.resolve(data); });
        return d.promise;
      },
      getMentions: function (topId) {
        var d = $q.defer()
          , query = '/api/mentions';
        if (topId) { query = query + '?topId=' + topId; }
        $http.get(query).success(function (data) { d.resolve(data || []); });
        return d.promise;
      },
      getPostById: function (postId) {
        var d = $q.defer()
          , query = '/api/timeline/posts/' + postId;
        $http.get(query)
          .success(function (res) { d.resolve(res); })
          .error(function (data) { d.reject(data); });
        return d.promise;
      },
      // TODO: turn into filter
      getPostUrl: function (postId) {
        return postId ? '/timeline/posts/' + postId : null;
      },
      getPostComments: function (postId) {
        var d = $q.defer();
        $http.get('/api/timeline/posts/' + postId + '/comments').success(function (data) {
          d.resolve(data);
        });
        return d.promise;
      },
      createPost: function (token, content) {
        var d = $q.defer()
          , post = { _csrf: token, content: content }
          , options = { headers: { 'x-csrf-token': token }, xsrfHeaderName : 'x-csrf-token' };
        $http
          .post('/api/timeline/posts', post, options)
          .then(function (res) { d.resolve(res.data); });
        return d.promise;
      },
      addComment: function (token, postId, content) {
        var d = $q.defer()
          , comment = { _csrf: token, postId: postId, content: content }
          , options = { headers: { 'x-csrf-token': token }, xsrfHeaderName : 'x-csrf-token' };
        $http
          .post('/api/timeline/comments', comment, options)
          .then(function (res) { d.resolve(res.data); });
        return d.promise;
      },
      deletePost: function (postId, token) {
        var d = $q.defer()
          , options = { headers: { 'x-csrf-token': token }, xsrfHeaderName : 'x-csrf-token' };
        $http
          .delete('/api/timeline/posts/' + postId, options)
          .then(function (res) { d.resolve(res); });
        return d.promise;
      },
      loadPostComments: function (post, callback) {
        if (post && post.id) {
          $http.get('/api/timeline/posts/' + post.id + '/comments').success(function (data) {
            post.comments = data || [];
            if (callback) {
              callback(post);
            }
          });
        }
      }
    };
  }]);