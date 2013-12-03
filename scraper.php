<?php


// $raw_url="http://www.pro-football-reference.com/play-index/play_finder.cgi?request=1&match=summary_all&year_min=2003&year_max=2013&team_id=&opp_id=&game_type=&playoff_round=&game_num_min=%s&game_num_max=%s&week_num_min=0&week_num_max=99&quarter=1&quarter=2&quarter=3&quarter=4&quarter=5&tr_gtlt=lt&minutes=15&seconds=00&down=4&yds_to_go_min=&yds_to_go_max=&yg_gtlt=gt&yards=&is_first_down=-1&field_pos_min_field=%s&field_pos_min=%s&field_pos_max_field=%s&field_pos_max=%s&type=PUNT&is_turnover=-1&is_scoring=-1&no_play=0&game_day_of_week=&game_location=&game_result=&margin_min=&margin_max=&order_by=game_date";
// $json = array ();

// $min = 49;
// $max = 49;
// while($max >= 35) {
// 	if(!isset($json[$max])) $json[$max] = array ();
// 	$url = sprintf($raw_url, 1, 16, "opp", $min, "opp", $max);
// 	$html = file_get_contents($url);
// 	preg_match_all('/<td align=""\s*class=" wrap">.*<\/td>\s*<td align="center" >([0-9]*)<\/td>\s*<td align="right" >([0-9]*)<\/td>\s*<td align="right" >([0-9]*)<\/td>\s*<\/tr>/', $html, $matches);
// 	if($matches) {
// 		$i = sizeof($matches[0]);
// 		for($z = 0; $z < $i; $z++) {
// 			$fumble = (int) trim($matches[1][$z]);
// 			$kick = (int) trim($matches[2][$z]);
// 			$ret = (int) trim($matches[3][$z]);
// 			$json[$max][] = ($kick - $fumble - $ret);
// 		}
// 	}
// 	echo ">>>> $max yard line".PHP_EOL;
// 	echo implode(',',$json[$max]).PHP_EOL;
// 	echo PHP_EOL;
// 	$min--;
// 	$max--;
// }
// die(json_encode($json));

// $raw_url = "http://www.pro-football-reference.com/play-index/drive_finder.cgi?request=1&year_min=2003&year_max=2013&team_id=&opp_id=&game_type=R&game_location=&game_result=&game_num_min=0&game_num_max=99&week_num_min=0&week_num_max=99&game_day_of_week=&start_event=Downs&start_event=Interception&start_event=Punt&start_event=Blocked+FG&start_event=Missed+FG&start_event=Fumble&start_event=Muffed+Punt&start_event=Blocked+Punt&start_event=Kickoff&start_event=Onside+Kick&start_event=Own+Kickoff&start_event=Muffed+Kickoff&end_event=Touchdown&end_event=Field+Goal&end_event=Missed+FG&end_event=Fumble&end_event=Interception&end_event=Downs&end_event=Punt&end_event=Blocked+Punt&end_event=Blocked+FG&end_event=Safety&end_event=End+of+Half&end_event=End+of+Game&drive_result=&exclude_kneels=1&drive_st_gtlt=eq&drive_st_own_opp=%s&drive_st_yds=%s&drive_end_gtlt=lt&drive_end_own_opp=Opp&drive_end_yds=&quarter_start=1&quarter_start=2&quarter_start=3&quarter_start=4&quarter_start=5&tr_gtlt=lt&minutes=15&seconds=00&margin_min=&margin_max=&c1stat=&c1comp=gt&c1val=&c2stat=&c2comp=gt&c2val=&c3stat=&c3comp=gt&c3val=&c4stat=&c4comp=gt&c4val=&order_by=";
// $json = array ();
// $yd = 49;

// while($yd > 0) {
// 	echo "$yd yard line".PHP_EOL;
// 	$y = 100-$yd;
// 	$json[$y] = array ();
// 	$url = sprintf($raw_url, "Opp", $yd);
// 	$html = file_get_contents($url);
// 	preg_match('/Field Goal<\/td>\s*<td align=""\s*>.*<\/td>\s*<td align=""\s*>(.*)<\/td>\s*<\/tr>/', $html, $matches1);
// 	preg_match('/Touchdown<\/td>\s*<td align=""\s*>.*<\/td>\s*<td align=""\s*>(.*)<\/td>/', $html, $matches2);
// 	$fg = (float) str_replace("%","",$matches1[1]);
// 	$td = (float) str_replace("%", "", $matches2[1]);
// 	$composite = (($fg*3) + ($td*7))/100;

