
	var code = null;
	var token = null;

	var curroom_id;
	var curteam_id;

	var curmem_id; 
	var curmem_email;

	var memberId = [];
	var isModerator = [];
	var isMonitor = [];
	var personEmail = [];
	var displayName = [];
	var avatar = [];

	var roomname = [];
	var roomid = [];
	var roomnum = [];
	var	roomtype = [];
	var	roomlocked = [];

	var teamname = [];
	var teamid = [];
	var teamcreated = [];
	
	var target = null;
	var message = null;
	var roomtarget;
	var teamtarget;
	
	var usemarkdown = true;

function checkmsg() {
	if ($("#msgtext").val())
	{
		$("#sendroom").removeClass("ui-state-disabled").removeAttr("disabled");
		switch($("#action-test").text()) {
			case "no one":
			case "selected members":
				$("#sendsms").attr("disabled", true);
				$("#sendspark").attr("disabled", true);
				$("#sendmarkdown").attr("disabled", true);
				$("#sendsms").addClass("ui-state-disabled");
				$("#sendspark").addClass("ui-state-disabled");
				$("#sendmarkdown").addClass("ui-state-disabled");
				break;
			default:
				$("#sendsms").removeAttr("disabled");
				$("#sendspark").removeAttr("disabled");
				$("#sendmarkdown").removeAttr("disabled");
				$("#sendsms").removeClass("ui-state-disabled");
				$("#sendspark").removeClass("ui-state-disabled");
				$("#sendmarkdown").removeClass("ui-state-disabled");
		}
	}
	else
	{
		$("#sendroom").addClass("ui-state-disabled");
		$("#sendspark").addClass("ui-state-disabled");
		$("#sendsms").addClass("ui-state-disabled");
		$("#sendmarkdown").addClass("ui-state-disabled");
		$("#sendsms").attr("disabled", true);
		$("#sendspark").attr("disabled", true);
		$("#sendroom").attr("disabled", true);
		$("#sendmarkdown").attr("disabled", true);
	}
}
 
function checknewroomname() {
	if ($("#createroomname").val())
	{
		$("#createroom").removeClass("ui-state-disabled").removeAttr("disabled");
		$(".createroomname").text($("#createroomname").val());
	}
    else
    {
		$("#createroom").addClass("ui-state-disabled").attr("disabled");
		$(".createroomname").text("...");
	}
		
}
 
 function checknewteamname() {
	if ($("#createteamname").val())
	{
		$("#createteam").removeClass("ui-state-disabled").removeAttr("disabled");
		$(".createteamname").text($("#createteamname").val());
	}
    else
    {
		$("#createteam").addClass("ui-state-disabled").attr("disabled");
		$(".createteamname").text("...");
	}
		
}

        
function checkroomemail() {
	var email = $("#inviteToRoom").val();
	var good = isEmail(email);
	if (good)
	{
		$("#invitetoroom").removeClass("ui-state-disabled").removeAttr("disabled");
	}
    else
    {
		$("#invitetoroom").addClass("ui-state-disabled").attr("disabled");
	}
}

function checkteamemail() {
	var email = $("#inviteToTeam").val();
	var good = isEmail(email);
	if (good)
	{
		$("#invitetoteam").removeClass("ui-state-disabled").removeAttr("disabled");
	}
    else
    {
		$("#invitetoteam").addClass("ui-state-disabled").attr("disabled");
	}
}

function clearjson() {
	$("#codetext").html("");
	$("#tokentext").html("");
	$("#roomtext").html("");
	$("#teamtext").html("");
	$("#messagetext").html("");
	$("#membertext").html("");
	$("#misctext").html("");
}


function getcode(key) {
    var tmp = location.search;
    var reg = RegExp(key + "=([^&#]*)");
    var result = reg.exec(tmp);
    code=result[1];
	$("#codetext").append("<span style='color:#74bf45'>CODE - - Received code: "+code+"</span><br><br>");
    return code;
}

