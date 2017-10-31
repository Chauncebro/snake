function Snake(){
    this.head = new SnakeBit(boxSize,0);
    this.tail = new SnakeBit(0,0);
    this.dir = 0;
    this.parts = [this.head,this.tail];
    
    this.move = function(){     
         for(var i=this.parts.length-1;i>0;i--){
             this.parts[i] = new SnakeBit(this.parts[i-1].x,this.parts[i-1].y);
         }
     
        this.head.move(this.dir);
        if(this.head.x >= boardSize || this.head.x <0 || this.head.y >= boardSize || this.head.y < 0){
            gameEnd();
        }
        this.collideSelf();
    }
    
    this.draw = function(){    
         for(var i = 0; i<this.parts.length;i++){
             this.parts[i].draw();
         }
    }
    
    this.setDir = function(dir){
        this.dir = dir;
    }
    
    this.collide = function(food){
        if (this.head.x == food.x && this.head.y ==food.y){
            score += 1;
            this.addBit(3)
            food.makeNew();
        }
    }
    
    this.addBit = function(amt){
        for(var i = 0; i< amt; i++){
            this.parts.push(new SnakeBit(this.head.x,this.head.y));
        }
        increaseDifficulty(1);
    }
    
    this.collideSelf = function(){
        for (var i = 1; i<this.parts.length; i++){
            if (this.head.x == this.parts[i].x && this.head.y == this.parts[i].y){
                gameEnd();
            }
        }
    }
}