// 	$json[$y]['FG'] = $fg;
// 	$json[$y]['TD'] = $td;
// 	$json[$y]['Composite'] = $composite;

// 	$yd--;
// }
// die(json_encode($json));


// $raw_url = "http://wp.advancednflstats.com/4thDownCalc.php?scorediff=&minleft=&sec=&ydline=%s&fldside=%s&qtr=undefined&togo=%s";
// $json = array ();
// for($i = 1; $i < 100; $i++) {
// 	$yd = $i;
// 	if($yd > 50) {
// 		$side = "opp";
// 		$yd = 100-$yd;
// 	}
// 	else {
// 		$side = "own";
// 	}
// 	for($j = 11; $j <= 15; $j++) {
// 		echo "YARD: $yd, TOGO: $j".PHP_EOL;
// 		$url = sprintf($raw_url, $yd, $side, $j);
// 		$html = file_get_contents($url);
// 		preg_match('/Success Rate\:\s*<\/td><td>([0-9\.%]+)/', $html, $matches);
// 		$pct = $matches[1];
// 		$json["{$i}_{$j}"] = $pct;
// 	}
// }
// die(json_encode($json));

// $raw_url = "http://www.pro-football-reference.com/play-index/drive_finder.cgi?request=1&year_min=%s&year_max=%s&team_id=&opp_id=&game_type=R&game_location=&game_result=&game_num_min=%s&game_num_max=%s&week_num_min=0&week_num_max=99&game_day_of_week=&start_event=Downs&start_event=Interception&start_event=Punt&start_event=Blocked+FG&start_event=Missed+FG&start_event=Fumble&start_event=Muffed+Punt&start_event=Blocked+Punt&start_event=Kickoff&start_event=Onside+Kick&start_event=Own+Kickoff&start_event=Muffed+Kickoff&end_event=Downs&end_event=Punt&end_event=Blocked+Punt&drive_result=&exclude_kneels=1&drive_st_gtlt=lt&drive_st_own_opp=Own&drive_st_yds=&drive_end_gtlt=lt&drive_end_own_opp=Opp&drive_end_yds=&quarter_start=1&quarter_start=2&quarter_start=3&quarter_start=4&quarter_start=5&tr_gtlt=lt&minutes=15&seconds=00&margin_min=&margin_max=&c1stat=&c1comp=gt&c1val=&c2stat=&c2comp=gt&c2val=&c3stat=&c3comp=gt&c3val=&c4stat=&c4comp=gt&c4val=&order_by=game_date";
// $json = array ();
// for($a = 2003; $a <= 2013; $a++) {
// 	for($b = 1; $b <= 16; $b++) {
// 		echo "$a, game $b".PHP_EOL;
// 		$url = sprintf($raw_url, $a, $a, $b, $b);
// 		$html = file_get_contents($url);
// 		preg_match_all('/csk="([0-9]+)">(Own|Opp) ([0-9]+)<\/td>/', $html, $matches);
// 		for($j=1; $j < sizeof($matches[1]); $j+=2) {
// 			$val = (100-$matches[1][$j]);
// 			$json[] = $val;
// 		}
// 	}
// }
// die(json_encode($json));