function getmemberavatar(index, email) {
    var az = "Bearer " + token;
	var i;
	var foundavatar;
		
$.ajax({
    type:"GET",
    url:"https://api.ciscospark.com/v1/people",
    headers:
	{Authorization: az,},
    datatype:"json",
	async: false,
    data:
    {"email":email,    },
    success:function(response)
    {
		for (i=response.items.length-1;i>=0;i--)
    	{
    		foundavatar = response.items[i].avatar;

    	}
    }
});
return foundavatar;
}

function getmemberdisplayname(index, email) {
    var az = "Bearer " + token;
	var i;
	var foundname;
		
$.ajax({
    type:"GET",
    url:"https://api.ciscospark.com/v1/people",
    headers:
	{Authorization: az,},
    datatype:"json",
	async: false,
    data:
    {"email":email,    },
    success:function(response)
    {
		for (i=response.items.length-1;i>=0;i--)
    	{
    		foundname = response.items[i].displayName;

    	}
    }
});
return foundname;
}


function gettoken() {
	var cid="Your Client ID here";
    var cret="Your Client Secret here";
 $.ajax({
        type:"POST",
        datatype:"json",
        url:"https://api.ciscospark.com/v1/access_token",
  		'Content-Type':"application/x-www-form-urlencoded:charset=UTF-8",
        data:{
          grant_type:"authorization_code",
          client_id:cid,
          client_secret:cret,
          code:code,
          redirect_uri:"Your Redirect URI here"
        },
        success: function(response){
 		$("#tokentext").append("<span style='color:#74bf45'>TOKEN - - Sent token request:</span><br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; type:</span> POST<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; url:</span> https://api.ciscospark.com/v1/access_token<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; Content-Type:</span> 'application/x-www-form-urlencoded:charset=UTF-8'<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; data: grant_type:</span> 'authorization_code'<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; data: client_id:</span> Your Client ID here<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; data: client_secret:</span> Your Client Secret here<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; data: code:</span> "+code+"<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; data: redirect_uri:</span> 'Your Redirect URI here'<br><br>");
        $("#tokentext").append("<span style='color:#74bf45'>TOKEN - - Received token response:</span><br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; response: access_token:</span> "+response.access_token+"<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; response: expires_in:</span> "+response.expires_in+" (seconds)<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; response: refresh_token:</span> "+response.refresh_token+"<br>");
		$("#tokentext").append("<span style='color:#1999d5'>&nbsp; response: refresh_token_expires_in:</span> "+response.refresh_token_expires_in+" (seconds)<br><br>");

		token = response.access_token;
        /*alert(token);*/ /*For troublshooting*/
        getrooms();
		getteams();
 }

 });
    
}

function inviteroommember() {
	var az = "Bearer " + token;
	var email = $("#inviteToRoom").val();
	$.ajax({
		type:"POST",
		url:"https://api.ciscospark.com/v1/memberships",
		async:false,
		headers:
		{Authorization: az,},
		datatype:"json",
		data:
		{"roomId":curroom_id, "personEmail":email},
		success:function()
		{
			alert("Member Invited");
			$("#invitetoroom").addClass("ui-state-disabled").attr("disabled");
			$("#inviteToRoom").val("");
			
			$("#misctext").append("<span style='color:#74bf45'>INVITE - - Room Invitation request:</span><br>");

			$("#misctext").append("<span style='color:#1999d5'>&nbsp; type:</span> POST<br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; url:</span> https://api.ciscospark.com/v1/memberships<br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; Authorization:</span> "+az+"<br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; data: roomId:</span> "+curroom_id+"<br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; data: personEmail:</span> "+email+"<br><br>");
			
		}
		});
	getroommembers(curroom_id);
}
	
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function lookupbyemail() {
	var az = "Bearer " + token;
	var i;
	var id;
	$.ajax({
		type:"GET",
		url:"https://api.ciscospark.com/v1/memberships",
		async:false,
		headers:
		{Authorization: az,},
		datatype:"json",
		data:
		{"roomId":curroom_id, "personEmail":curmem_email},
		success:function(response)
		{
			for (i=response.items.length-1;i>=0;i--)
    		{
				id=response.items[i].id;
			}
		}
	});
	return id
}

