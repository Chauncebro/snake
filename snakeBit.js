function SnakeBit(x,y){
    this.x = x;
    this.y = y;
    
    this.draw = function(){
        ctx.fillStyle = "#888888";
        ctx.fillRect(this.x,this.y,boxSize,boxSize);
    }
    
    this.move = function(dir){
        switch(dir){
            case 0:
                this.x += boxSize;
                break;
            case 1:
                this.x -= boxSize;
                break;
            case 2:
                this.y -= boxSize;
                break;
            case 3:
                this.y += boxSize;
                break;
        }
    }
    
}