// $raw_url = "http://www.pro-football-reference.com/play-index/drive_finder.cgi?request=1&year_min=%s&year_max=%s&team_id=&opp_id=&game_type=R&game_location=&game_result=&game_num_min=%s&game_num_max=%s&week_num_min=0&week_num_max=99&game_day_of_week=&start_event=Downs&start_event=Interception&start_event=Punt&start_event=Blocked+FG&start_event=Missed+FG&start_event=Fumble&start_event=Muffed+Punt&start_event=Blocked+Punt&start_event=Kickoff&start_event=Onside+Kick&start_event=Own+Kickoff&start_event=Muffed+Kickoff&end_event=Touchdown&end_event=Field+Goal&end_event=Missed+FG&end_event=Fumble&end_event=Interception&end_event=Downs&end_event=Punt&end_event=Blocked+Punt&end_event=Blocked+FG&end_event=Safety&end_event=End+of+Half&end_event=End+of+Game&drive_result=&exclude_kneels=1&drive_st_gtlt=lt&drive_st_own_opp=Own&drive_st_yds=&drive_end_gtlt=lt&drive_end_own_opp=Opp&drive_end_yds=&quarter_start=1&quarter_start=2&quarter_start=3&quarter_start=4&quarter_start=5&tr_gtlt=lt&minutes=15&seconds=00&margin_min=&margin_max=&c1stat=&c1comp=gt&c1val=&c2stat=&c2comp=gt&c2val=&c3stat=&c3comp=gt&c3val=&c4stat=&c4comp=gt&c4val=&order_by=game_date";
// $json = array ();
// for($a = 2003; $a <= 2013; $a++) {
// 	for($b = 1; $b <= 16; $b++) {
// 		echo "$a, game $b".PHP_EOL;
// 		$url = sprintf($raw_url, $a, $a, $b, $b);
// 		$html = file_get_contents($url);
// 		preg_match_all('/csk="([0-9]+)">(Own|Opp) ([0-9]+)<\/td>/', $html, $matches);
// 		for($j=0; $j < sizeof($matches[1]); $j+=2) {
// 			$val = (100-$matches[1][$j]);
// 			$json[] = $val;
// 		}
// 	}
// }
// die(json_encode($json));


// $raw_url = "http://www.pro-football-reference.com/play-index/drive_finder.cgi?request=1&year_min=%s&year_max=%s&team_id=&opp_id=&game_type=R&game_location=&game_result=&game_num_min=0&game_num_max=99&week_num_min=0&week_num_max=99&game_day_of_week=&start_event=Downs&start_event=Interception&start_event=Punt&start_event=Blocked+FG&start_event=Missed+FG&start_event=Fumble&start_event=Muffed+Punt&start_event=Blocked+Punt&start_event=Kickoff&start_event=Onside+Kick&start_event=Own+Kickoff&start_event=Muffed+Kickoff&end_event=Touchdown&end_event=Field+Goal&end_event=Missed+FG&end_event=Fumble&end_event=Interception&end_event=Downs&end_event=Punt&end_event=Blocked+Punt&end_event=Blocked+FG&end_event=Safety&end_event=End+of+Half&end_event=End+of+Game&drive_result=&exclude_kneels=1&drive_st_gtlt=lt&drive_st_own_opp=Own&drive_st_yds=&drive_end_gtlt=lt&drive_end_own_opp=Opp&drive_end_yds=&quarter_start=1&quarter_start=2&quarter_start=3&quarter_start=4&quarter_start=5&tr_gtlt=lt&minutes=15&seconds=00&margin_min=&margin_max=&c1stat=&c1comp=gt&c1val=&c2stat=&c2comp=gt&c2val=&c3stat=&c3comp=gt&c3val=&c4stat=&c4comp=gt&c4val=&order_by=";
// $json = array ();
// for($i = 2003; $i <= 2013; $i++) {
// 	echo $i;
// 	$url = sprintf($raw_url, $i, $i);
// 	$html = file_get_contents($url);
// 	preg_match_all('/csk="([0-9]+)">(Own|Opp) ([0-9]+)<\/td>/', $html, $matches);
// 	for($j=0; $j < sizeof($matches[1]); $j+=2) {
// 		$val = (100-$matches[1][$j]);
// 		$json[] = $val;

// 	}
// }
// die(json_encode($json));


// $raw_url = "http://www.pro-football-reference.com/play-index/play_finder.cgi?request=1&match=summary_all&year_min=%s&year_max=%s&team_id=&opp_id=&game_type=R&playoff_round=&game_num_min=0&game_num_max=99&week_num_min=0&week_num_max=99&quarter=1&quarter=2&quarter=3&quarter=4&quarter=5&tr_gtlt=lt&minutes=15&seconds=00&down=4&yds_to_go_min=%s&yds_to_go_max=%s&yg_gtlt=gt&yards=&is_first_down=1&field_pos_min_field=team&field_pos_min=&field_pos_max_field=team&field_pos_max=&type=PASS&type=RUSH&is_turnover=-1&is_scoring=-1&no_play=0&game_day_of_week=&game_location=&game_result=&margin_min=&margin_max=&order_by=game_date";
// $json = array ();
// for($i = 2003; $i <= 2013; $i++) {
// 	echo $i.PHP_EOL;
// 	for($j = 1; $j <= 15; $j++) {
// 		echo $j.PHP_EOL;
// 		if(!isset($json[$j])) $json[$j] = array ();
// 		$url = sprintf($raw_url, $i, $i, $j, $j);
// 		$html = file_get_contents($url);
// 		preg_match_all('/<td align="center"\s*>([0-9]+)<\/td>\s*<\/tr>/', $html, $matches);
// 		foreach($matches[1] as $val) {
// 			$json[$j][] = $val;
// 		}
// 	}
// }
// die(json_encode($json));



