var roleTower = {

run: function(towers) {
    // tower
    var tower = Game.getObjectById('5bc5d0d2b922a8e');
    if(tower) {
        
        // Find Valid Structure
		
        var validtarget = tower.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_RAMPART ||
					structure.structureType == STRUCTURE_ROAD ) && 
					structure.hits < structure.hitsMax ;
				}
			});
			
            if(validtarget.length > 0) {
                
				if(validtarget) {
					tower.repair(validtarget);
				}
			
			}
			
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if(closestHostile) {
				tower.attack(closestHostile);
			}
    }


}

};

module.exports = roleTower;


/**
			var validtarget = tower.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_RAMPART ||
					structure.structureType == STRUCTURE_ROAD ) && 
					structure.hits < structure.hitsMax ;
				}
			});
			
            if(validtarget.length > 0) {
                
				if(validtarget) {
					tower.repair(validtarget);
				}
			
			}
			
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if(closestHostile) {
				tower.attack(closestHostile);
			}
**/