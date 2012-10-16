$(function() {
	        var ccnumber = $( "#ccnumber" ),
	            expiration = $( "#expiration" ),
	            custname = $("#custname"),
	            allFields = $( [] ).add( ccnumber ).add( expiration ).add(custname),
	            title = $( "#dialog-form" ).attr('title'),
	            tips = $( ".validateTips" );
	 
	        function updateTips( t ) {
	            tips
	                .text( t )
	                .addClass( "ui-state-highlight" );
	            setTimeout(function() {
	                tips.removeClass( "ui-state-highlight", 1500 );
	            }, 500 );
	        }
	 
	        function checkLength( o, n, min, max ) {
	            if ( o.val().length > max || o.val().length < min ) {
	                o.addClass( "ui-state-error" );
	                updateTips( "Credit card number must contain 16 digits" );
	                return false;
	            } else {
	                return true;
	            }
	        }
	 
	        function checkRegexp( o, regexp, n ) {
	            if ( !( regexp.test( o.val() ) ) ) {
	                o.addClass( "ui-state-error" );
	                updateTips( n );
	                return false;
	            } else {
	                return true;
	            }
	        }
	 
	        $( "#dialog-form" ).dialog({
	            autoOpen: false,
	            height: 400,
	            width: 450,
	            modal: true,
	            buttons: {
	                "Purchase": function() {
	                    var bValid = true;
	                    allFields.removeClass( "ui-state-error" );
	 
// 	                    bValid = bValid && checkLength( ccnumber, "ccnumber", 3, 16 );
// 	                    bValid = bValid && checkLength( expiration, "expiration", 6, 80 );
	                    
// 	                    bValid = bValid && checkRegexp( ccnumber, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
	                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
	                    //bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
	                   
	                    if ( bValid ) {
	                        //alert("Valid")
	                        var d = document.getElementById('dialog-form');
			                console.log(d)
	                        //alert("Title: " + d.getAttribute("title"))
	                        order(d.getAttribute("title"), custname.val(), ccnumber.val(), expiration.val())
	                        $( this ).dialog( "close" );
	                    }
	                },
	                Cancel: function() {
	                    $( this ).dialog( "close" );
	                }
	            },
	            close: function() {
	                allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	        });
	    });
		
		function dialog(name) {
			var d = document.getElementById('dialog-form');
			d.setAttribute("title", name)
			$( "#dialog-form" ).dialog( {title: name, autoOpen: true});
		}
		
  		function remove(order) {
  		    var d = document.getElementById('orders');
            var olddiv = document.getElementById(order);
            d.removeChild(olddiv);
  		}
  		
  		
  		function order(name, cname, ccnumber, expiration) {
	  	  	$.ajax({
	     	   type: "GET",
	     	   async: false,
	     	   url: "services/orders",
	     	   data: "order={ \"name\":\"" + name + "\", \"customerName\":\"" + cname + "\", \"creditCard\":\"" + ccnumber + "\", \"expiration\":\"" + expiration + "\"}",
	     	   success: function(msg){
	 				$(jQuery.parseJSON(JSON.stringify(msg))).each(function() {  
	 					var ni = document.getElementById('orders')
	 					ni.innerHTML = ni.innerHTML + '<a id="' + this.date + '" href="#" onClick="remove(\'' + this.date + '\')">&nbsp;&nbsp;&nbsp;' 
	 						+ " [ " + this.customerName + " : " + this.name + " ] " + '</a>'
	 				});
	     	   },
	 	       error: function(fail){
	 	    	   $("#response").html(
	     		           "<b>The 'Order processing' system is currently unavailable. Please try again later</b>"
	     		     );
	 	       }	
	     	 });
  		}