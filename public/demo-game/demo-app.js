/* global angular, isMobile, initialize_swiper */
'use strict';

function isEmpty(val) {
    return val === undefined || val === null || val === '';
}

angular.module('ngClickCopy', [])
    .service('ngCopy', ['$window', function ($window) {
        var body = angular.element($window.document.body);
        var textarea = angular.element('<textarea/>');
        textarea.css({ position: 'fixed', opacity: '0' });
        return function (toCopy) {
            textarea.val(toCopy);
            body.append(textarea);
            textarea[0].select();
            try {
                if (!document.execCommand('copy')) {
                    throw new Error('copy');
                }
            } catch (err) {
                window.prompt('Copy to clipboard: Ctrl+C, Enter', toCopy);
            }
            textarea.remove();
        };
    }])
    .directive('ngClickCopy', ['ngCopy', function (ngCopy) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    ngCopy(attrs.ngClickCopy);
                });
            }
        };
    }]);

var HITLIST_DEMO_INFOBAR_DATA = [
    { blurb: { text: 'Tap the circle to play for a prize!', style: { 'font-size': '16px' } }, imgSrc: '', icon: { loc: 'R', src: 'click-above' }, betweenSeconds: 1, displaySeconds: 8, style: { CSSID: '1', CSSTYPE: '1', myInfoBarElementData: { 'font-size': '16px;' } }, id: 1, showOnce: 0, active: false, display: true },
    { blurb: { text: 'Be the hit that lands', text2: 'on the winning number', style: { 'font-size': '16px;' } }, imgSrc: '', icon: { loc: 'R', src: 'trophy-star' }, betweenSeconds: 1, displaySeconds: 9, style: { CSSID: '2', myInfoBarElementData: { 'font-size': '18px' } }, id: 2, showOnce: 0, active: false, display: true },
    { blurb: { text: 'Hurry! Others are hitting the button too', style: { 'font-size': '16px' } }, imgSrc: '', icon: { loc: '', src: 'timer' }, betweenSeconds: 1, displaySeconds: 8, style: { CSSID: '3', myInfoBarElementData: { 'font-size': '18px' } }, id: 3, showOnce: 0, active: false, display: true },
    { blurb: { text: 'Each tap contributes a small donation to charity.', text2: ' Every hit adds up!', style: { 'font-size': '16px' } }, imgSrc: '', icon: { loc: 'R', src: 'donation' }, betweenSeconds: 1, displaySeconds: 13, style: { CSSID: '4', myInfoBarElementData: { 'font-size': '18px' } }, id: 4, showOnce: 0, active: false, display: true },
    { blurb: { text: 'When you land on a winning number you will ', text2: 'receive one of the four prizes.', style: { 'font-size': '16px' } }, imgSrc: '', icon: { loc: 'R', src: 'first-place' }, betweenSeconds: 1, displaySeconds: 17, style: { CSSID: '5', myInfoBarElementData: { 'font-size': '18px' } }, id: 5, showOnce: 0, active: false, display: true },
    { blurb: { text: 'Tap a prize image to unlock higher-tier rewards. It\'s easy!', style: { 'font-size': '16px' } }, imgSrc: '', icon: { loc: 'R', src: 'click' }, betweenSeconds: 1, displaySeconds: 8, style: { CSSID: '6', myInfoBarElementData: { 'font-size': '18px' } }, id: 6, showOnce: 0, active: false, display: true },
    { blurb: { text: 'Invite friends with your share code. When they win, you win too!', style: { 'font-size': '15px' } }, imgSrc: '', icon: { loc: 'R', src: 'message' }, betweenSeconds: 1, displaySeconds: 16, style: { CSSID: '7', myInfoBarElementData: { 'font-size': '18px' } }, id: 7, showOnce: 0, active: false, display: true },
    { blurb: { text: 'Your hits: {{ds.UserTotalClicks}}', style: { 'font-size': '18px' } }, imgSrc: '', icon: { loc: '', src: '' }, betweenSeconds: 1, displaySeconds: 6, style: { CSSID: '8', myInfoBarElementData: { 'font-size': '18px' } }, id: 8, showOnce: 0, active: false, display: true }
];

var ASSET = 'assets/';

function prizeDemo(title, imageFile, color, level, passed) {
    return {
        Title: title,
        ImageURL: ASSET + imageFile,
        Color: color,
        Level: level,
        Form: { Passed: passed, Requirements: [] }
    };
}

