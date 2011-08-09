

$(document).ready(function()  {
                
			  
    var score = 00;
    var life = parseFloat($.cookie("life")) ;
    var bonus = 0;
    var attackerSpeed = parseFloat($.cookie("attackerSpeed"));
    var bonusSpeed = parseFloat($.cookie("bonusSpeed"));
    //init();
               
				
    $(".score").html( score );
                
    function firing(){
        firing_list = $('.fire')
        firing_list.each(function(index, element) {
            var x =   parseFloat($(element).css('top').split("px")[0]) - 8;
            $(element).css('top',x+"px");
            if(x <= 0)
            {
                $(element).remove();
            }
        });
    }
  
    function bonuss()
    {
        bonus_list = $(".bonus")
                    
        var plane=$(".plane");
        
        bonus_list.each(function(index, element) {
                         
            var x =   parseFloat($(element).css('top').split("px")[0]) + bonusSpeed;console.log(x);
            $(element).css('top',x+"px");
            var current_obj = $(element);
            var plane_top = parseFloat(plane.css('top').split("px")[0]);
            var plane_left = parseFloat(plane.css('left').split("px")[0]);
                        
            var bonus_top = parseFloat(current_obj.css('top').split("px")[0])+67.0;
            var bonus_left = parseFloat(current_obj.css('left').split("px")[0])+25;
                         
            if ( (plane_top <= bonus_top && bonus_top <=(plane_top + 60 )) &&  (plane_left <= bonus_left && bonus_left <=( plane_left + 50 )  ))
            {
                $(current_obj).remove();
                life += 1;
                $(".score").html( score );

            }

            if(x > 500)
            {
                $(current_obj).remove();
            }
        });
               
    }
    function AI(){ 
                    
        firing_list = $('.fire')
        ai_list = $('.attackers');
        ai_list.each(function(index, element) {
                       
            var y =   parseFloat($(element).css('top').split("px")[0]) + attackerSpeed;
                    
                     
            $(element).css('top',y+"px");
            var current_obj = $(element);
                    
                       
            firing_list = $('.fire')
            firing_list.each(function(index, element) {
                var top_fire = parseFloat($(element).css('top').split("px")[0]);
                var left_fire = parseFloat($(element).css('left').split("px")[0]);
                           
                var top_obj = parseFloat(current_obj.css('top').split("px")[0]);
                var left_obj = parseFloat(current_obj.css('left').split("px")[0]);
                if( (top_obj<= top_fire &&  top_fire <= ( top_obj + 15) ) && ( left_obj <= left_fire &&  left_fire <= ( left_obj + 15) ) )
                {
                    //fire and collosion detection function
                    score += 10;
                    bonus += 10;
                    $(".score").html( score );
                    current_obj.hide("explode", 180);
                    current_obj.remove();
                    $(element).remove();  
                // init();
    
                }
            });
            if (y > 520.0)    
            {
                life--;                            
                current_obj.remove();
            }
                    
                        
        });
        if(life <0)
        {
            if(confirm("Want to PLay more!!"))
            {
                life = 3;
                score=0;
                bonus=0;
                $('.fire').remove();
                $('.attackers').remove();
                $(".score").html( score );
                $(".bonus").remove();
            //init();
    
            }
            else
                window.location="game.html";
        }
        else
        {
            $(".life").html( life );    
        }
    
    }
    function createfire()
    {
        var plane = $(".plane");
        var x = parseFloat(plane.css('left').split("px")[0]) + 22;
        $('<div class="fire"></div>').css({
            flaot:'left',
            position:'absolute',
                        
            width: '6px',
            height: '10px',
            left: x + "px",
            top:'460px',
            backgroundColor: '#9999ff'
                                                                               
        }).appendTo('#gameGround');
    }
            
    function creat_bonus(){
        //alert("bonus created");
        var left = Math.ceil( Math.random() * 650) + "px"  
                
        $('<div class="bonus"></div>').css({
            flaot:'left',
            position:'absolute',
            left: left,
            top:'2px',
            width: '50px',
            height: '67px'
                                                                               
        }).appendTo('#gameGround');
                
                
    }
    function create_object(){
                    
        var left = Math.ceil( Math.random() * 650) + "px"
        var colr = getRandomColor();
        var size = Math.floor((1 + Math.random() ) * 12)+ "px";
        $('<div class="attackers"></div>').css({
            flaot:'left',
            position:'absolute',
                        
            width: size,
            height: size,
            left: left,
            top:'2px',
            backgroundColor: colr 
        // border: '1px solid black' 
                                                     
                                                    
        }).appendTo('#gameGround');
                
    // alert("object created");
                                                     
    
    }
    function init(){
                    
    // $("#life").val(life);
    // $("#bonusSpeedControl").val(bonusSpeed);
    // $("#speedControl").val(attackerSpeed);
              
                   
    }
    var generate_counter_lifespan = 0; 
    var max_number_object = 8; 
    function render_loop(){
                    
        /*
                     *Create AI Object 
                     */
        if(generate_counter_lifespan <= 0)
        {
            generate_counter_lifespan = 20; 
            if ($('.attackers').length < max_number_object) 
                create_object();
            if( bonus == 150 )  
            {
                bonus=0;
                creat_bonus();
                                   
            }
                     
        } 
        else
        {
            generate_counter_lifespan--;
                          
        }
                        
                  
        /*
                     *AI behaviour 
                     */  
                
        AI();
        /*
                     *Firing behaviour 
                     */  
                    
        firing();
        bonuss();
                
                 
    }
    function getRandomColor() {
        var luminosity = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        return("rgb(" + luminosity + "," + luminosity + "," + blue + ")");
    }
            
           
            
    setInterval(render_loop, 75);
    var direction ={
        left:'37',
        right:'39',
        spacbar:'32'
    }

    // var interval = setInterval(create_object, 3500);
    $(document).keydown(function(event) {
                   
        var plane = $(".plane");
        var x = parseFloat(plane.css('left').split("px")[0]);
        if (event.keyCode == direction.left) {
            //left arrow key
            if(x >= -5)
            {   
                x-=10;
                plane.css("left", ""+x+"px");
                        
            }
        }    
        if(event.keyCode == direction.right) {
            if(x <= 650)
            {
                x+=10;
                plane.css("left", ""+x+"px");
                        
            }
        }  
        if(event.keyCode == direction.spacbar)
        {
                            
            createfire();
            event.preventDefault();
        }
    // event.preventDefault();      
    });
});  
//  $('.plane').draggable();
function clearDefault(el) {
    if (el.defaultValue==el.value) el.value = ""
}