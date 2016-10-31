"use strict";!function(){angular.module("app",["ngAnimate","ngMaterial","ngMessages","ui.router","LocalStorageModule","flow"])}(),function(){angular.module("app").config(["flowFactoryProvider",function(t){t.defaults={target:"/upload",permanentErrors:[404,500,501]},t.on("catchAll",function(t){})}])}(),function(){angular.module("app").config(["localStorageServiceProvider",function(t){t.setPrefix("app").setNotify(!0,!0)}])}(),function(){angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,o){o.otherwise("/"),t.state("main",{url:"/",views:{"":{templateUrl:"./build/templates/main/index.html"},"booksList@main":{templateUrl:"./build/templates/booksList/index.html"}}}).state("main.edit",{url:"book/edit/:id",views:{"booksList@main":{template:""},editBookView:{templateUrl:"./build/templates/editBook/index.html"}}}).state("main.create",{url:"book/create",views:{"booksList@main":{template:""},createBookView:{templateUrl:"./build/templates/createBook/index.html"}}}).state("main.form",{url:"form",views:{"booksList@main":{template:""},createBookView:{templateUrl:"./build/templates/form/index.html"}}})}])}(),function(){function t(t,o,e,i,a){this.$scope=t,this.$http=o,this.$state=e,this.localStorageService=a,this.bookList=this.localStorageService.get("bookList"),this.filters=[{name:"Названию",type:"name"},{name:"Автору",type:"_author"},{name:"Дате публикации",type:"publication"},{name:"Количеству страниц",type:"pages"}],this.sortType="name",this.sortReverse=!1,this.init()}angular.module("app").controller("booksListCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){},t.prototype.editBook=function(t,o){t.preventDefault(),t.stopPropagation(),this.localStorageService.set("editBook",o),this.$state.go("main.edit",{id:o.id})},t.prototype.addBook=function(t){t.preventDefault(),t.stopPropagation(),this.$state.go("main.create")},t.prototype.deleteBook=function(t,o){t.preventDefault(),t.stopPropagation();for(var e=0;e<this.bookList.length;e+=1)o.id===this.bookList[e].id&&this.bookList.splice(e,1);this.localStorageService.set("bookList",this.bookList)},t.prototype.sortBooks=function(t,o){t.preventDefault(),t.stopPropagation(),this.sortType===o?this.sortReverse=!this.sortReverse:this.sortType=o},t.prototype.updateFromJson=function(t){var o=this;t.preventDefault(),t.stopPropagation(),this.$http.get("./src/fixtures/books.json").then(function(t){for(var e=0;e<t.data.length;e+=1)t.data[e]._author=t.data[e].authors[0].s_name;o.localStorageService.set("bookList",t.data),o.$state.reload()})}}(),function(){function t(t,o,e,i,a){this.$scope=t,this.$http=o,this.$state=e,this.localStorageService=a,this.init()}angular.module("app").controller("CreateBookCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.book=angular.copy(this.localStorageService.get("editBook"))},t.prototype.saveBookCb=function(t){var o=this.localStorageService.get("bookList");t.id="_"+o.length,o.push(t),this.localStorageService.set("bookList",o),this.$state.go("main")}}(),function(){function t(t){this.status="edit",this.$scope=t,this.init()}t.$inject=["$scope"],angular.module("app").controller("drBookEditorCtrl",t),angular.module("app").directive("drBookEditor",function(){function o(t,o,e,i){}return{link:o,restrict:"AEC",scope:{},templateUrl:"./build/templates/drBookEditor/drBookEditor.html",controller:t,controllerAs:"bkEdtr",bindToController:{data:"=?",ctx:"=",mode:"@?",saveCb:"=?"}}}),t.prototype.init=function(){this.mode&&"create"!==this.mode||(this.data={name:"",authors:[["",""]],pages:"",publishing_house:"",publication:"",edition:"",isbn:"",image:""}),this.returnIsbnConfig(this.data.isbn)},t.prototype.processFiles=function(t){var o=this;angular.forEach(t,function(t,e){var i=new FileReader;i.onload=function(t){var e=t.target.result;o.data.image=e,o.$scope.$digest()},i.readAsDataURL(t.file)})},t.prototype.saveCard=function(t){t.preventDefault(),t.stopPropagation(),console.log("---=== this.data ===---",this.data),this.mode&&"create"!=this.mode?this.saveCb.call(this.ctx):this.saveCb.call(this.ctx,this.data)},t.prototype.deleteAuthor=function(t,o){t.preventDefault(),t.stopPropagation(),this.data.authors.splice(o,1)},t.prototype.addAuthor=function(t){t.preventDefault(),t.stopPropagation(),this.data.authors.push(["",""])},t.prototype.returnIsbnConfig=function(t){console.log("---=== isbn ===---",this.data.isbn);var o=t;o=o.split("-"),this.isbnConfig=1==o[0].length?{length:13,pattern:"x-xxx-xxxxx-x",re:new RegExp("^(?:ISBN(?:-10)?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$)[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$")}:{length:17,pattern:"9xx-x-xx-xxxxxx-x",re:new RegExp("^(?:ISBN(?:-13)?:?●)?(?=[0-9]{13}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)97[89][-●]?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9]$")}}}(),function(){function t(t,o,e,i,a){this.$scope=t,this.$http=o,this.$state=e,this.localStorageService=a,this.init()}angular.module("app").controller("EditBookCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.book=angular.copy(this.localStorageService.get("editBook"))},t.prototype.saveBookCb=function(){console.log("---=== callback ===---");for(var t=this.localStorageService.get("bookList"),o=0;o<t.length;o+=1)this.book.id==t[o].id&&(t[o]=this.book);this.localStorageService.set("bookList",t),this.localStorageService.remove("editBook"),this.$state.go("main")}}(),function(){function t(t,o,e,i,a){this.$scope=t,this.$http=o,this.$state=e,this.localStorageService=a,this.init()}angular.module("app").controller("mainCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.getBooks()},t.prototype.getBooks=function(){var t=this;this.localStorageService.get("bookList")||this.$http.get("./src/fixtures/books.json").then(function(o){for(var e=0;e<o.data.length;e+=1)o.data[e]._author=o.data[e].authors[0].s_name;t.localStorageService.set("bookList",o.data)})}}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiZmxvd0ZhY3RvcnlQcm92aWRlciIsImRlZmF1bHRzIiwidGFyZ2V0IiwicGVybWFuZW50RXJyb3JzIiwib24iLCJldmVudCIsImxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlciIsInNldFByZWZpeCIsInNldE5vdGlmeSIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ2aWV3cyIsIiIsInRlbXBsYXRlVXJsIiwiYm9va3NMaXN0QG1haW4iLCJ0ZW1wbGF0ZSIsImVkaXRCb29rVmlldyIsImNyZWF0ZUJvb2tWaWV3IiwiYm9va3NMaXN0Q3RybCIsIiRzY29wZSIsIiRodHRwIiwiJHN0YXRlIiwiJHN0YXRlUGFyYW1zIiwibG9jYWxTdG9yYWdlU2VydmljZSIsInRoaXMiLCJib29rTGlzdCIsImdldCIsImZpbHRlcnMiLCJuYW1lIiwidHlwZSIsInNvcnRUeXBlIiwic29ydFJldmVyc2UiLCJpbml0IiwiY29udHJvbGxlciIsIiRpbmplY3QiLCJwcm90b3R5cGUiLCJlZGl0Qm9vayIsImUiLCJpdGVtIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJzZXQiLCJnbyIsImlkIiwiYWRkQm9vayIsImRlbGV0ZUJvb2siLCJib29rIiwiaSIsImxlbmd0aCIsInNwbGljZSIsInNvcnRCb29rcyIsInVwZGF0ZUZyb21Kc29uIiwiX3RoaXMiLCJ0aGVuIiwicmVzcCIsImRhdGEiLCJfYXV0aG9yIiwiYXV0aG9ycyIsInJlbG9hZCIsIkNyZWF0ZUJvb2tDdHJsIiwiY29weSIsInNhdmVCb29rQ2IiLCJuZXdCb29rIiwiYm9va3MiLCJwdXNoIiwiZHJCb29rRWRpdG9yQ3RybCIsInN0YXR1cyIsImRpcmVjdGl2ZSIsImRyQm9va0VkaXRvckxpbmsiLCIkZWxlbWVudCIsIiRhdHRycyIsIiR0aW1lb3V0IiwibGluayIsInJlc3RyaWN0Iiwic2NvcGUiLCJjb250cm9sbGVyQXMiLCJiaW5kVG9Db250cm9sbGVyIiwiY3R4IiwibW9kZSIsInNhdmVDYiIsInBhZ2VzIiwicHVibGlzaGluZ19ob3VzZSIsInB1YmxpY2F0aW9uIiwiZWRpdGlvbiIsImlzYm4iLCJpbWFnZSIsInJldHVybklzYm5Db25maWciLCJwcm9jZXNzRmlsZXMiLCJmaWxlcyIsImZvckVhY2giLCJmbG93RmlsZSIsImZpbGVSZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwidXJpIiwicmVzdWx0IiwiJGRpZ2VzdCIsInJlYWRBc0RhdGFVUkwiLCJmaWxlIiwic2F2ZUNhcmQiLCJjb25zb2xlIiwibG9nIiwiY2FsbCIsImRlbGV0ZUF1dGhvciIsImlkeCIsImFkZEF1dGhvciIsImFyciIsInNwbGl0IiwiaXNibkNvbmZpZyIsInBhdHRlcm4iLCJyZSIsIlJlZ0V4cCIsIkVkaXRCb29rQ3RybCIsInJlbW92ZSIsIm1haW5DdHJsIiwiZ2V0Qm9va3MiXSwibWFwcGluZ3MiOiJBQUFBLGNBRUEsV0FDQ0EsUUFBUUMsT0FBTyxPQUFRLFlBQWEsYUFBYyxhQUFjLFlBQWEscUJBQXNCLFlBSXBHLFdBQ0NELFFBQVFDLE9BQU8sT0FBT0MsUUFBUSxzQkFBdUIsU0FBVUMsR0FDOURBLEVBQW9CQyxVQUNuQkMsT0FBUSxVQUNSQyxpQkFBa0IsSUFBSyxJQUFLLE1BRTdCSCxFQUFvQkksR0FBRyxXQUFZLFNBQVVDLFlBSy9DLFdBQ0NSLFFBQVFDLE9BQU8sT0FBT0MsUUFBUSw4QkFBK0IsU0FBVU8sR0FDdEVBLEVBQTRCQyxVQUFVLE9BQU9DLFdBQVUsR0FBTSxTQUsvRCxXQUNDWCxRQUFRQyxPQUFPLE9BQU9DLFFBQVEsaUJBQWtCLHFCQUFzQixTQUFVVSxFQUFnQkMsR0FHL0ZBLEVBQW1CQyxVQUFVLEtBRTdCRixFQUFlRyxNQUFNLFFBQ3BCQyxJQUFLLElBQ0xDLE9BQ0NDLElBQ0NDLFlBQWEscUNBRWRDLGtCQUNDRCxZQUFhLDZDQUdi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QUFLQyxLQUFLUixHQUFHVSxRQUFRLEdBQVcsTUFFeERMLEdBQU03QixvQkFBb0JrQixJQUFJLFdBQVlhLEVBQUtDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdBbmltYXRlJywgJ25nTWF0ZXJpYWwnLCAnbmdNZXNzYWdlcycsICd1aS5yb3V0ZXInLCAnTG9jYWxTdG9yYWdlTW9kdWxlJywgJ2Zsb3cnXSk7XG59KSgpO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29uZmlnKFsnZmxvd0ZhY3RvcnlQcm92aWRlcicsIGZ1bmN0aW9uIChmbG93RmFjdG9yeVByb3ZpZGVyKSB7XG5cdFx0Zmxvd0ZhY3RvcnlQcm92aWRlci5kZWZhdWx0cyA9IHtcblx0XHRcdHRhcmdldDogJy91cGxvYWQnLFxuXHRcdFx0cGVybWFuZW50RXJyb3JzOiBbNDA0LCA1MDAsIDUwMV1cblx0XHR9O1xuXHRcdGZsb3dGYWN0b3J5UHJvdmlkZXIub24oJ2NhdGNoQWxsJywgZnVuY3Rpb24gKGV2ZW50KSB7fSk7XG5cdH1dKTtcbn0pKCk7XG4ndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb25maWcoW1wibG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyXCIsIGZ1bmN0aW9uIChsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIpIHtcblx0XHRsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIuc2V0UHJlZml4KCdhcHAnKS5zZXROb3RpZnkodHJ1ZSwgdHJ1ZSk7XG5cdH1dKTtcbn0pKCk7XG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXHRcdHZhciBwYXRoVG9Db21wb25lbnRzID0gJy4vc3JjL2NvbXBvbmVudHMvJztcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluJywge1xuXHRcdFx0dXJsOiAnLycsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcIlwiOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuL2J1aWxkL3RlbXBsYXRlcy9tYWluL2luZGV4Lmh0bWwnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiYm9va3NMaXN0QG1haW5cIjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAnLi9idWlsZC90ZW1wbGF0ZXMvYm9va3NMaXN0L2luZGV4Lmh0bWwnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnbWFpbi5lZGl0Jywge1xuXHRcdFx0dXJsOiAnYm9vay9lZGl0LzppZCcsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcImJvb2tzTGlzdEBtYWluXCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZTogJydcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJlZGl0Qm9va1ZpZXdcIjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAnLi9idWlsZC90ZW1wbGF0ZXMvZWRpdEJvb2svaW5kZXguaHRtbCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdtYWluLmNyZWF0ZScsIHtcblx0XHRcdHVybDogJ2Jvb2svY3JlYXRlJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFwiYm9va3NMaXN0QG1haW5cIjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlOiAnJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNyZWF0ZUJvb2tWaWV3XCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vYnVpbGQvdGVtcGxhdGVzL2NyZWF0ZUJvb2svaW5kZXguaHRtbCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdtYWluLmZvcm0nLCB7XG5cdFx0XHR1cmw6ICdmb3JtJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFwiYm9va3NMaXN0QG1haW5cIjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlOiAnJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNyZWF0ZUJvb2tWaWV3XCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vYnVpbGQvdGVtcGxhdGVzL2Zvcm0vaW5kZXguaHRtbCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XSk7XG59KSgpO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge30pO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ2Jvb2tzTGlzdEN0cmwnLCBib29rc0xpc3RDdHJsKTtcblxuXHRib29rc0xpc3RDdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnXTtcblxuXHRmdW5jdGlvbiBib29rc0xpc3RDdHJsKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XG5cdFx0dGhpcy4kc2NvcGUgPSAkc2NvcGU7XG5cdFx0dGhpcy4kaHR0cCA9ICRodHRwO1xuXHRcdHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZSA9IGxvY2FsU3RvcmFnZVNlcnZpY2U7XG5cblx0XHR0aGlzLmJvb2tMaXN0ID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYm9va0xpc3QnKTtcblxuXHRcdHRoaXMuZmlsdGVycyA9IFt7IG5hbWU6ICfQndCw0LfQstCw0L3QuNGOJywgdHlwZTogJ25hbWUnIH0sIHsgbmFtZTogJ9CQ0LLRgtC+0YDRgycsIHR5cGU6ICdfYXV0aG9yJyB9LCB7IG5hbWU6ICfQlNCw0YLQtSDQv9GD0LHQu9C40LrQsNGG0LjQuCcsIHR5cGU6ICdwdWJsaWNhdGlvbicgfSwgeyBuYW1lOiAn0JrQvtC70LjRh9C10YHRgtCy0YMg0YHRgtGA0LDQvdC40YYnLCB0eXBlOiAncGFnZXMnIH1dO1xuXHRcdHRoaXMuc29ydFR5cGUgPSAnbmFtZSc7XG5cdFx0dGhpcy5zb3J0UmV2ZXJzZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRib29rc0xpc3RDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge307XG5cblx0Ym9va3NMaXN0Q3RybC5wcm90b3R5cGUuZWRpdEJvb2sgPSBmdW5jdGlvbiAoZSwgaXRlbSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnZWRpdEJvb2snLCBpdGVtKTtcblx0XHR0aGlzLiRzdGF0ZS5nbygnbWFpbi5lZGl0JywgeyBpZDogaXRlbS5pZCB9KTtcblx0fTtcblxuXHRib29rc0xpc3RDdHJsLnByb3RvdHlwZS5hZGRCb29rID0gZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdHRoaXMuJHN0YXRlLmdvKCdtYWluLmNyZWF0ZScpO1xuXHR9O1xuXG5cdGJvb2tzTGlzdEN0cmwucHJvdG90eXBlLmRlbGV0ZUJvb2sgPSBmdW5jdGlvbiAoZSwgYm9vaykge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJvb2tMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRpZiAoYm9vay5pZCA9PT0gdGhpcy5ib29rTGlzdFtpXS5pZCkgdGhpcy5ib29rTGlzdC5zcGxpY2UoaSwgMSk7XG5cdFx0fVxuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2Jvb2tMaXN0JywgdGhpcy5ib29rTGlzdCk7XG5cdH07XG5cblx0Ym9va3NMaXN0Q3RybC5wcm90b3R5cGUuc29ydEJvb2tzID0gZnVuY3Rpb24gKGUsIHR5cGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLnNvcnRUeXBlID09PSB0eXBlKSB7XG5cdFx0XHR0aGlzLnNvcnRSZXZlcnNlID0gIXRoaXMuc29ydFJldmVyc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc29ydFR5cGUgPSB0eXBlO1xuXHRcdH1cblx0fTtcblxuXHRib29rc0xpc3RDdHJsLnByb3RvdHlwZS51cGRhdGVGcm9tSnNvbiA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0dGhpcy4kaHR0cC5nZXQoJy4vc3JjL2ZpeHR1cmVzL2Jvb2tzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlc3AuZGF0YS5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRyZXNwLmRhdGFbaV0uX2F1dGhvciA9IHJlc3AuZGF0YVtpXS5hdXRob3JzWzBdWydzX25hbWUnXTtcblx0XHRcdH1cblx0XHRcdF90aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdib29rTGlzdCcsIHJlc3AuZGF0YSk7XG5cdFx0XHRfdGhpcy4kc3RhdGUucmVsb2FkKCk7XG5cdFx0fSk7XG5cdH07XG59KSgpO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0NyZWF0ZUJvb2tDdHJsJywgQ3JlYXRlQm9va0N0cmwpO1xuXG5cdENyZWF0ZUJvb2tDdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnXTtcblxuXHRmdW5jdGlvbiBDcmVhdGVCb29rQ3RybCgkc2NvcGUsICRodHRwLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgbG9jYWxTdG9yYWdlU2VydmljZSkge1xuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuXHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcblx0XHR0aGlzLiRzdGF0ZSA9ICRzdGF0ZTtcblx0XHR0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlO1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRDcmVhdGVCb29rQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmJvb2sgPSBhbmd1bGFyLmNvcHkodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnZWRpdEJvb2snKSk7XG5cdH07XG5cblx0Q3JlYXRlQm9va0N0cmwucHJvdG90eXBlLnNhdmVCb29rQ2IgPSBmdW5jdGlvbiAobmV3Qm9vaykge1xuXHRcdHZhciBib29rcyA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2Jvb2tMaXN0Jyk7XG5cdFx0bmV3Qm9vay5pZCA9ICdfJyArIGJvb2tzLmxlbmd0aDtcblx0XHRib29rcy5wdXNoKG5ld0Jvb2spO1xuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2Jvb2tMaXN0JywgYm9va3MpO1xuXHRcdHRoaXMuJHN0YXRlLmdvKCdtYWluJyk7XG5cdH07XG59KSgpO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRkckJvb2tFZGl0b3JDdHJsLiRpbmplY3QgPSBbXCIkc2NvcGVcIl07XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdkckJvb2tFZGl0b3JDdHJsJywgZHJCb29rRWRpdG9yQ3RybCk7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpLmRpcmVjdGl2ZSgnZHJCb29rRWRpdG9yJywgZnVuY3Rpb24gKCkge1xuXHRcdGZ1bmN0aW9uIGRyQm9va0VkaXRvckxpbmsoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkdGltZW91dCkge31cblxuXHRcdHJldHVybiB7XG5cdFx0XHRsaW5rOiBkckJvb2tFZGl0b3JMaW5rLFxuXHRcdFx0cmVzdHJpY3Q6ICdBRUMnLFxuXHRcdFx0c2NvcGU6IHt9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcuL2J1aWxkL3RlbXBsYXRlcy9kckJvb2tFZGl0b3IvZHJCb29rRWRpdG9yLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogZHJCb29rRWRpdG9yQ3RybCxcblx0XHRcdGNvbnRyb2xsZXJBczogJ2JrRWR0cicsXG5cdFx0XHRiaW5kVG9Db250cm9sbGVyOiB7XG5cdFx0XHRcdGRhdGE6ICc9PycsXG5cdFx0XHRcdGN0eDogJz0nLFxuXHRcdFx0XHRtb2RlOiAnQD8nLFxuXHRcdFx0XHRzYXZlQ2I6ICc9Pydcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRmdW5jdGlvbiBkckJvb2tFZGl0b3JDdHJsKCRzY29wZSkge1xuXHRcdHRoaXMuc3RhdHVzID0gJ2VkaXQnO1xuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRkckJvb2tFZGl0b3JDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5tb2RlIHx8IHRoaXMubW9kZSA9PT0gJ2NyZWF0ZScpIHRoaXMuZGF0YSA9IHtcblx0XHRcdG5hbWU6IFwiXCIsXG5cdFx0XHRhdXRob3JzOiBbW1wiXCIsIFwiXCJdXSxcblx0XHRcdHBhZ2VzOiBcIlwiLFxuXHRcdFx0cHVibGlzaGluZ19ob3VzZTogXCJcIixcblx0XHRcdHB1YmxpY2F0aW9uOiBcIlwiLFxuXHRcdFx0ZWRpdGlvbjogXCJcIixcblx0XHRcdGlzYm46IFwiXCIsXG5cdFx0XHRpbWFnZTogXCJcIlxuXHRcdH07XG5cblx0XHR0aGlzLnJldHVybklzYm5Db25maWcodGhpcy5kYXRhLmlzYm4pO1xuXHR9O1xuXG5cdGRyQm9va0VkaXRvckN0cmwucHJvdG90eXBlLnByb2Nlc3NGaWxlcyA9IGZ1bmN0aW9uIChmaWxlcykge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRhbmd1bGFyLmZvckVhY2goZmlsZXMsIGZ1bmN0aW9uIChmbG93RmlsZSwgaSkge1xuXHRcdFx0dmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0ZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0dmFyIHVyaSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdF90aGlzLmRhdGEuaW1hZ2UgPSB1cmk7XG5cdFx0XHRcdF90aGlzLiRzY29wZS4kZGlnZXN0KCk7XG5cdFx0XHR9O1xuXHRcdFx0ZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZsb3dGaWxlLmZpbGUpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGRyQm9va0VkaXRvckN0cmwucHJvdG90eXBlLnNhdmVDYXJkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGNvbnNvbGUubG9nKCctLS09PT0gdGhpcy5kYXRhID09PS0tLScsIHRoaXMuZGF0YSk7XG5cblx0XHRpZiAoIXRoaXMubW9kZSB8fCB0aGlzLm1vZGUgPT0gJ2NyZWF0ZScpIHtcblx0XHRcdHRoaXMuc2F2ZUNiLmNhbGwodGhpcy5jdHgsIHRoaXMuZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2F2ZUNiLmNhbGwodGhpcy5jdHgpO1xuXHRcdH1cblx0fTtcblxuXHRkckJvb2tFZGl0b3JDdHJsLnByb3RvdHlwZS5kZWxldGVBdXRob3IgPSBmdW5jdGlvbiAoZSwgaWR4KSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHR0aGlzLmRhdGEuYXV0aG9ycy5zcGxpY2UoaWR4LCAxKTtcblx0fTtcblxuXHRkckJvb2tFZGl0b3JDdHJsLnByb3RvdHlwZS5hZGRBdXRob3IgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0dGhpcy5kYXRhLmF1dGhvcnMucHVzaChbXCJcIiwgXCJcIl0pO1xuXHR9O1xuXG5cdGRyQm9va0VkaXRvckN0cmwucHJvdG90eXBlLnJldHVybklzYm5Db25maWcgPSBmdW5jdGlvbiAoaXNibikge1xuXHRcdGNvbnNvbGUubG9nKCctLS09PT0gaXNibiA9PT0tLS0nLCB0aGlzLmRhdGEuaXNibik7XG5cdFx0dmFyIGFyciA9IGlzYm47XG5cdFx0YXJyID0gYXJyLnNwbGl0KCctJyk7XG5cdFx0dGhpcy5pc2JuQ29uZmlnID0gYXJyWzBdLmxlbmd0aCA9PSAxID8ge1xuXHRcdFx0bGVuZ3RoOiAxMyxcblx0XHRcdHBhdHRlcm46ICd4LXh4eC14eHh4eC14Jyxcblx0XHRcdHJlOiBuZXcgUmVnRXhwKCdeKD86SVNCTig/Oi0xMCk/Oj/il48pPyg/PVswLTlYXXsxMH0kfCg/PSg/OlswLTldK1st4pePXSl7M30pWy3il48wLTlYXXsxM30kKVswLTldezEsNX1bLeKXj10/WzAtOV0rWy3il49dP1swLTldK1st4pePXT9bMC05WF0kJylcblx0XHR9IDoge1xuXHRcdFx0bGVuZ3RoOiAxNyxcblx0XHRcdHBhdHRlcm46ICc5eHgteC14eC14eHh4eHgteCcsXG5cdFx0XHRyZTogbmV3IFJlZ0V4cCgnXig/OklTQk4oPzotMTMpPzo/4pePKT8oPz1bMC05XXsxM30kfCg/PSg/OlswLTldK1st4pePXSl7NH0pWy3il48wLTldezE3fSQpOTdbODldWy3il49dP1swLTldezEsNX1bLeKXj10/WzAtOV0rWy3il49dP1swLTldK1st4pePXT9bMC05XSQnKVxuXHRcdH07XG5cdH07XG59KSgpO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0VkaXRCb29rQ3RybCcsIEVkaXRCb29rQ3RybCk7XG5cblx0RWRpdEJvb2tDdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnXTtcblxuXHRmdW5jdGlvbiBFZGl0Qm9va0N0cmwoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsIGxvY2FsU3RvcmFnZVNlcnZpY2UpIHtcblx0XHR0aGlzLiRzY29wZSA9ICRzY29wZTtcblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XG5cdFx0dGhpcy4kc3RhdGUgPSAkc3RhdGU7XG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlID0gbG9jYWxTdG9yYWdlU2VydmljZTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0RWRpdEJvb2tDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuYm9vayA9IGFuZ3VsYXIuY29weSh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdlZGl0Qm9vaycpKTtcblx0fTtcblxuXHRFZGl0Qm9va0N0cmwucHJvdG90eXBlLnNhdmVCb29rQ2IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJy0tLT09PSBjYWxsYmFjayA9PT0tLS0nKTtcblxuXHRcdHZhciBib29rcyA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2Jvb2tMaXN0Jyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBib29rcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0aWYgKHRoaXMuYm9vay5pZCA9PSBib29rc1tpXS5pZCkge1xuXHRcdFx0XHRib29rc1tpXSA9IHRoaXMuYm9vaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYm9va0xpc3QnLCBib29rcyk7XG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnZWRpdEJvb2snKTtcblx0XHR0aGlzLiRzdGF0ZS5nbygnbWFpbicpO1xuXHR9O1xufSkoKTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdtYWluQ3RybCcsIG1haW5DdHJsKTtcblxuXHRtYWluQ3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJ107XG5cblx0ZnVuY3Rpb24gbWFpbkN0cmwoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsIGxvY2FsU3RvcmFnZVNlcnZpY2UpIHtcblx0XHR0aGlzLiRzY29wZSA9ICRzY29wZTtcblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XG5cdFx0dGhpcy4kc3RhdGUgPSAkc3RhdGU7XG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlID0gbG9jYWxTdG9yYWdlU2VydmljZTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0bWFpbkN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5nZXRCb29rcygpO1xuXHR9O1xuXG5cdG1haW5DdHJsLnByb3RvdHlwZS5nZXRCb29rcyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0aWYgKCF0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdib29rTGlzdCcpKSB7XG5cdFx0XHR0aGlzLiRodHRwLmdldCgnLi9zcmMvZml4dHVyZXMvYm9va3MuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZXNwLmRhdGEubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRyZXNwLmRhdGFbaV0uX2F1dGhvciA9IHJlc3AuZGF0YVtpXS5hdXRob3JzWzBdWydzX25hbWUnXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYm9va0xpc3QnLCByZXNwLmRhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufSkoKTsiXX0=
