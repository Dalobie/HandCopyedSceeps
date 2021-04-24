var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleFixit = require('role.fixit');
var roleFeeder = require('role.feeder');
var roleFighter = require('role.fighter');
// var roleTower = require('role.tower')

module.exports.loop = function () {

// roleTower.run(towers);

    // tower
    var towers = Game.getObjectById('5bc5d0d2b922a8e');
    if(towers) {
        
        var closestHostile = towers.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if(closestHostile) {
				towers.attack(closestHostile);
			}
        // Find Valid Structure
		
        var validtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_RAMPART ||
					structure.structureType == STRUCTURE_ROAD ) && 
					structure.hits < 5000 ;
				}
			});
			    // Nothing to do
			    if(!validtarget) {
			        var subtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
				    filter: (structure) => {
				    	return (structure.structureType == STRUCTURE_RAMPART ||
				    	structure.structureType == STRUCTURE_WALL ) && 
				    	structure.hits < 50000 ;
				    }
			        });
			        
			        if(subtarget) {
					towers.repair(subtarget);
			        }
			    }
				if(validtarget) {
					towers.repair(validtarget);
				}
			
			
			
			
    }
    
    // Death Check
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: RIP ', name,);
        }
    }
    
    // Spawn Harvester small
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < 5) {
        var newName = 'Harvester' + Game.time;
        console.log('Need new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    // Spawn Harvester Med
    var medharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'medharvester');
    if(medharvesters.length < 3) {
        var newName = 'Med Harvester' + Game.time;
        console.log('Need new Med harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'medharvester'}});
    }
    
    // Spawn Upgrader small
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Need new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    
    // Spawn Builder small
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Need new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
    // Spawn Fixer small cost 350
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixit');
    if(fixers.length < 2) {
        var newName = 'Fixer' + Game.time;
        console.log('Need new Fixer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'fixit'}});
    }
    
	// Spawn Feeder small cost 350
    var feeders = _.filter(Game.creeps, (creep) => creep.memory.role == 'feeder');
    if(feeders.length < 3) {
        var newName = 'Feeder' + Game.time;
        console.log('Need new Feeder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'feeder'}});
    }
    

	// Spawn Fighter
    var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    if(fighters.length < 2) {
        var newName = 'Fighter' + Game.time;
        console.log('Need new Fighter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'fighter'}});
    }

	
	
    // Spawning Message
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️'+'Constructing ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'medharvester') {
            roleHarvester.run(creep);
        }
		if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'fixit') {
            roleFixit.run(creep);
        }
		if(creep.memory.role == 'feeder') {
			roleFeeder.run(creep);
		}
		if(creep.memory.role == 'fighter') {
			roleFighter.run(creep);
		}
    }
}