function buildWinningNumbers() {
    var targets = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
    var wn = [];
    var i;
    for (i = 0; i < targets.length; i++) {
        wn.push({
            Number: targets[i],
            Level: 11 + (i % 4)
        });
    }
    return wn;
}

var app = angular.module('hitListApp', ['ui.bootstrap', 'LocalStorageModule', 'ngAnimate', 'ngSanitize', 'ngTouch', 'oc.lazyLoad', 'ngClickCopy']);

app.value('$', window.jQuery);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
}]);

app.config(['$sceProvider', function ($sceProvider) {
    $sceProvider.enabled(false);
}]);

app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('hitlistStaticDemo');
}]);

angular.module('hitListApp').service('dataService', function () {
    var ds = {};
    ds.showChat = false;
    ds.isS2User = false;
    ds.ops = null;
    ds.WinningNumbers = [];
    ds.CurrentPrize = null;
    ds.UserNumber = '?';
    ds.LevelLock = { Allowed: false, Clicks: 8, Locked: false, Number: -1 };
    ds.WarningSystem = { Running: false, Status: 0 };
    ds.AnonLogin = { Allowed: true, Show: false, Count: 0, Limit: 50 };
    ds.WinHighestQualified = false;
    ds.UserEmail = '';
    ds.IsSequentialQualification = true;
    ds.BackgroundImages = [];
    ds.MBackgroundImages = [];
    ds.BackgroundRotation = 20;
    ds.UserTotalClicks = 0;
    ds.Qualifications = { Item: 0, Show: false };
    ds.BackgroundImage = { URL: ASSET + 'bg.png', ID: 1 };
    ds.PWFormAll = null;
    ds.L1Prize = prizeDemo('Lululemon Gift Card', 'lulu.png', 1, 11, true);
    ds.L2Prize = prizeDemo('Amazon Gift Card', 'prize2.png', 2, 12, false);
    ds.L3Prize = prizeDemo('Cruise Getaway', 'prize3.png', 3, 13, false);
    ds.L4Prize = prizeDemo('Resort Vacation', 'prize4.png', 4, 14, false);
    ds.Status = 1;
    ds.isMobile = '0';
    ds.User = {
        UserID: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        RefShortCode: 'DEMO-SHARE',
        RefThroughShortCodeCount: 12,
        FBID: '',
        GID: '',
        ImageUrl: '',
        Stats: { Level: 0, IsLoggedIn: false, Args: '', Tags: {} }
    };
    ds.emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    ds.FormsFBLikeFunctionsAttached = [];
    ds.FirstVisit = { Status: false, VideoURL: '-VyyDsns-Qc' };
    ds.Dynamic = {
        Login: {
            Media: { Type: 'image', VideoId: '', VideoType: '', ImageUrl: ASSET + 'DemoHeader.png' },
            Text: {
                Header: '<span>Welcome to <strong>Agave Live</strong></span>',
                ContestEntry: '<p>Enter your name and email to join the contest and start playing for prizes.</p>'
            }
        },
        Layout: { ShowSeat: false },
        HeaderImage: { Src: '', Width: 34 }
    };
    ds.Social = {
        Name: 'GoHitlist',
        ImageUrl: '',
        FbLikeUrl: 'https://www.facebook.com/gohitlist',
        FbShareUrl: 'http://gohitlist.com'
    };
    ds.UpdateLevelInfo = function (stats) {
        ds.User.Stats.Level = stats.Level;
        ds.User.Stats.IsLoggedIn = stats.IsLoggedIn;
        ds.User.Stats.Args = stats.Args;
        ds.User.Stats.Tags = stats.Tags;
        ds.L1Prize.Form.Passed = stats.F1.Passed;
        ds.L1Prize.Form.Requirements = stats.F1.Requirements;
        ds.L2Prize.Form.Passed = stats.F2.Passed;
        ds.L2Prize.Form.Requirements = stats.F2.Requirements;
        ds.L3Prize.Form.Passed = stats.F3.Passed;
        ds.L3Prize.Form.Requirements = stats.F3.Requirements;
        ds.L4Prize.Form.Passed = stats.F4.Passed;
        ds.L4Prize.Form.Requirements = stats.F4.Requirements;
    };
    ds.Pages = {
        Profile: { Show: false, OnTop: false, Prize: { Show: false } },
        About: { Show: false, Item: null },
        ShareCode: { Show: false, Item: null },
        PreviousWinners: { Show: false, Item: null },
        CouponBook: { Show: false, CouponBook: null },
        MediaBook: { Show: false, MediaBook: null },
        Media: { Show: false, Media: null },
        Winner: { Show: false, Step: 0, Sequence: null },
        Menu: { Show: false },
        Paused: { Show: false },
        PausedClick: { Show: false },
        GoingLive: { Show: false },
        AnonWinLogin: { Show: false }
    };
    ds.PendingPrizeClaim = {
        HasPending: false,
        ClaimTicket: null,
        WinningID: null,
        PrizeGroupType: null,
        WinningNumber: null,
        AnonymousUserID: null,
        EventID: null
    };
    ds.Layout = {
        IsEnabled: false,
        Desktop: { Show: false, CSS: null },
        Mobile: { Show: false, CSS: null },
        ShowUserClickCount: true,
        ShowSeat: true
    };
    ds.Video = {
        IsEnabled: false,
        Src: 'https://www.youtube.com/embed/hU2PWD--7dc',
        Show: false,
        ShowCloseButton: false,
        VideoHTML: '',
        URL: ''
    };
    ds.Winners = {
        Show: false,
        List: [
            { Name: 'Jamie K.', Prize: '$100 Gift Card', WinningNumber: 10000 },
            { Name: 'Alex M.', Prize: 'Merch Pack', WinningNumber: 15000 },
            { Name: 'Sam R.', Prize: 'VIP Upgrade', WinningNumber: 20000 }
        ]
    };
    ds.Utm = {};
    return { ds: ds };
});

