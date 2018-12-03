var root_list = new Array();
var queue = new Array();
var temp_queue = new Array();
var click_result = "";

function queue_push(array, node){
	array.push(node);

}

function queue_pop(array){
	if(array.length > 0)
		{
			var data = array[0];
			array.splice(0,1);
			return data;
		}
	else
		return false;
}



/*
node = {
	id :
	child : array 
	data

}
*/
function create_root(in_rootid){
	root ={
		root_id : in_rootid,
		child_id : 0,
		child_num : 0,
		child : new Array,
		data : 0,
		X : 0,
		Y : 0,
		width : 0,
		height : 0,
	}
	root_list.push(root);
}

//data는 string, id는 int
function add_node(root_id, in_id, in_data, x, y, width, height){
	node ={
		child_id : in_id,
		//where 0 왼쪽, 1 오른쪽
		where : 0,
		child : new Array,
		data : in_data,
		x : x,
		y : y,
		width : width,
		height : height,
	}
	temp_node ={
		child_id : 0,
		//where 0 왼쪽, 1 오른쪽
		where : 0,
		child : new Array,
		data : "0",
		x : x,
		y : y,
		width : width,
		height : height,
	}

	var root_index;
	for(var j = 0; j<root_list.length ;j++)
	{
		if(root_list[j].root_id == root_id)
		{
			root_index = j;
			break;
		}
	}
	(root_list[root_index].child_num)++;
	if(root_list[root_index].child_id == 0){
		root_list[root_index].child_id = node.child_id;
		root_list[root_index].data = node.data;
		root_list[root_index].x = node.x;
		root_list[root_index].y = node.y;
		root_list[root_index].width = node.width;
		root_list[root_index].height = node.height;
		draw_node(node.child_id, node.x, node.y, node.width, node.height, node.data);
	}
	else {
		queue_push(queue, root_list[root_index]);
		var cur_node;
		while(queue.length != 0){
			cur_node = queue_pop(queue);
			if(cur_node.child.length== 0){
				cur_node.child.push(node);
				draw_node(node.child_id, node.x, node.y, node.width, node.height, node.data);
				break;
			}
			else if(cur_node.child.length == 1){
				temp_node.child_id = cur_node.child[0].child_id;
				temp_node.where = cur_node.child[0].where;
				temp_node.child = cur_node.child[0].child;
				temp_node.data = cur_node.child[0].data;
				temp_node.x = cur_node.child[0].x;
				temp_node.y = cur_node.child[0].y;
				temp_node.width = cur_node.child[0].width;
				temp_node.height = cur_node.child[0].height;
				
				cur_node.child[0] = node;
				temp_node.where = 1;
				cur_node.child.push(temp_node);
				draw_node(node.child_id, node.x, node.y, node.width, node.height, node.data);

				break;
			}
			else{
				for(var i = 0 ; i < cur_node.child.length ; i++){
					queue_push(queue, cur_node.child[i]);
				}
			}
		}
	}
	queue = [];
}

function delete_node(root_id, in_id){
	var root_index;
	for(var j = 0; j<root_list.length ;j++)
	{
		if(root_list[j].root_id == root_id)
		{
			root_index = j;
			break;
		}
	}
	queue_push(queue, root_list[root_index]);
	var cur_node;
	if(root_list[root_index].child_id == in_id){
		root_list[root_index].child_id = 0;
		root_list[root_index].data = 0;
		root_list[root_index].child_num = 0;
		root_list[root_index].child = [];

		root_list[root_index].x = 0;
		root_list[root_index].y = 0;
		root_list[root_index].width = 0;
		root_list[root_index].height = 0;
	}
	else{
		while(queue.length != 0){
			cur_node = queue_pop(queue);
			for(var i = 0 ; i < cur_node.child.length ; i++){
				if(cur_node.child[i].child_id == in_id){
					cur_node.child.splice(i,1)
					break;
				}
				else
					queue_push(queue, cur_node.child[i]);
			}
		}
		root_list[root_index].child_num = num_node(root_list[root_index]);
	}
	queue = [];
}


function num_node(node)
{
	var cur_node;
	var result = 0;
	queue_push(temp_queue, node);
	while(temp_queue.length!= 0){
		cur_node = queue_pop(temp_queue);
		result++;
		for(var i = 0 ; i < cur_node.child.length; i++){
			queue_push(temp_queue, cur_node.child[i]);
		}
	}
	return result;
}

function search_node(root_id, in_data){
	var root_index;
	for(var j = 0; j<root_list.length ;j++)
	{
		if(root_list[j].root_id == root_id)
		{
			root_index = j;
			break;
		}
	}
	queue_push(queue, root_list[root_index]);
	var target_nodes = new Array;
	if(root_list[root_index].data == in_data)
		target_nodes.push(root_list[root_index]);
	var cur_node;
	while(queue.length!= 0){
		cur_node = queue_pop(queue);
		for(var i = 0 ; i < cur_node.child.length; i++){
			if(cur_node.child[i].data == in_data){
				target_nodes.push(cur_node.child[i]);
			}
			queue_push(queue, cur_node.child[i]);
		}
	}
	for(var i = 0 ; i < target_nodes.length; i++){
		console.log(target_nodes[i].child_id);
	}
	queue = [];	
}

