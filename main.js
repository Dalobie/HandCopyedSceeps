var roleMiner1= require('role.miner1');
var roleMiner2= require('role.miner2');
var roleCarrier= require('role.carrier');
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleFixit = require('role.fixit');
var roleFeeder = require('role.feeder');
var roleFighter = require('role.fighter');
// var roleTower = require('role.tower')



module.exports.loop = function () {
    
    var maxEnergyCapacity = Game.rooms.W22S58.energyCapacityAvailable;
    var availableEnergy = Game.rooms.W22S58.energyAvailable;
    
    
    
// roleTower.run(towers);

    // tower
    var towers = Game.getObjectById('60820889f2a9709f4b92d1d5');
    if(towers) {
        var closestHostile = towers.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			towers.attack(closestHostile);
		}
        // Find Valid Structure
        var validtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_CONTAINER ||
				structure.structureType == STRUCTURE_ROAD ) && 
				structure.hits < 50 ;
			}
		});
		// Nothing to do
        
        var subtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
			    return (structure.structureType == STRUCTURE_WALL ) && 
			    structure.hits < 400000 ;
			}
        });
        var subsubtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
			    return (structure.structureType == STRUCTURE_WALL ) && 
			    structure.hits < 600000 ;
			}
        });
        var subsubsubtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
			    return (structure.structureType == STRUCTURE_WALL ) && 
			    structure.hits < 800000 ;
			}
        });
        
        
        if(validtarget) {
			towers.repair(validtarget);
		}
        if(!validtarget && subtarget) {
			towers.repair(subtarget);
        }
        if(!validtarget && !subtarget && subsubtarget) {
			towers.repair(subsubtarget);
        }
		if(!validtarget && !subtarget && !subsubtarget && subsubsubtarget) {
			towers.repair(subsubsubtarget);
        }
			
    }
    
    // Death Check
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: RIP ', name,);
        }
    }
    
    
    // Spawn Miner1
    var miner1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner1');
    if(miner1.length < 1 && availableEnergy >= 550 ) {
        var newName = 'Miner1' + Game.time;
        console.log('Spawn New Miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'miner1'}});
    }
    // Spawn Miner2
    var miner2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');
    if(miner2.length < 1 && availableEnergy >= 550 ) {
        var newName = 'Miner2' + Game.time;
        console.log('Spawn New Miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'miner2'}});
    }
    
    // Spawn Carrier
    var carrier = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    if(carrier.length < 2 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 500 ) {
        var newName = 'Carrier' + Game.time;
        console.log('Spawn New Carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'carrier'}});
    }
    
    // Spawn Upgrader
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 3 && carrier.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 500) {
        var newName = 'Upgrader' + Game.time;
        console.log('Need new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    
    // Spawn Feeder
    var feeder = _.filter(Game.creeps, (creep) => creep.memory.role == 'feeder');
    if(feeder.length < 1 && carrier.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 300) {
        var newName = 'feeder' + Game.time;
        console.log('Need new feeder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'feeder'}});
    }
    
    
    /**
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
**/
	
	
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
        if(creep.memory.role == 'miner1') {
            roleMiner1.run(creep);
        }
        if(creep.memory.role == 'miner2') {
            roleMiner2.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
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