app.service('videoService', function () {
    this.players = {};
    this.pausedVideos = [];
    this.pauseAllVideos = angular.noop;
    this.resumeAllVideos = angular.noop;
    this.play = angular.noop;
    this.pause = angular.noop;
    this.stop = angular.noop;
});

app.factory('hitListData', ['$timeout', 'dataService', function ($timeout, dataService) {
    return function createOps() {
        var handlers = {};
        var callbacks = {};

        function fire(name, payload) {
            if (handlers[name]) {
                handlers[name](payload);
            }
        }

        return {
            setCallbacks: function (setupInitialInfo, performLogin, performAnonLogin, performLoginFromAnon) {
                callbacks.setupInitialInfo = setupInitialInfo;
                callbacks.performLogin = performLogin;
                callbacks.performAnonLogin = performAnonLogin;
                callbacks.performLoginFromAnon = performLoginFromAnon;
            },
            setStartupUtmContext: angular.noop,
            initializeClient: function () {
                $timeout(function () {
                    var ds = dataService.ds;
                    var wn = buildWinningNumbers();
                    callbacks.setupInitialInfo({
                        WinningNumbers: wn,
                        Winners: ds.Winners.List.slice(),
                        L1Prize: angular.copy(ds.L1Prize),
                        L2Prize: angular.copy(ds.L2Prize),
                        L3Prize: angular.copy(ds.L3Prize),
                        L4Prize: angular.copy(ds.L4Prize),
                        Status: 1,
                        args: 'static-demo-args',
                        IsSequentialQualification: true,
                        IsAnonymousLoginEnabled: true,
                        AnonymousClickLimit: 50,
                        WinHighestQualified: false,
                        LevelLockAllowed: false,
                        LevelLockClicks: 8,
                        FbImageShareUrl: '',
                        FbLikeUrl: ds.Social.FbLikeUrl,
                        FbShareUrl: ds.Social.FbShareUrl,
                        FbHitlistLikeUrl: '',
                        GaqUA: '',
                        Dynamic: {
                            Login: {
                                MediaType: 'image',
                                VideoId: '',
                                VideoType: '',
                                ImageUrl: ASSET + 'DemoHeader.png',
                                HeaderText: ds.Dynamic.Login.Text.Header,
                                ContestEntryText: ds.Dynamic.Login.Text.ContestEntry
                            }
                        },
                        ShowSeat: false,
                        HeaderImageSrc: '',
                        HeaderImageWidth: 34,
                        Layout: {
                            IsEnabled: false,
                            DesktopVideoVisible: false,
                            DesktopVideoCSS: null,
                            MobileVideoVisible: false,
                            MobileVideoCSS: null,
                            ShowUserClickCount: true
                        },
                        BackgroundImages: [{ URL: ASSET + 'bg.png', ID: 1 }],
                        MBackgroundImages: [{ URL: ASSET + 'bg.png', ID: 1 }],
                        FTBackgroundImages: [{ URL: ASSET + 'bg.png', ID: 1 }],
                        FTMBackgroundImages: [{ URL: ASSET + 'bg.png', ID: 1 }],
                        BackgroundRotation: 20,
                        PWFormAll: null,
                        VideoURL: '-VyyDsns-Qc',
                        EventID: 'static-demo-event'
                    });
                }, 80);
            },
            on: function (eventName, fn) {
                handlers[eventName] = fn;
            },
            invoke: angular.noop,
            invoke2args: function (method) {
                var ds = dataService.ds;
                if (method === 'getNextNumber' || method === 'getNextNumber2') {
                    $timeout(function () {
                        var cur = ds.UserNumber === '?' ? 9500 : Number(ds.UserNumber);
                        var next = cur + 50 + Math.floor(Math.random() * 150);
                        // Skip over any winning numbers so the user never wins in the demo
                        var winNums = ds.WinningNumbers.map(function (w) { return w.Number; });
                        while (winNums.indexOf(next) !== -1) {
                            next += 1;
                        }
                        fire('n', {
                            n: next,
                            c: ds.UserTotalClicks + 1,
                            a: ds.User.Stats.Args || 'static-demo-args',
                            w: ds.WinningNumbers
                        });
                    }, 380);
                }
            },
            invoke3args: angular.noop,
            setUser: function (firstName, lastName, email) {
                $timeout(function () {
                    callbacks.performLogin({
                        UserID: 'demo-user',
                        FirstName: firstName,
                        LastName: lastName || '',
                        Email: email,
                        RefShortCode: 'DEMO-SHARE',
                        RefThroughShortCodeCount: 12,
                        Stats: {
                            Level: 14,
                            IsLoggedIn: true,
                            Args: 'static-demo-args',
                            Tags: {},
                            F1: { Passed: true, Requirements: [] },
                            F2: { Passed: false, Requirements: [] },
                            F3: { Passed: false, Requirements: [] },
                            F4: { Passed: false, Requirements: [] }
                        }
                    });
                }, 450);
            },
            setAnonUser: function (loginEmail) {
                $timeout(function () {
                    callbacks.performAnonLogin({
                        UserID: 'anon-demo',
                        FirstName: 'Guest',
                        LastName: '',
                        Email: loginEmail || 'guest@demo.local',
                        RefShortCode: 'DEMO-ANON',
                        RefThroughShortCodeCount: 0,
                        Stats: {
                            Level: 11,
                            IsLoggedIn: true,
                            Args: 'static-demo-args',
                            Tags: {},
                            F1: { Passed: true, Requirements: [] },
                            F2: { Passed: false, Requirements: [] },
                            F3: { Passed: false, Requirements: [] },
                            F4: { Passed: false, Requirements: [] }
                        }
                    });
                }, 450);
            },
            claimPrizeAfterLogin: angular.noop
        };
    };
}]);

