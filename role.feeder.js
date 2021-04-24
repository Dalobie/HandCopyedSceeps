var roleFeeder = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
					return (structure.structureType == STRUCTURE_TOWER ||
					structure.structureType == STRUCTURE_SPAWN ) && 
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
            if(targets.length > 0) {
                
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
	    }
	    
	    /**
	    // Test
	    if(creep.memory.feeding) {
            if(creep.transfer(Game.getObjectById('0bf665c27420c0d')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById('0bf665c27420c0d'));
            }
        }
        
	    // NOT MOVEING?
	    
		if(creep.memory.feeding) {
			var targets = creep.room.find(FIND_STRUCTURES, {
			    filter: (structure) => {
			    	return (structure.structureType == STRUCTURE_TOWER) && 
				    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			    }
			    
			});
			
            if(targets.length > 0) {
               if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
            
	    }
	    **/
	    
	    else {
            var source = Game.getObjectById('c99f0773646ccaf');
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleFeeder;
