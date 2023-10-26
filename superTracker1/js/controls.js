function initControls(){
	g_screen=ScreenType.main;
	g_route=new Array();
	g_polyline.setPath(g_route);
	//
	hideControls();
	show("startTrackingControls");
}
function hideControls(){
	hide("startTrackingControls");
	hide("stopTrackingControls");
	hide("publishControls");
	hide("collectionControls");
}

function startTracking(){
	g_screen=ScreenType.tracking;
	// TO DO - actually start tracking
    // startTracking()으로 screen type이 바뀌고
    // onLocationUpdate callback이 실행 되면서 screen type을 확인하기 때문에
    // 1 point missing at the beginning, but it's not gonna be a total disastor

	hideControls();
	show("stopTrackingControls");
}

function viewCollection(){
	g_screen=ScreenType.collection;
	hideControls();
	show("collectionControls");
	
	g_collectionIndex=0;
	showCollectionItem();
	//TO DO - show the first route
}
function moveCollectionLeft(){
	if(g_collectionIndex>0){
		g_collectionIndex--;
	}
	showCollectionItem();
}
function moveCollectionRight(){
	if(g_collectionIndex<g_collection.length-1){
		g_collectionIndex++;
	}
	showCollectionItem();
}
function showCollectionItem(){
	if(g_collection.length==0){
		document.getElementById("routeIndex").innerHTML="Empty";
	}else{
		document.getElementById("routeIndex").innerHTML=(g_collectionIndex+1)+"/"+g_collection.length;
	}
	g_polyline.setPath(g_collection[g_collectionIndex]);
	
	g_map.fitBounds(g_polyline.getBounds())
}

function stopTracking(){
	g_screen=ScreenType.publishing;
	hideControls();
	show("publishControls");
}

function saveTracking(){
	g_collection.push(g_route);
	setCookie("collection",JSON.stringify(g_collection));
	// TO DO save the tracking
	initControls();
}
function deleteTracking(){
	initControls();
}

function hide(elementName){
	document.getElementById(elementName).style.display="none";
}
function show(elementName){
	document.getElementById(elementName).style.display="block";
}
