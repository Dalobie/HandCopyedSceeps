var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var subtarget = Game.getObjectById('60820889f2a9709f4b92d1d5');
        
        var container1 = Game.getObjectById('6080f91c84b96934256bf6fd');
        var container2 = Game.getObjectById('608061833769c56803457f34');
        
        if(container2.store[RESOURCE_ENERGY] > (container2.store.getCapacity(RESOURCE_ENERGY)/2)) {
            var withdrawfrom = container2;
        }
        else if(container1.store[RESOURCE_ENERGY] > (container1.store.getCapacity(RESOURCE_ENERGY)/2)) {
            var withdrawfrom = container1;
        }
        else {
            var withdrawfrom = container1;
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
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_SPAWN ) && 
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
            });
            
            if(targets.length > 0) {
               if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
            
            
            
            if(!targets.length > 0) {
               if(creep.transfer(subtarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(subtarget, {visualizePathStyle: {stroke: '#15ff00'}});
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

module.exports = roleCarrier;
