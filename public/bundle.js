document.write("posting....");

$(function () {
    
$.ajax({
  type: "POST",
  url: "http://localhost:8080/tests",
  data: {name:'manu',age:28},
  success: function(data){
  	console.log('success');
  	console.log(data);

  },
  dataType: "json"
});



    });




//webpack ./view/entry.js view/bundle.js
