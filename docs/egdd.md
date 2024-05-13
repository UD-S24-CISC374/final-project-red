# Bash the Dungeon

## Elevator Pitch
*Bash the Dungeon is a top-down adventure game where players, explore a dungeon, encountering NPCs and enemies as they learn Bash commands and grow their collection of spells*

## Influences (Brief)

- *Enter the Gungeon*:
  - Medium: *Game*
  - Explanation: *We were inspired by Enter the Gungeon’s 2D game where players explore a map and interact with chests, enemies, and NPCs as they navigate through the dungeon.*
- *Influence #2*: Legend of Zelda
  - Medium: *Game*
  - Explanation: *Legend of Zelda's dungeon-like style of traversing rooms with a sword and shield, fighting enemies and clearing levels. Boss battles involved*
- *Influence #3*: Binding of Issac
  - Medium: *Game*
  - Explanation: *We were inspired by the 2D top-down movement and fighting style of this game, where players explore and fight enemies.*

## Core Gameplay Mechanics (Brief)

*Give a very high-level description of any core gameplay mechanics*

- *Gameplay Mechanic #1* Players can freely move around the world with keyboard arrow/wasd movement. 
- *Gameplay Mechanic #2* Interactions with the world will involve bash commands, this includes doing things such as “CD” into NPC’s in order to interact with them. 
- *Gameplay Mechanic #3* Combat will be turned based and each monster will teach the player how to incorporate bash commands they learned in order to defeat them. Failure to write the proper commands will result in damage taken. 
- *Gameplay Mechanic #4* Levels each teach a specific set of commands as the players navigate and interact with NPC’s and chests to learn more. Each level culminates in a Boss Battle in a battle that encompasses commands they’ve learned so far.
-*Gameplay Mechanic #5* Spells: Players can find and utilize spells to combat enemies. Spells will be cast based on the commands players enter.  




# Learning Aspects

## Learning Domains

*Introductory Bash commands.*

## Target Audiences

*Computer science students beginning to learn about Bash commands*

## Target Contexts

*Informal educational content, casual based game *

## Learning Objectives

*Remember, Learning Objectives are NOT simply topics. They are statements of observable behavior that a learner can do after the learning experience. You cannot observe someone "understanding" or "knowing" something.*

- *Navigate Filesystems*: *By the end of instruction, students will be able to navigate a filesystem using bash commands.*
- *Solve Bash Tasks*: *By the end of instruction, students will solve bash command tasks*
- *Debug Bash Problems*: *By the end of instruction, students will be able to debug bash related problems *

## Prerequisite Knowledge

*What do they need to know prior to trying this game?*

- *A familiarity with the command line interface.*
- *A basic understanding of file system concepts.*

## Assessment Measures

*A pretest and post test will be administered before and after the game is completed*

*Question content consists of asking for the correct Bash commands based on a certain situation*

# What sets this project apart?

- *An exploration style game where players interact with the world through Bash commands*
- *Gameplay is centered around exploring and interacting the world, instead of centered around assessing players. 
- *Combat system involved to add excitement and consequences to the learning process*

# Player Interaction Patterns and Modes

## Player Interaction Pattern

*One-player game. The player interacts with the game via their keyboard - players move using their arrow keys/wasd and type Bash commands by entering text.*

## Player Modes

*Your game has one or more player modes. Describe each discrete mode, considering things like menus too. Generally describe the transitions between modes too.*

- *Single-player: You repeatedly advance through rounds and levels until you reach the end.*


# Gameplay Objectives

- *Defeat each boss*:
    - Description: *Each level will have a boss that the player will have to defeat to move on*
    - Alignment: *Students will have to utilize Bash commands to defeat the boss and counter their attacks*
- *Talk to all NPC’s and learn all moves*:
    - Description: *During the game there will be multiple NPCs to talk to that will teach you about how to clear the level through various means of bash commands. The main goal is to learn all these commands to be able to fight off the enemies.*
    - Alignment: *This will be a starting point for the users by learning about the bash commands and then incorporating them throughout the level effectively making them learn how to utilize bash commands for specific scenarios. *


# Procedures/Actions

