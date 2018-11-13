var object_size = new Array();

function create_window(id, in_x, in_y,in_width, in_height, in_font_size, in_font, in_font_color,in_fill_color, in_title)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var X, Y, width, height;
        var my_size = {
            kind : id,
            flag : 1,
            x : in_x,
            y : in_y,
            color : in_fill_color,
            width : in_width,
            height : in_height
        };
        object_size.push(my_size);

        X = in_x;
        Y = in_y;
        width = in_width;
        height = in_height;
        title = in_title;
        //X = 50;
        //Y = 50;
        //width = 200;
        //height = 250;
        //title = "My_window";
        //#FDD692

        ctx.fillStyle = in_fill_color;
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

		draw_close(ctx,X+width,Y);

		draw_hide(ctx,X+width, Y);

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
		ctx.strokeRect(X+width - 60, Y, 30, 30);

    }
}

function draw_window(ctx, X, Y, width, height, in_fill_color)
{
    ctx.fillStyle = in_fill_color;
    ctx.fillRect (X, Y+30, width, height-30);

    ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.strokeRect(X, Y+30, width, height-30);

}

function create_textbox(id, in_x, in_y, in_width, in_font_size, in_font, in_font_color,in_fill_color, in_content)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
    	var ctx = canvas.getContext("2d");
    	var X, Y, width, height;

        X = in_x;
        Y = in_y;
        width = in_width;
        if(in_font == "")
            var font_style = in_font_size + " sans-serif";
        else
            var font_style = in_font_size + " " + in_font;
        ctx.font = font_style;
        var fontSize = parseFloat(ctx.font);
        height = fontSize * 1.2;
        console.log(height);
        //텍스트 줄바꿈
        var text = "";
        var cur_y = (Y+height/2);
        var temp = cur_y;

        for(var i = 0; i < in_content.length; i++)
        {
            text += in_content[i];
            if(width - 30 < ctx.measureText(text).width)
            {
                cur_y += fontSize * 1.2;
                text = "";
            }
        }
        cur_y += fontSize * 1.2;
        height = cur_y - Y;
        ctx.fillStyle = in_fill_color;
        ctx.fillRect(X, Y, width, height);

        ctx.fillStyle = in_font_color;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.font = font_style;
        var cur_y = temp;
        var text = "";

        for(var i = 0; i < in_content.length; i++)
        {
            text += in_content[i];
            if(width - 50 < ctx.measureText(text).width)
            {
                ctx.fillText(text,(X+10),cur_y);
                cur_y += fontSize * 1.2;
                text = "";
            }
        }
        
        ctx.fillText(text,(X+10),cur_y);

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
		ctx.strokeRect(X, Y, width, height);
		
		draw_close(ctx,X+width,Y);

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
		ctx.strokeRect(X+width - 30, Y, 30, 30);

        var my_size = {
            kind : id,
            x : in_x,
            y : in_y,
            width : in_width,
            height : height
        };

        object_size.push(my_size);

	}
}


//오른쪽 끝이 input값으로 들어가야댕
function draw_close(ctx, x, y)
{
    ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.moveTo(x-7,y+7);
    ctx.lineTo(x-23,y+23);
    ctx.stroke();
 	ctx.moveTo(x-23,y+7);
    ctx.lineTo(x-7,y+23);
    ctx.stroke();
}

