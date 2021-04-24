var roleFighter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.fighting) {
            creep.memory.fighting = true;
            creep.say('💂 Waiting   ');
	    }
	    if(creep.memory.fighting) {
	        creep.memory.fighting = false;
	        
	    }
        
        if(creep.memory.fighting) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say('🔪'+'  Fighting  ');
                }
            }
        }
        if(!creep.memory.fighting) {
        creep.moveTo(new RoomPosition(2, 22, 'W4N3'));
        }
    }
};

module.exports = roleFighter;