app.filter('idxGTFilter', function () {
    return function (data, parameter) {
        var filtered = [];
        if (data && data.length !== undefined) {
            for (var i = 0; i < data.length; i++) {
                if ((i >= parameter) && (i < 9)) {
                    filtered.push(data[i]);
                }
            }
        }
        return filtered;
    };
});

app.directive('checkMobile', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope) {
            if (typeof isMobile === 'function' && isMobile()) {
                scope.ds.isMobile = '1';
            } else {
                scope.ds.isMobile = '0';
            }
        }
    };
});

function stubGhl(tag) {
    app.directive(tag, function () {
        return { restrict: 'E', replace: true, template: '<span class="ghl-demo-stub" aria-hidden="true"></span>' };
    });
}

stubGhl('ghlQuestions');
stubGhl('ghlCaptchaAndCoupon');
stubGhl('ghlCoupon');
stubGhl('ghlMedia');
stubGhl('ghlPrizeClaim');
// ghlPrizeQualifications — replaced with demo overlay below
stubGhl('ghlAnonWinLogin');
stubGhl('ghlAnonymous');

app.directive('ghlPrizeQualifications', function () {
    return {
        restrict: 'E',
        replace: true,
        template:
            '<section data-ng-show="ds.Qualifications.Show" class="demo-qual-overlay d-flex flex-column wh-100-minus-header enable-scroll ng-cloak">' +
            '<div class="demo-qual-image" ng-style="{\'background-image\': \'url(\' + getQualPrize().ImageURL + \')\'}">' +
            '<div class="demo-qual-image-inner">' +
            '<span class="demo-qual-prize-title">{{getQualPrize().Title}}</span>' +
            '</div>' +
            '</div>' +
            '<div class="demo-qual-body">' +
            '<div class="demo-qual-status" ng-class="{\'demo-qual-unlocked\': getQualPrize().Form.Passed}">' +
            '<span ng-if="!getQualPrize().Form.Passed"><i class="fa fa-lock"></i> Locked</span>' +
            '<span ng-if="getQualPrize().Form.Passed"><i class="fa fa-check-circle"></i> Unlocked</span>' +
            '</div>' +
            '<p class="demo-qual-desc">This is where we configure different tasks or objectives for the players to unlock this prize and be eligible to win it.</p>' +
            '<ul class="demo-qual-tasks">' +
            '<li><i class="fa fa-check-circle"></i> Follow us on social media</li>' +
            '<li><i class="fa fa-check-circle"></i> Share contest with a friend</li>' +
            '<li><i class="fa fa-check-circle"></i> Answer a survey question</li>' +
            '</ul>' +
            '</div>' +
            '<div class="flex-spacer"></div>' +
            '<div class="btn-wrapper">' +
            '<button type="button" class="mt-2em btn btn-round btn-black btn-wide" data-ng-click="ds.Qualifications.Show = false;">' +
            '<span>Close</span>' +
            '</button>' +
            '</div>' +
            '</section>'
    };
});

