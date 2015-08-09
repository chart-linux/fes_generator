(function(){
    var state = {
        "background":{
            "img":null
        },
        "left":{
            "img":null,
            "cx":295,
            "cy":150,
            "hx":150,
            "hy":150
        },
        "right":{
            "img":null,
            "cx":505,
            "cy":150,
            "hx":150,
            "hy":150
        },
        "left_name":{
            "text":"emacs",
            "cx":309,
            "cy":130,
            "size":30
        },
        "right_name":{
            "text":"vim",
            "cx":550,
            "cy":130,
            "size":30
        },
        "title":{
            "text":"エディタ",
            "cx":232,
            "cy":433,
            "size":18
        }
    };
    
    function render(){
        var canvas = document.getElementById('result');
        var ctx = canvas.getContext('2d');

        ctx.drawImage(state.background.img,0,0,960,540);
        renderEitherImage(ctx,"left");
        renderEitherImage(ctx,"right");
        renderText(ctx,"left_name");
        renderText(ctx,"right_name");
        renderText(ctx,"title");
    }

    function renderEitherImage(ctx,either){
        var img = state[either].img;
        var s = state[either];
        ctx.drawImage(img,s.cx,s.cy,s.hx,s.hy);
    }

    function renderText(ctx,kind){
       ctx.font = "normal " + state[kind].size + "pt paintball,ikamodoki"; 
       ctx.fillStyle = "#D8D8D8";
       ctx.fillText(state[kind].text,state[kind].cx,state[kind].cy);
    }

    function handleEitherImage(either){
        return function(evt){
            var file = evt.target.files[0];

            if(!file.type.match("image.*")){
                return false;
            }

            var reader = new FileReader();
            reader.onload = (function(e){
                var img = new Image();
                img.src = e.target.result;
                state[either].img = img;
                render();
            });
            reader.readAsDataURL(file);
        };
    }

    function handleCoordinate(kind,coord){
        return function(evt){
            state[kind]["c" + coord] = evt.target.value;
            render();
        };
    }

    function handleSize(kind){
        return function(evt){
            state[kind].size = evt.target.value;
            render();
        };
    }

    function handleText(kind){
        return function(evt){
            state[kind].text = evt.target.value;
            render();
        };
    }

    function downloadCanvas(evt){
        evt.target.href = document.getElementById("result").toDataURL('image/png');
        evt.target.download = "splatoon_fes.png"
    }

    function tweetCanvas(evt){
        
    }

    function init(){
        state.background.img = new Image();
        state.background.img.src = "static/img/splatoon_fes.jpg";
        
        state.left.img = new Image();
        state.left.img.src = "static/img/emacs.png";
        
        state.right.img = new Image();
        state.right.img.src = "static/img/vim.png";
        
        var Loader = function(expectedCount, callback){
            var counter = 0;
            return function(){
                counter++;
                if(counter >= expectedCount){
                    callback();
                }
            };
        };
        
        var loader = Loader(2,render);
        state.background.img.onload = loader;
        state.left.img.onload = loader;
        state.right.img.onload = loader;
        
        document.getElementById('title-x').value = state.title.cx;
        document.getElementById('title-y').value = state.title.cy;
        document.getElementById('left-x').value = state.left.cx;
        document.getElementById('left-y').value = state.left.cy;
        document.getElementById('right-x').value = state.right.cx;
        document.getElementById('right-y').value = state.right.cy;
        
        document.getElementById('title').placeholder = state.title.text;
        document.getElementById('left-name').placeholder = state.left_name.text;
        document.getElementById('right-name').placeholder = state.right_name.text;
        
        document.getElementById('left-name-x').value = state.left_name.cx;
        document.getElementById('left-name-y').value = state.left_name.cy;
        document.getElementById('right-name-x').value = state.right_name.cx;
        document.getElementById('right-name-y').value = state.right_name.cy;
        
        document.getElementById('title-font-size').value = state.title.size;
        document.getElementById('left-font-size').value = state.left_name.size;
        document.getElementById('right-font-size').value = state.right_name.size;

        document.getElementById("left-file").addEventListener('change',handleEitherImage("left"),false);
        document.getElementById("right-file").addEventListener('change',handleEitherImage("right"),false);    
        document.getElementById("left-x").addEventListener('change' ,handleCoordinate("left","x") ,false);
        document.getElementById("left-y").addEventListener('change' ,handleCoordinate("left","y") ,false);
        document.getElementById("right-x").addEventListener('change',handleCoordinate("right","x"),false);
        document.getElementById("right-y").addEventListener('change',handleCoordinate("right","y"),false);

        document.getElementById("left-name").addEventListener('change',handleText("left_name"),false);
        document.getElementById("right-name").addEventListener('change',handleText("right_name"),false);
        document.getElementById("title").addEventListener('change',handleText("title"),false);

        document.getElementById("left-name-x").addEventListener('change' ,handleCoordinate("left_name","x") ,false);
        document.getElementById("left-name-y").addEventListener('change' ,handleCoordinate("left_name","y") ,false);
        document.getElementById("right-name-x").addEventListener('change',handleCoordinate("right_name","x"),false);
        document.getElementById("right-name-y").addEventListener('change',handleCoordinate("right_name","y"),false);
        document.getElementById("title-x").addEventListener('change',handleCoordinate("title","x"),false);
        document.getElementById("title-y").addEventListener('change',handleCoordinate("title","y"),false);

        
        document.getElementById("title-font-size").addEventListener('change',handleSize("title"),false);
        document.getElementById("left-font-size").addEventListener('change',handleSize("left_name"),false);
        document.getElementById("right-font-size").addEventListener('change',handleSize("right_name"),false);

        document.getElementById("save-button").addEventListener('click',downloadCanvas,false);
        document.getElementById("tweet-button").addEventListener('click',tweetCanvas,false);
    }
    
    
    onload = function(){
        init();
    }
    
})()
