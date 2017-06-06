
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
    <script type="text/javascript" src=www/js/common/jquery/jquery-3.2.1.min.js></script>
</head>
<body>
<div id = "circle">
<?php echo base_url(). "sysinfo_admin/log_search"; ?>
<br>
</div>
<!--<iframe src="http://vietnamnet.vn/"></iframe>-->

<script type="text/javascript">
	/*if(typeof jQuery == "undefined"){
		alert("JQUERY is not installed correctly!");
	}else{
		alert("JQUERY is installed correctly!");
	}*/
    var url1 = "<?php echo base_url(). "sysinfo_admin/log_search"; ?>";
	$("#circle").click(function(){
		// $("#circle").html("This is a text");
		// alert("clicked");
//		$("iframe").attr("src", "http://bipvn.com.vn");
        
        $.get(url1, function(data){
//            alert(data);
            $("a").html(data);
        });
	});
</script>

<a href="#" onclick="" >Toggle show/hide</a>
</body>
</html>