/*
ctx.fillStyle = rgb(250,200,200);
ctx.fillRect (X, Y, width, height);

ctx.strokeStyle = "rgb(236,115,87)";
ctx.lineWidth = 2;
ctx.strokeRect(X, Y, width, height);

//ctx.fillStyle = "rgb(255,255,255)";
ctx.textBaseline = 'top';
if(in_font == "")
    var font_style = in_font_size + " sans-serif";
else
    var font_style = in_font_size + " " + in_font;
ctx.font = font_style;
ctx.fillStyle = in_font_color;
ctx.fillText(title,X + 5,Y+5);

ctx.strokeStyle = "rgb(236,115,87)";
ctx.lineWidth = 2;
ctx.strokeRect(X, Y, width, 30);
*/

function show_allnode(in_x, in_y){
	var cur_node;
	var result = "";
	var root_index=-1;
	for(var j = 0; j<root_list.length ;j++){
		if((root_list[j].x < in_x) & (root_list[j].x+root_list[j].width > in_x))
		{
			if((root_list[j].y < in_y) & (root_list[j].y+root_list[j].height > in_y))
			{
				root_index = j;
				break;
			}
		}
	}
	if(root_index == -1)
	{
		console.log("해당 id에 맞는 root가 없습니다.")
		return false;
	}

	queue_push(queue, root_list[root_index]);
	var depth = 1;
	var index = 0;
	while(queue.length != 0){
		cur_node = queue_pop(queue);
		index++;
		var cur_number = Math.pow(2, depth);
		if(cur_number-1 < index)
		{
			console.log(result);
			result = "";
		}
		for(var i = 0 ; i < cur_node.child.length; i++){
			queue_push(queue, cur_node.child[i]);
		}
		if((cur_node.x < in_x) & (cur_node.x+cur_node.width > in_x))
		{
			if((cur_node.y < in_y) & (cur_node.y+cur_node.height > in_y))
			{
				click_result = cur_node.data;
			}
		}
	}
	return true;
}

function delete_root(root_id){
	var root_index;
	for(var j = 0; j<root_list.length ;j++)
		if(root_list[j].root_id == root_id)
		{
			root_index = j;
			break;
		}
	root_list.splice(root_index,1);
}


function draw_node(id, in_x, in_y, in_width, in_height, in_data)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var X, Y, width, height;

        X = in_x;
        Y = in_y;
        width = in_width;
        height = in_height;
        in_data = in_data
        //#FDD692

        ctx.fillStyle = "rgb(255,200,200)";
        ctx.fillRect (X, Y, width, height);

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
		ctx.strokeRect(X, Y, width, height);

        //ctx.fillStyle = "rgb(255,255,255)";
		ctx.textBaseline = 'middle';
        ctx.fillStyle = "#000000";
		ctx.textAlign = 'center'
		ctx.font = "14px sans-serif";
		var string1 = in_data;
        ctx.fillText(string1,X+width/2,Y + height/2);
    }
}

function draw_line(inx, iny, tox, toy)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
 		ctx.beginPath();
 		ctx.moveTo(inx, iny);
 		ctx.lineTo(tox, toy);
 		ctx.closePath();
    }
}


function draw_base(){
	var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    X = 0;
    Y = 0;
    width = 100;
    height = 50;
	ctx.fillStyle = "rgb(225, 200, 200)";
    ctx.fillRect (X, Y, width, height);
	ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
	ctx.strokeRect(X, Y, width, height);
}

function canvasclick(e)
{
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var x = e.offsetX;
    var y = e.offsetY;

    console.log(x,y);

    var ctx = canvas.getContext("2d");
    var X, Y, width, height;

    ctx.clearRect(X,Y, width+4, height+4)

    X = 0;
    Y = 0;
    width = 100;
    height = 50;
    //#FDD692
    if(!show_allnode(x,y)){
    	ctx.clearRect(X,Y, width+4, height+4)
    	draw_base();
    }
	else
    {
    	ctx.fillStyle = "rgb(225, 200, 200)";
        ctx.fillRect (X, Y, width, height);
    
    	ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
    	ctx.strokeRect(X, Y, width, height);
    
        //ctx.fillStyle = "rgb(255,255,255)";
    	ctx.textBaseline = 'middle';
        ctx.fillStyle = "#000000";
    	ctx.textAlign = 'center'
    	ctx.font = "15px sans-serif";
    	var string1 = click_result;
        ctx.fillText(string1,X+width/2,Y + height/2);}
}