function removebyemail() {
	var az = "Bearer " + token;
	var id;
	id = lookupbyemail();
	if (id)
	{
		$.ajax({
		type:"DELETE",
		url:"https://api.ciscospark.com/v1/memberships/" + id,
		async:false,
		headers:
		{Authorization: az,},
		success:function()
		{
			alert("User Removed");
			$("#removemember").addClass("ui-state-disabled").attr("disabled");
			$("#videocall").addClass("ui-state-disabled").attr("disabled");
			$(".action-person").text("no one");	
			$("#misctext").append("<span style='color:#74bf45'>DELETE MEMBERSHIP - - Membership Delete request:</span><br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; type:</span> DELETE<br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; url:</span> https://api.ciscospark.com/v1/memberships/"+id+"<br>");
			$("#misctext").append("<span style='color:#1999d5'>&nbsp; Authorization:</span> "+az+"<br><br>");
		}
		});
	}
	getroommembers(curroom_id);
}

function sendroommsg() {
    var az = "Bearer " + token;
	var message = $("#msgtext").val();
	if(!message || !roomtarget)
		{
			return false;
		}
	
	if (usemarkdown)
		{
			$.ajaxSetup({
				data: {
				"markdown":message,
				"text":"",
				}
			});
		}
	else {
		$.ajaxSetup({
			data: {
			"markdown":"",
			"text":message,
			}
		});
	}
	
$.ajax({
    type:"POST",
    url:"https://api.ciscospark.com/v1/messages",
    headers:{
        authorization: az,
    },
    datatype:"json",
    data:
    {
    	"roomId":roomtarget,

    },
    success:function()
    {
    $("#msgconsole").append("<span style='color:#74bf45'>You:</span> <span style='color:#d0d2d1'>" + message + "</span><br>");
	$("#msgtext").val("");
	checkmsg();   
    }

});
  }
 
  
  
function sendtropo() {
    
	var tropotoken = "Your Tropo Token here"
	var message = $("#msgtext").val();
	var callnumber = prompt("Please enter the 10-digit US phone number to text to.\nDo not include the country code (1).");
	var filter = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (!filter.test(callnumber)) 
		{
			return false;
		}
	
	if(!message)
		{
			return false;
		}
	
$.ajax({
    type:"GET",
    url:"https://api.tropo.com/1.0/sessions?",
   
    datatype:"json",
    data:
    {
    	"action":"create",
		"token":tropotoken,
		"numbertodial":callnumber,
		"messages": message,
    },
    success:function()
    {
	$("#msgtext").val("");
	checkmsg();   
    }
    
});
  }

function goauthorize() {
		  	var ref = "Your OAuth URL here";
	  $(location).attr('href',ref);  
    } 

$(document).on("change",".usercheck",function() {
		var selected = [];
		var count = 0;
		var onename;
		curmem_email = "";
		$("#selectedlist").empty();
		$("#roomorteammembers input:checked").each(function() {
			count++;
			selected.push($(this).attr('value'));
			onename = $(this).attr('value');
			curmem_email = personEmail[$(this).attr('id')];
			$("#selectedlist").append($(this).attr('value')+"<br>");
		});
		$("#selectedcount").text(count);
		switch (count) {
			case 0:
				$(".action-person").text("no one");
				$("#videocall").addClass("ui-state-disabled");
				$("#removemember").addClass("ui-state-disabled").attr("disabled");
				break;
			case 1:
				$(".action-person").text(onename);
				$("#videocall").removeClass("ui-state-disabled");
				$("#removemember").removeClass("ui-state-disabled").removeAttr("disabled");
				break;
			default:
				$(".action-person").text("selected members");
				$("#videocall").removeClass("ui-state-disabled");
				$("#removemember").addClass("ui-state-disabled").attr("disabled");
		}
		checkmsg();	
	}); 
	  
