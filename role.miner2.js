var roleMiner2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById('5bbcabba9099fc012e6342c5');
        creep.moveTo(Game.flags.FlagMiner2)
        
        if(creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfering = false;
            creep.say('🔌 Harvesting   ');
        }
        if(!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🔋 Transfering   ');
        }
        
        if(!creep.memory.transfering) {
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            (creep.moveTo(Game.flags.FlagMiner2), {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        }
    }
};

module.exports = roleMiner2;
