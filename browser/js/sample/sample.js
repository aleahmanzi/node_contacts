myApp.directive('sampleDirective', function(){
  return {
    restrict: 'E',
    template: "<h3 style='color: white'>This is the sample Directive, the input is {{test}}</h3>",
    scope: {
      imgSrc: '=imgSrc',
      test: '=test'
    },
    link: function(scope, element, attr){
    }
  }
});