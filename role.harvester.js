var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
	    if(creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfering = false;
            creep.say('🔌 Harvesting   ');
	    }
	    if(!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
	        creep.memory.transfering = true;
	        creep.say('🔋 Transfering   ');
	    }
	    
        // Find structure 
        
        if(creep.memory.transfering) {
			var toptargets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_SPAWN ) && 
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
            if(toptargets.length > 0) {
                
                if(creep.transfer(toptargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(toptargets[0], {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
            
            
            if(toptargets.length == 0) {
             // Energy Lvls are Good expand search
	            if(creep.memory.transfering) {
		    	var targets = creep.room.find(FIND_STRUCTURES, {
			    	filter: (structure) => {
			    		return (structure.structureType == STRUCTURE_CONTAINER ||
				    	structure.structureType == STRUCTURE_TOWER) && 
				    	structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				    }
			    });
                if(targets.length > 0) {
               if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#15ff00'}});
                }
            }
            
                if(targets.length == 0) {
            
            if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔌 Harvesting');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgradeing');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var source = Game.getObjectById('a3ea0773646985b');
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
            
            }
	        }
            }
	    }
	    else {
	        var source = Game.getObjectById('a3ea0773646985b');
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                (creep.moveTo(source), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	
	}
};

module.exports = roleHarvester;