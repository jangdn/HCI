
var root_list = new Array();
var queue = new Array();
var temp_queue = new Array();

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
function create_root(in_rootid, X, Y){
	root ={
		root_id : in_rootid,
		child_id : 0,
		child_num : 0,
		child : new Array,
		data : 0,
		X : X,
		Y : Y,
	}
	root_list.push(root);
}

//data는 string, id는 int
function add_node(root_id, in_id, in_data){
	node ={
		child_id : in_id,
		//where 0 왼쪽, 1 오른쪽
		where : 0,
		child : new Array,
		data : in_data,
	}
	temp_node ={
		child_id : 0,
		//where 0 왼쪽, 1 오른쪽
		where : 0,
		child : new Array,
		data : "0",
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
	}
	else {
		queue_push(queue, root_list[root_index]);
		var cur_node;
		while(queue.length != 0){
			cur_node = queue_pop(queue);
			if(cur_node.child.length== 0){
				cur_node.child.push(node);
				break;
			}
			else if(cur_node.child.length == 1){
				temp_node.child_id = cur_node.child[0].child_id;
				temp_node.where = cur_node.child[0].where;
				temp_node.child = cur_node.child[0].child;
				temp_node.data = cur_node.child[0].data;
				
				cur_node.child[0] = node;
				temp_node.where = 1;
				cur_node.child.push(temp_node);

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
function show_allnode(root_id){
	var cur_node;
    var X, Y, width, height;
    X = 10; Y = 10;
    width = 50;
    height = 50;
	var result = "";
	var root_index=-1;
	for(var j = 0; j<root_list.length ;j++){
		if(root_list[j].root_id == root_id)
		{
			root_index = j;
			break;
		}
	}
	if(root_index == -1)
	{
		console.log("해당 id에 맞는 root가 없습니다.")
		return ;
	}
	X = root_list[root_index].X;
	Y = root_list[root_index].Y;

	draw_node(1, X, Y, width, height, root_list[root_index].child_id, root_list[root_index].data);
	queue_push(queue, root_list[root_index]);
	var index = 0;
	var depth = 1;
	while(queue.length != 0){
		cur_node = queue_pop(queue);
		index++;
		var cur_number = Math.pow(2, depth);
		var before_number = Math.pow(2, depth-1);
		if(cur_number-1 < index)
		{
			depth++;
			console.log(result);
			result = "";
			Y += 60;
			X = root_list[root_index].X + (width)/2 -5 - 50*(cur_number - before_number) - 10* (cur_number - before_number -1);
		}
		draw_node(1, X, Y, width, height, cur_node.child_id, cur_node.data);
		X += 60;
		for(var i = 0 ; i < cur_node.child.length; i++){
			queue_push(queue, cur_node.child[i]);
		}

		result += "id:";
		result += cur_node.child_id.toString();
		result += " "
		result += "data:";
		result += cur_node.data;
		result += " / ";
	}
	console.log(result);
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


function draw_node(id, in_x, in_y,in_width, in_height, in_id, in_title)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var X, Y, width, height;

        X = in_x;
        Y = in_y;
        width = in_width;
        height = in_height;
        in_id = in_id
        title = in_title;
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
		ctx.font = "10px sans-serif";
		var string1 = in_id.toString() + " " +  title;
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
