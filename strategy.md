#Ideology
RoomObject is the center of information exchange.
1) Collect all room creeps and all room structures
(controller, sites, sources).
2) Map all creeps to know their intents.
(Register I harvest & I carry resource to).
3) Map all structures, register their requirements
(Taking into account results of creeps diagnostics)
register them as sources for carrying and mining.
4) Map all structures for specific actions.
5) Run all creeps for specific actions.

Structures may be aggregated by type.

Unit types:
Miner - priority on work, minimal carry, minimal move
Carrier - move & carry. 1 to 2.
Builder, Repairer - balanced.

Unit types are defined in constants,
but real bodies are defined in room controllers,
to control priorities.  
