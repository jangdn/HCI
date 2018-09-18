<?php
	
	function dbconnect($host, $id, $pass, $db)  //
	{
		$connect=mysqli_connect($host, $id, $pass, $db);
		if ($connect == false) {
			die('Database Not Connected :'.mysqli_error());
		}
		return $connect;
	}

	function msg($msg) // 경고메시지출력후이전페이지로이동
	{
	echo "<meta http-equiv=\"Content-Type\"content=\"text/html; charset=euc-kr\"/>
	<script>
		window.alert('$msg');
		history.go(-1);
	</script>" ;
	exit;
	}

	function s_msg($msg) //	일반메시지출력
	{
	echo "<meta http-equiv=\"Content-Type\"content=\"text/html; charset=euc-kr\"/>
	<script>
		window.alert('$msg');
	</script>";
	}
?>