app.directive('loginMedia', function () {
    return {
        restrict: 'E',
        template:
            '<div class="login-media-hero w-100">' +
            '<img src="' + ASSET + 'agavelogo.png" alt="AGAVE" class="login-hero-logo" draggable="false" oncontextmenu="return false;" />' +
            '</div>'
    };
});

app.controller('infoBarCtrl', ['$scope', function ($scope) {
    $scope.infoBarData = angular.copy(HITLIST_DEMO_INFOBAR_DATA);
    $scope.initializeInfoBar = function () {
        if ($scope.infoBarData.length > 0) {
            $scope.infoBarData[0].active = true;
            $scope.infoBarData[0].display = true;
        }
    };
    if ($scope.infoBarData.length > 0) {
        $scope.initializeInfoBar();
    }
}]);

app.directive('myInfoBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'assets/infobar.template.html',
        scope: { infoBarData: '=' },
        link: function (scope, el, attrs) {
            scope.playbtnActive = false;
            if ('autoPlay' in attrs || 'auto-play' in attrs) {
                scope.$on('infoBarStart', function () {
                    scope.startPlay();
                });
            }
        },
        controller: ['$scope', '$rootScope', '$timeout', '$interpolate', function ($scope, $rootScope, $timeout, $interpolate) {
            $scope.count = 0;
            $scope.timeoutPromiseContainer = null;
            $scope.timeoutPromiseDisplay = null;

            function findIndexById(arr, id) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === id) {
                        return i;
                    }
                }
                return -1;
            }

            $scope.stopLoop = function () {
                $timeout.cancel($scope.timeoutPromiseContainer);
                $timeout.cancel($scope.timeoutPromiseDisplay);
                $scope.playbtnActive = false;
            };

            $scope.startPlay = function () {
                $scope.stopLoop();
                $scope.playbtnActive = true;
                $scope.loopPlayback();
            };

            $scope.loopPlayback = function () {
                $timeout.cancel($scope.timeoutPromiseContainer);
                if ($scope.infoBarData && $scope.infoBarData[$scope.count]) {
                    $scope.selectedElement($scope.count);
                    var secs = ($scope.infoBarData[$scope.count].displaySeconds * 1000);
                    var slideId = $scope.infoBarData[$scope.count].id;
                    $scope.timeoutPromiseDisplay = $timeout(function () { $scope.hideDisplay(slideId); }, secs);
                    $scope.count += 1;

                    if ($scope.count >= $scope.infoBarData.length) {
                        $scope.count = 0;
                        $timeout.cancel($scope.timeoutPromiseContainer);
                        $timeout.cancel($scope.timeoutPromiseDisplay);
                    }
                }
            };

            $scope.hideDisplay = function (id) {
                $timeout.cancel($scope.timeoutPromiseDisplay);
                if ($scope.infoBarData) {
                    var idxItem = findIndexById($scope.infoBarData, id);
                    if (idxItem >= 0) {
                        $scope.infoBarData[idxItem].display = false;
                        var pause = $scope.infoBarData[idxItem].betweenSeconds * 1000;
                        $scope.timeoutPromiseContainer = $timeout($scope.loopPlayback, pause);
                    }
                }
            };

            $scope.selectedElement = function (i) {
                if ($scope.infoBarData && $scope.infoBarData[i]) {
                    var iCnt;
                    for (iCnt = $scope.infoBarData.length - 1; iCnt >= 0; iCnt--) {
                        if ($scope.infoBarData[iCnt].showOnce === -1) {
                            $scope.infoBarData.splice(iCnt, 1);
                        }
                    }

                    angular.forEach($scope.infoBarData, function (value) {
                        value.active = false;
                        value.selectedItem = false;
                        if (value.showOnce === 1) {
                            value.showOnce = -1;
                        }
                    });

                    $scope.infoBarData[i].selectedItem = true;
                    $scope.infoBarData[i].active = true;
                    $scope.infoBarData[i].display = true;
                    $scope.count = i;

                    $scope.prevActive = !!$scope.infoBarData[i - 1];
                    $scope.nextActive = !!$scope.infoBarData[i + 1];
                }
            };

            $scope.displayMessage = function (args) {
                $scope.stopLoop();
                if ($scope.infoBarData) {
                    $scope.infoBarData.splice($scope.count, 0, args);
                    $scope.startPlay();
                }
            };

            $scope.$on('infoBarDisplay', function (event, args) {
                $scope.displayMessage(args);
            });

            $scope.$on('infoBarStart', function () {
                $scope.startPlay();
            });

            $scope.$on('startInfoBar', function (event, args) {
                $scope.displayMessage(args);
            });

            $scope.getTextClass = function (iconLoc) {
                if (iconLoc === 'R' || iconLoc === 'L') {
                    return 'col-10';
                }
                if (iconLoc === 'B') {
                    return 'col-8';
                }
                return 'col-12';
            };

            $scope.interpolateText = function (txt) {
                if (txt && txt.indexOf('{{') !== -1) {
                    return $interpolate(txt)($scope.$parent.$parent);
                }
                return txt;
            };
        }]
    };
});