*Users can use arrow keys to move around and move near NPCs jects to interact with them. Users will also use their keyboard to type Bash commands during combat and puzzles.*

# Rules

Player must complete each room before arriving at the boss
Player must beat the boss to get to next level
Players must stay above 0 HP to continue the game, reaching 0 ends the game
Taking damage from failing a bash command reduces health

# Objects/Entities
Wizard sprite
Boss sprites
Text input window 
NPC sprites
Popup dialogue from NPCs
Health Bar
Spells that fly across the screen

## Core Gameplay Mechanics (Detailed)

- *Movement*: Players while not in combat will be able to traverse rooms using the WASD and arrow keys in a free roam style. While in combat there will not be any movement. 
- *Interaction*: As they move, players will be able to interact with the world by clicking on NPCs and objects. When clicking on NPCs, dialogue will appear as the NPCs explain new commands. Players will be able to also interact with game objects such as chests, which they can treat similarly to filesystems, and be able to CD through them to access files. 
- *Combat*: *In combat, players will have a text entry field where they will be able to enter Bash commands. After each correct command, a spell will shoot across the screen and damage the boss. Incorrect commands will lead to damage being taken from the boss.*
- *Core Gameplay Mechanic #4*: Levels each teach a specific set of commands as the players navigate and interact with NPC’s and chests to learn more. For example, in one level the player might need to get close to an NPC and initiate a talking sequence that will teach about the CP command. Chests will unlock new spells to be able to use against the enemies. Each level culminates in a Boss Battle in a battle that encompasses commands they’ve learned so far. So if a level talks about the commands CP, CD, LS then the boss will incorporate all those commands in order to complete the fight.
*Core Gameplay Mechanic #5* Spells: Players can find and utilize spells to combat enemies. Spells will be cast based on the commands players enter. Player can find new spells as the game goes on via chests and something to note is that spells are just purely cosmetic as they don’t actually change how much damage you do but just adds to the dynamic of the game.


    
## Feedback

Failing a bash commands results in a loss of health that will be displayed to the player
Successfully executing a bash command will result in a loss of health to the enemy that will be displayed to the player. 
Beating levels will result in new harder levels that will be different

# Story and Gameplay

## Presentation of Rules

*The rules of the game will be taught briefly by NPCs and since the rules are so simplistic anything else will be learned via quick experience with the first enemy or be blocked from doing based on the game’s boundaries.*

## Presentation of Content

*Gameplay mechanics will be taught briefly by NPC’s and then follow a small tutorial of how to execute the bash commands. The enemies will then be a way to build upon that and expand that knowledge. The bosses will be a way to solidify that knowledge and make sure the player has fully mastered it.*

## Story (Brief)

*You are a wizard exploring a dungeon and want to obtain a super spell at the end of the dungeon for the sake of power.*

## Storyboarding
![Storyboard Image](../assets/storyboard.png)


# Assets Needed

## Aesthetics

*Blocky, pixelated 8-bit visuals, with peaceful ambient noise during exploration and upbeat energetic music during boss fights. Dungeon that inspires a sense of exploration and adventure*

## Graphical

- Characters List
   - *Wizard*: Player's character, an 8-bit wizard
   - *NPC 1*: A character in the dungeon the player can interact with; 8-bit
   - *NPC 2*: A character in the dungeon the player can interact with; 8-bit
   - *Boss 1*: A monster in the dungeon that the player has to defeat. 
   - *NPC 3*: A character in the dungeon the player can interact with; 8-bit
   - *NPC 4*: A character in the dungeon the player can interact with; 8-bit
   - *Boss 2*: A character in the dungeon the player has to defeat
- Textures: 
  - *Characters should have an 8-bit appearance*
- Environment Art/Textures:
  - *The background should be a dungeon*

## Audio

- Music List (Ambient sound)
  - *Exploring the dungeon*: *Calming ambient music*
  - *Boss Battle*: *Upbeat fighting music*
 

- Sound List (SFX)
  - *Whoosh of spell firing*: *magical whooshing sound of a spell flying*
  - *Hurt Player Noise*: *when the player or boss takes damage*
  - *Creaking chest opening noise*: *when a player opens a chest*


# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