// $raw_url = "http://www.pro-football-reference.com/play-index/play_finder.cgi?request=1&match=summary_all&year_min=2003&year_max=2013&team_id=&opp_id=&game_type=R&playoff_round=&game_num_min=1&game_num_max=15&week_num_min=0&week_num_max=99&quarter=1&quarter=2&quarter=3&quarter=4&quarter=5&tr_gtlt=lt&minutes=15&seconds=00&down=4&yds_to_go_min=21&yds_to_go_max=&yg_gtlt=gt&yards=&is_first_down=-1&field_pos_min_field=opp&field_pos_min=&field_pos_max_field=opp&field_pos_max=&type=PASS&is_turnover=-1&is_scoring=-1&no_play=0&game_day_of_week=&game_location=&game_result=&margin_min=&margin_max=&order_by=game_date";
// $json = array ();
// 		//$url = sprintf($raw_url, $i, $i, 1, 15, "opp", 49, "opp", 1);
// 		$html = file_get_contents($raw_url);
// 		preg_match_all('/<td align="center"\s*>[0-9]+:[0-9]+<\/td>\s*<td align="center"\s*>4<\/td>\s*<td align="center"\s*>[0-9]+<\/td>\s*<td align="left"\s*>[A-Z][A-Z][A-Z] [0-9]+<\/td>\s*<td align=""\s*>[0-9]+-[0-9]+<\/td>\s*<td align=""\s*class=" wrap">.*<\/td>\s*<td align="center"\s*>([0-9]*)<\/td>/', $html, $matches);
// 		if($matches) {
// 			foreach($matches[1] as $m) {
// 				$json[] = (int) $m;
// 			}
// 		}


// die(json_encode($json));
//
//
$raw_url = "http://www.pro-football-reference.com/play-index/play_finder.cgi?request=1&match=summary_all&year_min=%s&year_max=%s&team_id=&opp_id=&game_type=R&playoff_round=&game_num_min=%s&game_num_max=%s&week_num_min=0&week_num_max=99&quarter=1&quarter=2&quarter=3&quarter=4&quarter=5&tr_gtlt=lt&minutes=15&seconds=00&down=3&down=4&yds_to_go_min=%s&yds_to_go_max=%s&yg_gtlt=gt&yards=&is_first_down=-1&field_pos_min_field=team&field_pos_min=&field_pos_max_field=team&field_pos_max=&type=PASS&type=RUSH&is_turnover=-1&is_scoring=-1&no_play=0&game_day_of_week=&game_location=&game_result=&margin_min=&margin_max=&order_by=game_date";
$json = array ();
for($togo = 1; $togo <= 20; $togo++) {
	echo "Togo: $togo".PHP_EOL;
	if(!isset($json[$togo])) $json[$togo] = array ();
	for($i = 2003; $i <=2013; $i++) {
		$min = 1;
		$max = 5;
		echo $i.PHP_EOL;

		while($max < 16) {
			echo "$min - $max".PHP_EOL;
			$url = sprintf($raw_url, $i, $i, $min, $max, $togo, $togo);
			$html = file_get_contents($url);
			preg_match_all('/<td align="center"\s*>[0-9]+:[0-9]+<\/td>\s*<td align="center"\s*>[0-9]<\/td>\s*<td align="center"\s*>[0-9]+<\/td>\s*<td align="left"\s*>[A-Z][A-Z][A-Z] [0-9]+<\/td>\s*<td align=""\s*>[0-9]+-[0-9]+<\/td>\s*<td align=""\s*class=" wrap">.*<\/td>\s*<td align="center"\s*>(-?[0-9]*)<\/td>/', $html, $matches);
			if($matches) {
				foreach($matches[1] as $m) {
					$json[$togo][] = (int) $m;
				}
			}
			$min += 5;
			$max += 5;

		}
	}
}
die(json_encode($json));