function create_label(id, in_x, in_y, in_width, in_height, radius, in_font_size,  in_font, in_font_color,in_fill_color, in_content)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
    	var ctx = canvas.getContext("2d");
    	var X, Y, width, height, radius;

        var my_size = {
            kind : id,
            x : in_x,
            y : in_y,
            width : in_width,
            height : in_height
        };
        object_size.push(my_size);


        X = in_x;
        Y = in_y;
        width = in_width;
        height = in_height;
        content = in_content;

	    ctx.fillStyle = in_fill_color;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(X + radius, Y);
        ctx.lineTo(X + width - radius,Y);
        ctx.arcTo(X + width,Y, X + width, Y+radius, radius);
        ctx.lineTo(X + width, Y + height - radius);
        ctx.arcTo(X + width, Y + height, X + width - radius,Y + height, radius);
        ctx.lineTo(X + radius,Y + height);
        ctx.arcTo(X, Y + height, X,Y + height - radius, radius);
        ctx.lineTo(X, Y + radius);
        ctx.arcTo(X, Y, X + radius,Y, radius);
		//ctx.stroke();        
        ctx.fill();        

        ctx.fillStyle = "rgb(236,115,87)";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(X + radius, Y);
        ctx.lineTo(X + width - radius,Y);
        ctx.arcTo(X + width,Y, X + width, Y+radius, radius);
        ctx.lineTo(X + width, Y + height - radius);
        ctx.arcTo(X + width, Y + height, X + width - radius,Y + height, radius);
        ctx.lineTo(X + radius,Y + height);
        ctx.arcTo(X, Y + height, X,Y + height - radius, radius);
        ctx.lineTo(X, Y + radius);
        ctx.arcTo(X, Y, X + radius,Y, radius);
		ctx.stroke();        
        
        //ctx.fillStyle = "#FDD692";
        //ctx.fillRect (X, Y, width, height);

		//ctx.strokeStyle = "rgb(236,115,87)";
        //ctx.lineWidth = 2;
        //ctx.lineCap = "round";
		//ctx.strokeRect(X, Y, width, height);

		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
        if(in_font == "")
            var font_style = in_font_size + " sans-serif";
        else
            var font_style = in_font_size + " " + in_font;
        
		ctx.font = font_style;
        ctx.fillStyle = in_font_color;
        ctx.fillText(content,(X + width/2),(Y+height/2));
		
		draw_close(ctx,X+width,Y);

		ctx.strokeStyle = "rgb(236,115,87)";
		ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(X + width - 30, Y);
        ctx.lineTo(X + width - radius,Y);
        ctx.arcTo(X + width,Y, X + width, Y+radius, radius);
        ctx.lineTo(X + width, Y + 30);
        ctx.lineTo(X + width- 30,Y + 30);
        ctx.lineTo(X + width - 30, Y);
		ctx.stroke();        
        
	}
}

//input (id, x, y, width, height, font_size, font_style, font_color, rect_color, title, item_font_size, item_font_style, item_font_color, item_rect_color, item1, item2, item3, item4) 하위 메뉴 목록들 크기 고정!

function create_menu(id, in_x, in_y, in_width, in_height, in_fill_color, in_title, initem_fill_color, in_item1, in_item2, in_item3, in_item4)
{
	var canvas = document.getElementById("maincanvas");

    if (canvas.getContext) {
    	var ctx = canvas.getContext("2d");
    	var X, Y, width, height;
        var my_size = {
            kind : id,
            flag : 1,
            in_item1 : in_item1,
            in_item2 : in_item2,
            in_item3 : in_item3,
            in_item4 : in_item4,
            in_itemcolor : initem_fill_color,
            x : in_x,
            y : in_y,
            width : in_width,
            height : in_height
        };
        object_size.push(my_size);

        X = in_x;
        Y = in_y;
        width = in_width;
        height = in_height;
        title = in_title;


        ctx.fillStyle = in_fill_color;
        ctx.fillRect (X, Y, width, height);

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
		ctx.strokeRect(X, Y, width, height);

		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.font = "16px oblique";
        ctx.fillStyle = "#000000";
        ctx.fillText(title,(X + width/2)-(width/8),(Y+height/2));
		
		draw_close(ctx,X+width,Y);

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
		ctx.strokeRect(X+width - 30, Y, 30, 30);

		draw_hide(ctx, X+width, Y)

		ctx.strokeStyle = "rgb(236,115,87)";
        ctx.lineWidth = 2;
		ctx.strokeRect(X+width - 60, Y, 30, 30);


        draw_item(ctx, X, Y, width,height, initem_fill_color,  in_item1, in_item2, in_item3,in_item4);
		
	}
}

