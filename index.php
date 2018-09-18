<?
include ("header.php");
include ("config.php");
?>
<?include ("front.php");?>

<div id="fh5co-main">

	<div class="fh5co-narrow-content">

	  	<h2>Streaming</h2>

		<div class="row animate-box" data-animate-effect="fadeInLeft">
			<div>
				<?php
				$conn = dbconnect($host, $dbid, $dbpass, $dbname);
				mysqli_query("set autocommit = 0", $conn);
				mysqli_query("set transacton isolation level read committed", $conn);
				mysqli_query("start transacton", $conn);

				$query1 = "select * from MV natural join ggroup ORDER BY mv_count DESC";
				$result1 = mysqli_query($conn, $query1);
				if (!$result1) {
					mysqli_query("rollback", $conn);
					s_msg("제대로 로드되지 않았습니다.");
			         die('Query Error : ' . mysqli_error());
			    }
			    else
			    {
				    if (mysqli_num_rows($result1) < 4)
				    	$row_num1 = mysqli_num_rows($result1);
				    else $row_num1 = 4;
					for($i = 1; $i<=$row_num1 ;$i++)
					{
						$row = mysqli_fetch_array($result1);
						$img_link = 'http://img.youtube.com/vi/';
						$img_link .= $row['mv_link'];
						$img_link .='/1.jpg';
						echo "<div class='col-md-6 col-sm-6 col-xs-6 col-xxs-12 work-item'>";
						echo "<a href='detail_mv.php?mv_ID={$row['mv_ID']}'>";
						echo "<img src={$img_link} alt='없어요!' class='img-responsive'>";
						echo "<h3 class='fh5co-work-title'>{$row['mv_name']}</h3>";
						echo "<p>ID:{$row['mv_ID']}</p> <p>가수:{$row['g_name']}</p>";
						echo "</a>";
						echo "</div>";
					}
					mysqli_query("commit", $conn);
				}
			?>
				
			<div class="clearfix visible-sm-block"></div>
			<p>
			<div><a href = 'search_mv.php'><h4 class='fh5co-work-title'>more MV</h4></a></div>
			</p>
			</div>

			<div><center><h3 class='fh5co-work-title' style ="align-content: center;">Music List</h3></center></div>
			<?php
				
				$query = "select * from music natural join ggroup ORDER BY mu_count DESC";
				$result = mysqli_query($conn, $query);
				 if (!$result) {
				 	mysqli_query("rollback", $conn);
					s_msg("제대로 로드되지 않았습니다.");
			        die('Query Error : ' . mysqli_error());
			    }
			    else
			    {
				    if (mysqli_num_rows($result) < 4)
				    	$row_num = mysqli_num_rows($result);
				    else $row_num = 4;
					
					for($i = 1; $i<=$row_num ;$i++)
					{
						$row = mysqli_fetch_array($result);
						echo "<div class='col-md-12 col-sm-12 col-xs-12 col-xxs-12 work-item'>";
						echo "<a href='detail.php?mu_ID={$row['mu_ID']}'>";
						echo "<h3 class='fh5co-work-title'>{$row['mu_name']}</h3>";
						echo "<p>ID:{$row['mu_ID']} 가수:{$row['g_name']}</p>";
						echo "</a>";
						echo "</div>";
					}
					mysqli_query("commit", $conn);
				}
				mysqli_close($conn);
			?>
				<div class="clearfix visible-sm-block"></div>
				<div><a href = 'search_music.php'><h4 class='fh5co-work-title'>more Music</h4></a></div>
			</div>
		</div>
	</div>
	
	

</div>

<?include ("back.php");?>