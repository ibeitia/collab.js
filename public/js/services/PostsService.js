angular.module('collabjs.services')
  .service('postsService', ['$http', '$q', function ($http, $q) {
    'use strict';
    return {
      getNews: function (topId) {
        var d = $q.defer()
          , options = {
            headers: { 'last-known-id': topId }
          };

        $http.get('/api/news', options)
          .success(function (data) { d.resolve(data || []); });
        return d.promise;
      },
      getNewsUpdatesCount: function (topId) {
        var d = $q.defer()
          , options = {
            headers: {
              'last-known-id': topId,
              'retrieve-mode': 'count-updates'
            }
          };
        $http.get('/api/news', options)
          .success(function (data) { d.resolve(data.posts || 0); })
          .error(function () { d.resolve(0); });
        return d.promise;
      },
      getNewsUpdates: function (topId) {
        var d = $q.defer()
          , options = {
            headers: {
              'last-known-id': topId,
              'retrieve-mode': 'get-updates'
            }
          };
        $http.get('/api/news', options)
          .success(function (data) { d.resolve(data || []); });
        return d.promise;
      },
      getWall: function (account, topId) {
        var d = $q.defer()
          , query = '/api/people/' + account + '/timeline';
        if (topId) { query = query + '?topId=' + topId; }
        $http.get(query)
          .success(function (data) { d.resolve(data); })
          .error(function (data) { d.reject(data); });
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
      getPostsByTag: function (tag, topId) {
        var d = $q.defer()
          , options = { headers: { 'last-known-id': topId } };
        $http.get('/api/explore/' + tag, options)
          .success(function (data) { d.resolve(data || []); });
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
      createPost: function (content) {
        var d = $q.defer();
        $http
          .post('/api/timeline/posts', { content: content })
          .then(function (res) { d.resolve(res.data); });
        return d.promise;
      },
      addComment: function (postId, content) {
        var d = $q.defer();
        $http
          .post('/api/timeline/comments', { postId: postId, content: content })
          .then(function (res) { d.resolve(res.data); });
        return d.promise;
      },
      deleteNewsPost: function (postId) {
        var d = $q.defer();
        $http
          .delete('/api/news/' + postId)
          .then(function (res) { d.resolve(res); });
        return d.promise;
      },
      deleteWallPost: function (postId) {
        var d = $q.defer();
        $http
          .delete('/api/wall/' + postId)
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