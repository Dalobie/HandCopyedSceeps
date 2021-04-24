var roleFeeder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var target = Game.getObjectById('60820889f2a9709f4b92d1d5');
        
        var container1 = Game.getObjectById('6080f91c84b96934256bf6fd');
        var container2 = Game.getObjectById('608061833769c56803457f34');
        
        if(container2.store[RESOURCE_ENERGY] > (container2.store.getCapacity(RESOURCE_ENERGY)/2)) {
            var withdrawfrom = container2;
        }
        else if(container1.store[RESOURCE_ENERGY] > (container1.store.getCapacity(RESOURCE_ENERGY)/2)) {
            var withdrawfrom = container1;
        }
        else {
            var withdrawfrom = container2;
        }
        
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
                
                if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0], {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
	    }
	    else {
            if(creep.withdraw(withdrawfrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(withdrawfrom, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleFeeder;