function draw_item(ctx, X, Y, width, height, in_itemcolor, in_item1, in_item2, in_item3, in_item4)
{//item1
    ctx.fillStyle = in_itemcolor;
    ctx.fillRect(X, Y+height, width-30, height*3/4)

    ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeRect(X, Y+height, width-30, height*3/4);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = "13px oblique";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(in_item1,(X + width/2)-(width/6),(Y+height+height*3/4/2));
        


    ctx.fillStyle = in_itemcolor;
    ctx.fillRect(X, Y+height + height*3/4, width-30, height*3/4)

    ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeRect(X, Y+height + height*3/4, width-30, height*3/4);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = "13px oblique";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(in_item2,(X + width/2)-(width/6),(Y+height+ height*3/4+height*3/4/2));

    ctx.fillStyle = in_itemcolor;
    ctx.fillRect(X, Y+height + 2* height*3/4, width-30, height*3/4)

    ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeRect(X, Y+height + 2*height*3/4, width-30, height*3/4);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = "13px oblique";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(in_item3,(X + width/2)-(width/6),(Y+height+ 2*height*3/4+height*3/4/2));


    ctx.fillStyle = in_itemcolor;
    ctx.fillRect(X, Y+height + 3* height*3/4, width-30, height*3/4)

    ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeRect(X, Y+height + 3*height*3/4, width-30, height*3/4);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = "13px oblique";
    ctx.fillStyle = "#ffffff";  
    ctx.fillText(in_item4,(X + width/2)-(width/6),(Y+height+ 3*height*3/4+height*3/4/2));
}

//오른쪽 끝이 input값으로 들어가야댕
//x옆에 자동으로 들어가게 만들어보자
function draw_hide(ctx, x, y)
{
	ctx.strokeStyle = "rgb(236,115,87)";
    ctx.lineWidth = 2;
    ctx.moveTo(x-37,y+23);
    ctx.lineTo(x-53,y+23);
    ctx.stroke();
}

function canvasclick(e)
{
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var x = e.offsetX;
    var y = e.offsetY;

    console.log(x,y);

    for(var i = 0; i<object_size.length;i++)
    {
        console.log(object_size[i].x, object_size[i].y, object_size[i].width, object_size[i].height);
        //x좌표 확인
        if((x < (object_size[i].x + object_size[i].width)) & (x > (object_size[i].x + object_size[i].width)-30))
        {
            //y좌표 확인
            if(y < (object_size[i].y + 30) & (y > object_size[i].y))
            {
                switch (object_size[i].kind)
                    {
                        case 1:
                        case 2:
                        case 3:
                        //테두리까지 -2 -2 +4 +4
                            ctx.clearRect(object_size[i].x-1, object_size[i].y-1, object_size[i].width+2, object_size[i].height+2);
                        break;
                        case 4:
                            ctx.clearRect(object_size[i].x-1, object_size[i].y-1, object_size[i].width+2, object_size[i].height+2);
                            ctx.clearRect(object_size[i].x-1, object_size[i].y + object_size[i].height, object_size[i].width-30 + 2, 3 * (object_size[i].height) + 1);
                        break;
                    }
                object_size.splice(i,1);
            }
        }
    }

    //최소화 작동시
    for(var i = 0;(i<object_size.length);i++)
    {
        //x좌표 확인
        if((object_size[i].kind == 1)|(object_size[i].kind == 4))
        {
            if((x < ( object_size[i].x-30 + object_size[i].width)) & (x > (object_size[i].x + object_size[i].width)-60))
            {
                //y좌표 확인
                if(y < (object_size[i].y + 30) & (y > object_size[i].y))
                {
                    switch (object_size[i].kind)
                        {
                            case 1:
                            //테두리까지 -2 -2 +4 +4
                            if(object_size[i].flag == 1)
                            {
                                ctx.clearRect(object_size[i].x-1, object_size[i].y+31, object_size[i].width+2, object_size[i].height-1);
                                object_size[i].flag = 0;
                            }
                            else
                            {
                                draw_window(ctx, object_size[i].x,object_size[i].y,object_size[i].width, object_size[i].height,object_size[i].color);
                                object_size[i].flag = 1;
                            }
                            break;
                            case 4:
                            if(object_size[i].flag == 1)
                            {
                                ctx.clearRect(object_size[i].x-1, object_size[i].y + object_size[i].height + 1, object_size[i].width-30 + 2, 3 * (object_size[i].height));
                                object_size[i].flag = 0;
                            }
                            else
                            {
                                draw_item(ctx, object_size[i].x, object_size[i].y, object_size[i].width, object_size[i].height, object_size[i].in_itemcolor, object_size[i].in_item1, object_size[i].in_item2, object_size[i].in_item3, object_size[i].in_item4);
                                object_size[i].flag = 1;

                            }
                            break;
                        }
                }
            }
        }
    }
}

function initialize()
{

}