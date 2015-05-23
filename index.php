<?php
include('eXist.php');
 header("Access-Control-Allow-Origin: *");

function makeMusic($filename) {
	echo system('musicxml2ly '.$filename.'.xml -o music/'.$filename.'.ly', $data);
	echo system('lilypond music/'.$filename.'.ly');
	return '<a href="'.substr($filename,0,-4).'.pdf">Download</a>';
}


function query($query) {
try
  {
        $db = new eXist();

        # Connect
        $db->connect() or die ($db->getError());

	# Query
	$result = $db->xquery($query) or die ($db->getError());

	print htmlspecialchars( $query );

	while($result["HITS"] != 0 && sizeof($result["XML"]) < 1) {
		print "waiting";	
	}
	$str="";
	if ( !empty($result["XML"]) )
		foreach ( $result["XML"] as $xml)
			$str = $str . $xml;

	return $str;
  }
catch (Exception $e) 
  {
	die($e);
  }
}

function filter($title, $componist) {
	$query = 'xquery version "3.0";

	declare variable $music := collection("/db/music");

	for $part in $music
	return
		if (fn:contains($part//movement-title, "'.$title.'") and fn:contains($part//creator[@type="composer"], "'.$componist.'")) then
	    <score>
		<file> {fn:base-uri($part)} </file>
		<title> {data($part//movement-title)} </title>
		<composer> {data($part//identification/creator[@type="composer"])} </composer>
		<instuments>{
		    for $instr in $part//score-instrument/instrument-name
		    return <instrument> {data($instr)} </instrument>
		}</instuments>
	    </score>
	else()';
	return query($query);

}

function getScore($filename, $instrument) {
	$query = 'xquery version "3.0";

	declare variable $doc := doc("'.$filename.'");
	declare variable $part := $doc//part[@id=data($doc//score-part[score-instrument/instrument-name="'.$instrument.'"]/@id)];
	    <score-partwise>
		{$doc//work}
		{$doc//identification}
		{$doc//defaults}
		<part-list>{$doc//part-list/score-part[score-instrument/instrument-name="'.$instrument.'"]}</part-list>
		{$part}
	    </score-partwise>';
	$res = query($query);
	$write = file_put_contents('temp.xml', $res);
	return makeMusic('temp.xml');
}

if(isset($_GET['method']) && $_GET['method'] =='getScore' && isset($_GET['file']) && isset($_GET['instrument'])) {
	print getScore($_GET['file'], $_GET['instrument']);
}
if(isset($_GET['method']) && $_GET['method']=='all') {
	print filter("", "");
}
if(isset($_GET['method']) && $_GET['method']=='filter') {
	$title= '';
	$componist = '';
	if(isset($_GET['title']) ) {
		$title = $_GET['title'];
	}
	if(isset($_GET['componist'] )) {
		$componist = $_GET['componist'];
	}	
	print filter($title, $componist);
}


?>