$("#roomlist1").selectmenu({
  select: function( event, ui ) {
	  if  ($("#roomlist1 option:selected").text()==="Select a Room")
	  {
		  $(".chosenroom").text("...");
		  $("#deleteroom").addClass("ui-state-disabled").attr("disabled");
		  $("#inviteToRoom").addClass("ui-state-disabled").attr("disabled");

  	  }
	  else
	  {
		$(".chosenroom").text($("#roomlist1 option:selected").text());
	  	$("#deleteroom").removeClass("ui-state-disabled").removeAttr("disabled");
	  	$("#inviteToRoom").removeClass("ui-state-disabled").removeAttr("disabled");
		target = $("#roomlist1 option:selected").val();
        roomtarget = target;
		curroom_id = target;
		$("#console").html("");
		$("#consolecontainer").show();
		$(".Roomorteam").text("Room");
		$(".roomorteam").text("room");
        setInterval(getroommessages(target),10000);
        getroommembers(target);
	  }
  }
});

$("#teamlist1").selectmenu({
  select: function( event, ui ) {
	  if ($("#teamlist1 option:selected").text()==="Select a Team")
	  {
		  $(".chosenteam").text("...");
		  $("#deleteteam").addClass("ui-state-disabled").attr("disabled");
		  $("#inviteToteam").addClass("ui-state-disabled").attr("disabled");

  }
	  else
	  {
		$(".chosenteam").text($("#teamlist1 option:selected").text());
	  	$("#deleteteam").removeClass("ui-state-disabled").removeAttr("disabled");
	  	$("#inviteToTeam").removeClass("ui-state-disabled").removeAttr("disabled");
		target = $("#teamlist1 option:selected").val();
        teamtarget = target;
		curteam_id = target;
		$("#consolecontainer").hide();
		$(".Roomorteam").text("Team");
		$(".roomorteam").text("team");
        getteammembers(target);
	  }
  }
});
	
$("#showcode").change(function() {
	if ($(this).is(":checked")) {
		$("#showcodelabel span").text("Hide");
		$("#codetext").show();
	}
	else
	{
		$("#showcodelabel span").text("Show");
		$("#codetext").hide();
	}
});
			
$("#showtoken").change(function() {
	if ($(this).is(":checked")) {
		$("#showtokenlabel span").text("Hide");
		$("#tokentext").show();
	}
	else
	{
		$("#showtokenlabel span").text("Show");
		$("#tokentext").hide();
	}
});

$("#showroom").change(function() {
	if ($(this).is(":checked")) {
		$("#showroomlabel span").text("Hide");
		$("#roomtext").show();
	}
	else
	{
		$("#showroomlabel span").text("Show");
		$("#roomtext").hide();
	}
});
	
$("#showteam").change(function() {
	if ($(this).is(":checked")) {
		$("#showteamlabel span").text("Hide");
		$("#teamtext").show();
	}
	else
	{
		$("#showteamlabel span").text("Show");
		$("#teamtext").hide();
	}
});

$("#showmessage").change(function() {
	if ($(this).is(":checked")) {
		$("#showmessagelabel span").text("Hide");
		$("#messagetext").show();
	}
	else
	{
		$("#showmessagelabel span").text("Show");
		$("#messagetext").hide();
	}
});

$("#showmember").change(function() {
	if ($(this).is(":checked")) {
		$("#showmemberlabel span").text("Hide");
		$("#membertext").show();
	}
	else
	{
		$("#showmemberlabel span").text("Show");
		$("#membertext").hide();
	}
});

$("#enablemarkdown").change(function() {
	if ($(this).is(":checked")) {
		$("#labelmarkdown span").text(" Markdown Enabled");
		$("#labelmarkdown img").attr("src","images/markdown-icon.png");
		usemarkdown = true;
	}
	else
	{
		$("#labelmarkdown span").text(" Markdown Disabled");
		$("#labelmarkdown img").attr("src","images/markdown-disabled-icon.png");
		usemarkdown = false;
	}
});

function winpop(add,w,h)
{

window.open(add,"","width="+w+",height="+h+",location=0,directories=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1,top=50,left=50");
window.location.reload();
}



/* END */