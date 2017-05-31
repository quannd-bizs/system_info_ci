
<!DOCTYPE html>
<html>
<head>
	<title>TEST JQUERY</title>
	<style>
	#circle{
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background-color: green;
	}
	</style>
	<!-- <? $this->load->library('javascript/jquery'); ?> -->
	<script type="text/javascript" src=jquery-3.2.1.min.js></script>
</head>
<body>
<div id = "circle">
SHOW/HIDE
<br>
</div>
<iframe src="http://vietnamnet.vn/"></iframe>

<script type="text/javascript">
	/*if(typeof jQuery == "undefined"){
		alert("JQUERY is not installed correctly!");
	}else{
		alert("JQUERY is installed correctly!");
	}*/
	$("#circle").click(function(){
		// $("#circle").html("This is a text");
		// alert("clicked");
		$("iframe").attr("src", "http://bipvn.com.vn");
	});
</script>

<a href="#" onclick="" >Toggle show/hide</a>
</body>
</html>