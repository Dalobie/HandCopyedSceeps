var roleFeeder2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var target = Game.getObjectById('608b04c5218537ffa84aeea9');
        
        var container2 = Game.getObjectById('60851c59d4d94462fc69c451');
        /**
        var container2 = Game.getObjectById('608061833769c56803457f34');
        
        if(container2.store[RESOURCE_ENERGY] > 0 ) {
            var withdrawfrom = container2;
        }
        else if(container1.store[RESOURCE_ENERGY] > (container1.store.getCapacity(RESOURCE_ENERGY)/2)) {
            var withdrawfrom = container1;
        }
        else {
            var withdrawfrom = container2;
        }
        **/
        if(creep.memory.feeding && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.feeding = false;
            creep.say('🔌 Harvesting   ');
	    }
	    
	    if(!creep.memory.feeding && creep.store.getFreeCapacity() == 0) {
	        creep.memory.feeding = true;
	        creep.say('🍴  Feeding');
	    }
	    
	    
	    
	    if(creep.memory.feeding) {
			
            if(target) {
                
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(38,28, {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
	    }
	    else {
            if(creep.withdraw(container2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(38,28, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleFeeder2;
