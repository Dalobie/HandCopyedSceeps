var roleMiner1= require('role.miner1');
var roleMiner2= require('role.miner2');

var roleCarrier= require('role.carrier');
var roleCarrier1= require('role.carrier1');
var roleCarrier2= require('role.carrier2');

var roleBuilder = require('role.builder');

var roleHarvester = require('role.harvester');

var roleUpgrader = require('role.upgrader');

var roleFixit = require('role.fixit');

var roleFeeder = require('role.feeder');

var roleFighter = require('role.fighter');

var roleGunner1 = require('role.gunner1');
var roleGunner2 = require('role.gunner2');
var roleGunner3 = require('role.gunner3');
var roleGunner4 = require('role.gunner4');
// why no work? V
// var roleTower = require('role.tower')



module.exports.loop = function () {
    
    let maxEnergyCapacity = Game.rooms.W22S58.energyCapacityAvailable;
    let availableEnergy = Game.rooms.W22S58.energyAvailable;
    
    
    
// roleTower.run(towers);

    // tower
    var towers = Game.getObjectById('60820889f2a9709f4b92d1d5');
    if(towers) {
        //Heal
		
		var healCreep = towers.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (myCreeps) => {
            return myCreeps.hits < myCreeps.hitsMax;
            }
        });
        if(healCreep) {
            towers.heal(healCreep);
        }
        
        var closestHostile = towers.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			towers.attack(closestHostile);
		}
        // Find Valid Structure
        var validtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_CONTAINER ||
				structure.structureType == STRUCTURE_ROAD ) && 
				structure.hits < 5000 ;
			}
		});
		// Nothing to do
        
        var subtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
			    return (structure.structureType == STRUCTURE_CONTAINER ) && 
			    structure.hits < 250000 ;
			}
        });
        var subsubtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
			    return (structure.structureType == STRUCTURE_WALL ) && 
			    structure.hits < 2500000 ;
			}
        });
        var subsubsubtarget = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
			    return (structure.structureType == STRUCTURE_WALL ) && 
			    structure.hits < 3000000 ;
			}
        });
        
        
        if(validtarget && !closestHostile) {
			towers.repair(validtarget);
		}
        if(!validtarget && subtarget && !closestHostile) {
			towers.repair(subtarget);
        }
        if(!validtarget && !subtarget && subsubtarget && !closestHostile) {
			towers.repair(subsubtarget);
        }
		if(!validtarget && !subtarget && !subsubtarget && subsubsubtarget && !closestHostile) {
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
        var newName = 'miner1';
        console.log('Spawn New Miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'miner1'}});
    }
    // Spawn Miner2
    var miner2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');
    if(miner2.length < 1 && availableEnergy >= 550 ) {
        var newName = 'miner2';
        console.log('Spawn New Miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'miner2'}});
    }
    
    // Spawn Saveur
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvester.length < 1 && miner1.length < 1 && availableEnergy >= 300 ) {
        var newName = 'harvester';
        console.log('Spawn New harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    /**
    // Spawn Carrier
    var carrier = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    if(carrier.length < 1 && miner1.length > 0 && availableEnergy >= 500 ) {
        var newName = 'Carrier' + Game.time;
        console.log('Spawn New Carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'carrier'}});
    }
    **/
    // Spawn Carrier1
    var carrier1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier1');
    if(carrier1.length < 3 && miner1.length > 0 && availableEnergy >= 500 ) {
        var newName = 'Carrier1-' + Game.time;
        console.log('Spawn New Carrier1: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'carrier1'}});
    }
    // Spawn Carrier2
    var carrier2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier2');
    if(carrier2.length < 1 && miner2.length > 0 && availableEnergy >= 500 ) {
        var newName = 'Carrier2-' + Game.time;
        console.log('Spawn New Carrier2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'carrier2'}});
    }
    
    // Spawn Upgrader
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 3 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 550) {
        var newName = 'Upgrader' + Game.time;
        console.log('Need new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    
    // Spawn Feeder
    var feeder = _.filter(Game.creeps, (creep) => creep.memory.role == 'feeder');
    if(feeder.length < 1 && carrier2.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 550) {
        var newName = 'feeder' + Game.time;
        console.log('Need new feeder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'feeder'}});
    }
    
    // Spawn Builder small
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < 1 && carrier2.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 550) {
        var newName = 'Builder' + Game.time;
        console.log('Need new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
    
    // Spawn Gunner1
    var gunner1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'gunner1');
    if(gunner1.length < 1 && carrier2.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 1300 ) {
        var newName = 'Gunner1' + Game.time;
        console.log('Spawn New Gunner1: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'gunner1'}});
    }
    // Spawn Gunner2
    var gunner2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'gunner2');
    if(gunner2.length < 1 && carrier2.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 1300 ) {
        var newName = 'Gunner2' + Game.time;
        console.log('Spawn New Gunner2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'gunner2'}});
    }
    // Spawn Gunner3
    var gunner3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'gunner3');
    if(gunner3.length < 1 && carrier2.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 1300 ) {
        var newName = 'Gunner3' + Game.time;
        console.log('Spawn New Gunner3: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'gunner3'}});
    }
    // Spawn Gunner4
    var gunner4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'gunner4');
    if(gunner4.length < 1 && carrier2.length > 0 && miner2.length > 0 && miner1.length > 0 && availableEnergy >= 1300 ) {
        var newName = 'Gunner4' + Game.time;
        console.log('Spawn New Gunner4: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'gunner4'}});
    }
    
    /**
     * 1300
    BODYPART_COST: {
        "move": 50,
        "work": 100,
        "attack": 80,
        "carry": 50,
        "heal": 250,
        "ranged_attack": 150,
        "tough": 10,
        "claim": 600
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
        if(creep.memory.role == 'carrier1') {
            roleCarrier1.run(creep);
        }
        if(creep.memory.role == 'carrier2') {
            roleCarrier2.run(creep);
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
		if(creep.memory.role == 'gunner1') {
			roleGunner1.run(creep);
		}
		if(creep.memory.role == 'gunner2') {
			roleGunner2.run(creep);
		}
		if(creep.memory.role == 'gunner3') {
			roleGunner3.run(creep);
		}
		if(creep.memory.role == 'gunner4') {
			roleGunner4.run(creep);
		}
    }
}
Game.cpu.generatePixel()