app.controller('hitListCtrl', ['$scope', 'hitListData', 'dataService', 'localStorageService', 'videoService', '$location', '$rootScope', '$window', '$timeout', '$cacheFactory', function ($scope, hitListData, dataService, localStorageService, videoService, $location, $rootScope, $window, $timeout, $cacheFactory) {
    $scope.Ready = 0;
    $scope.hitbuttonflag = false;
    $scope.HowToPlay = { Show: false };
    $scope.NotQualified = { Show: false };
    $scope.Captcha = { Show: false };
    $scope.DisplayQuestion = { Show: false, MQCode: '' };
    $scope.DisplayQSQuestion = { Show: false, QSCode: '' };
    $scope.isMobileResult = typeof isMobile === 'function' ? isMobile() : false;
    $scope.cColor = $cacheFactory('cColorDemo');
    $scope.ds = dataService.ds;
    $scope.vs = {};
    angular.extend($scope.vs, videoService);

    $window.gtag = $window.gtag || function () {};

    $scope.$watchGroup(['ds.Pages.About.Show', 'ds.Pages.Profile.Show', 'ds.Pages.Media.Show'], function (newValues, oldValues) {
        var i;
        var j;
        for (i = 0; i < newValues.length; i++) {
            if (newValues[i] === true && newValues[i] !== oldValues[i]) {
                for (j = 0; j < newValues.length; j++) {
                    if (i !== j) {
                        newValues[j] = false;
                    }
                }
            }
        }
        if (newValues.some(function (v) { return v === true; })) {
            $scope.vs.pauseAllVideos();
        }
    });

    function setupInitialInfo(data) {
        $scope.ds.WinningNumbers = data.WinningNumbers;
        $scope.ds.Winners.List = data.Winners;
        $scope.ds.CurrentPrize = data.WinningNumbers[1];
        $scope.ds.BackgroundImages = data.BackgroundImages;
        $scope.ds.MBackgroundImages = data.MBackgroundImages;
        $scope.ds.BackgroundRotation = data.BackgroundRotation;
        $scope.ds.PWFormAll = data.PWFormAll;
        $scope.ds.L1Prize = data.L1Prize;
        $scope.ds.L2Prize = data.L2Prize;
        $scope.ds.L3Prize = data.L3Prize;
        $scope.ds.L4Prize = data.L4Prize;
        $scope.ds.Status = data.Status;
        $scope.ds.User.Stats.Args = data.args;
        $scope.ds.IsSequentialQualification = data.IsSequentialQualification;
        $scope.ds.AnonLogin.Allowed = data.IsAnonymousLoginEnabled;
        $scope.ds.AnonLogin.Limit = data.AnonymousClickLimit || 50;
        $scope.ds.WinHighestQualified = data.WinHighestQualified;
        $scope.ds.LevelLock.Allowed = data.LevelLockAllowed;
        $scope.ds.LevelLock.Clicks = data.LevelLockClicks;
        $scope.ds.Social.ImageUrl = data.FbImageShareUrl;
        $scope.ds.Social.FbLikeUrl = data.FbLikeUrl;
        $scope.ds.Social.FbShareUrl = data.FbShareUrl;
        $scope.ds.Dynamic.Login.Media.Type = data.Dynamic.Login.MediaType || 'image';
        $scope.ds.Dynamic.Login.Media.VideoId = data.Dynamic.Login.VideoId || '';
        $scope.ds.Dynamic.Login.Media.VideoType = data.Dynamic.Login.VideoType || '';
        $scope.ds.Dynamic.Login.Media.ImageUrl = data.Dynamic.Login.ImageUrl || (ASSET + 'DemoHeader.png');
        $scope.ds.Dynamic.Login.Text.Header = data.Dynamic.Login.HeaderText || '';
        $scope.ds.Dynamic.Login.Text.ContestEntry = data.Dynamic.Login.ContestEntryText || '';
        $scope.ds.Dynamic.Layout.ShowSeat = data.ShowSeat !== null && data.ShowSeat !== undefined ? data.ShowSeat : true;
        $scope.ds.Dynamic.HeaderImage.Src = data.HeaderImageSrc || '';
        $scope.ds.Dynamic.HeaderImage.Width = data.HeaderImageWidth || 34;
        $scope.ds.Layout.IsEnabled = data.Layout.IsEnabled;
        $scope.ds.Layout.Desktop.Show = data.Layout.DesktopVideoVisible;
        $scope.ds.Layout.Desktop.CSS = data.Layout.DesktopVideoCSS;
        $scope.ds.Layout.Mobile.Show = data.Layout.MobileVideoVisible;
        $scope.ds.Layout.Mobile.CSS = data.Layout.MobileVideoCSS;
        $scope.ds.Layout.ShowUserClickCount = data.Layout.ShowUserClickCount;
        $scope.ds.Video.URL = data.VideoURL;

        $scope.cColor.put(11, $scope.ds.L1Prize.Color);
        $scope.cColor.put(12, $scope.ds.L2Prize.Color);
        $scope.cColor.put(13, $scope.ds.L3Prize.Color);
        $scope.cColor.put(14, $scope.ds.L4Prize.Color);

        localStorageService.set('EventID', data.EventID);
        $scope.Ready = 1;
    }

    function performLogin(data) {
        $scope.ds.User.UserID = data.UserID;
        $scope.ds.User.FirstName = data.FirstName;
        $scope.ds.User.LastName = data.LastName;
        $scope.ds.User.Email = data.Email;
        $scope.ds.User.RefShortCode = data.RefShortCode;
        $scope.ds.User.RefThroughShortCodeCount = data.RefThroughShortCodeCount;
        $scope.ds.UpdateLevelInfo(data.Stats);
        $scope.Ready = 2;
        videoService.stop('vidLogin');
        $scope.ds.showChat = true;
        $scope.$broadcast('infoBarStart', null);
        // Swiper auto-init disabled for demo — user swipes manually
        // $timeout(function () {
        //     if (typeof window.initialize_swiper === 'function') {
        //         window.initialize_swiper();
        //     }
        // }, 500);
    }

    function performAnonLogin(data) {
        if ($scope.ds.AnonLogin.Allowed) {
            localStorageService.set('AnonID', data.Email);
            performLogin(data);
        }
    }

    function performLoginFromAnon(data) {
        if ($scope.ds.AnonLogin.Allowed) {
            localStorageService.remove('AnonID');
            $scope.ds.AnonLogin.Show = false;
            performLogin(data);
        }
    }

    $scope.ds.ops = hitListData();
    $scope.ds.ops.setCallbacks(setupInitialInfo, performLogin, performAnonLogin, performLoginFromAnon);
    $scope.ds.ops.initializeClient();

    $scope.ds.ops.on('n', function (payload) {
        if (payload.w) {
            $scope.ds.WinningNumbers = payload.w;
        }
        $scope.ds.UserNumber = payload.n;
        $scope.ds.UserTotalClicks = payload.c;
        if (payload.a) {
            $scope.ds.User.Stats.Args = payload.a;
        }
        $scope.hitbuttonflag = false;
    });

    $scope.submit = function (type) {
        if (type === 'A') {
            var loginEmail = localStorageService.get('AnonID');
            $scope.ds.ops.setAnonUser(loginEmail);
            return;
        }
        if (!isEmpty($scope.ds.User.Email) && !isEmpty($scope.ds.User.FirstName)) {
            $scope.ds.ops.setUser($scope.ds.User.FirstName, $scope.ds.User.LastName, $scope.ds.User.Email);
        }
    };

    $scope.getNextEntry = function () {
        if ($scope.ds.LevelLock.Allowed && $scope.ds.LevelLock.Locked) {
            if (($scope.ds.User.Stats.Level + 10) >= $scope.ds.CurrentPrize.Level) {
                $scope.hitbuttonflag = true;
                $scope.ds.ops.invoke2args('getNextNumber', $scope.ds.User.Stats.Args, $scope.ds.BackgroundImage.ID);
            } else {
                $scope.NotQualified.Show = true;
                $scope.hitbuttonflag = true;
                $scope.ds.ops.invoke2args('getNextNumber2', $scope.ds.User.Stats.Args, $scope.ds.BackgroundImage.ID);
            }
        } else if (!$scope.hitbuttonflag) {
            $scope.hitbuttonflag = true;
            $scope.ds.ops.invoke2args('getNextNumber', $scope.ds.User.Stats.Args, $scope.ds.BackgroundImage.ID);
        }
    };

    $scope.hidePopup = function () {
        $scope.HowToPlay.Show = false;
        $scope.ds.Pages.About.Show = false;
        $scope.Captcha.Show = false;
        $scope.ds.Pages.Winner.Show = false;
        $scope.ds.Pages.Profile.Show = false;
        $scope.ds.Pages.PreviousWinners.Show = false;
        $scope.ds.Pages.ShareCode.Show = false;
        $scope.ds.Pages.Media.Show = false;
    };

    $scope.showPrizeQualifications = function () {
        $scope.ds.Qualifications.Show = true;
    };

    $scope.getQualPrize = function () {
        var item = $scope.ds.Qualifications.Item;
        if (item === 1) return $scope.ds.L1Prize;
        if (item === 2) return $scope.ds.L2Prize;
        if (item === 3) return $scope.ds.L3Prize;
        if (item === 4) return $scope.ds.L4Prize;
        return $scope.ds.L1Prize;
    };

    $scope.goToQualification = function () {
        $scope.hitbuttonflag = false;
        $scope.NotQualified.Show = false;
        $scope.ds.Qualifications.Item = $scope.ds.CurrentPrize.Level - 10;
        $scope.ds.Qualifications.Show = true;
    };

    $scope.hideNotQualified = function () {
        $scope.NotQualified.Show = false;
        $scope.hitbuttonflag = false;
    };

    $scope.signoutComplete = function () {
        if (typeof window.swiper !== 'undefined' && window.swiper) {
            window.swiper.destroy(true, true);
        }
        $scope.ds.Pages.Profile.Show = false;
        $scope.Ready = 1;
        $scope.ds.showChat = false;
    };

    $scope.ShowMQDirect = angular.noop;
    $scope.showChatSupport = function () {
        $window.alert('Chat support is available in live contests.');
    };
}]);
