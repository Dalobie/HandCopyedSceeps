var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var container2 = Game.getObjectById('60851c59d4d94462fc69c451');
        // set the 2 container vars
        var buildsight = Game.getObjectById('6084810cf8671626737e8bc2');
        
        var donow = Game.getObjectById('608470c1f343dc4b6667a757');
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔌 harvest');
	    }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
	    }
        
        if(!creep.memory.building) {
            if(creep.withdraw(container2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container2, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
        
        if(creep.memory.building) {
            
            
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#9e9b00',opacity: 1}});
            }
            
            // upgrade if nothing to do
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
                       creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#9e9b00',opacity: 1}});
                    }
                }
                else {
                    var source = Game.getObjectById('608498ad80b5ea310857f370');
                    if(creep.harvest(container2) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container2, {visualizePathStyle: {stroke: '#ffaa00',opacity: 1}});
                    }
                }
            }
        }
	}
};
module.exports = roleBuilder;
