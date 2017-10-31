function Food(){
    this.x = Math.floor(Math.random()*(boardSize/boxSize))*boxSize;
    this.y = Math.floor(Math.random()*(boardSize/boxSize))*boxSize;
    
    this.draw = function(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,boxSize,boxSize);
    }
    
    this.makeNew = function(){
        this.x = Math.floor(Math.random()*(boardSize/boxSize))*boxSize;
        this.y = Math.floor(Math.random()*(boardSize/boxSize))*boxSize;
    }
}