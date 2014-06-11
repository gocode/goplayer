var app=angular.module('mediaplayer',[]);

app.controller("FileListCtrl", function ($scope, $http, $rootScope) {

	$scope.srcfile = "";
	$scope.breadcrumb = [{Name: "/...", AbsPath: ""}];

    HttpGet("/");

	$scope.play = function(file) {
		if(file.IsDir === true) {
			$scope.breadcrumb.push({Name: file.Name, AbsPath: file.AbsPath});
			HttpGet("/?path=" + file.AbsPath);
		} else {
			var ext = file.Name.substr(file.Name.length - 3);
			if(ext.toLowerCase() === "mp3") {
				$rootScope.audioSrc = "/media/?file=" + file.AbsPath;
				$rootScope.isPlayingAudio = true;
				$rootScope.isPlayingVideo = false;
			} else if (ext.toLowerCase() === "mp4") {
				$rootScope.videoSrc = "/media/?file=" + file.AbsPath;
				$rootScope.isPlayingAudio = false;
				$rootScope.isPlayingVideo = true;
			}
			file.isPlaying = true;
		}	
	};

	$scope.gotoCrumb = function(i, p) {
		$scope.breadcrumb = $scope.breadcrumb.slice(0, i + 1);
		HttpGet("/?path=" + p);
	};

	function HttpGet(path) {
		$http.get(path).success(function(data) {
			$scope.files = data;
		});
	}
});

app.directive("filelist", function() {
	return {
		scope: true,
		restrict: 'E',
      	replace: 'true',
    	templateUrl: './filelist.html'
    };
});