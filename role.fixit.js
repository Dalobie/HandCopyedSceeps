var roleFixit = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.fixing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.fixing = false;
            creep.say('🔌 Harvesting');
	    }
	    if(!creep.memory.fixing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.fixing = true;
	        creep.say('🔩 Fixing');
	    }

	    if(creep.memory.fixing) {
	        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits > 5000
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
            // Upgrade if not fixing <<<<<<<<
            
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
            var source = Game.getObjectById('c99f0773646ccaf');
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
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


module.exports = roleFixit;