const BaseAlertController = require('./BaseAlertController');

class AlertController extends BaseAlertController {
  getEnemyPower() {
    if (!this._enemyPower) {
      this._enemyPower = this.room.hostileCreeps.map(
        creep => creep.body.map(bodyPart => {
          switch (bodyPart.type) {
            case ATTACK: return ATTACK_POWER;
            case RANGED_ATTACK: return RANGED_ATTACK_POWER;
            default: return 0;
          }
        })
          .reduce((acc, element) => acc + element)
      );
    }
    return this._enemyPower;
  }
  getAtackPower() {
    if (!this._attackPower) {
      this._attackPower = {
        attack: 0,
        ranged: 0,
        heal: 0
      };
      this.room.creeps.forEach(
        creep => creep.body.forEach(bodyPart => {
          switch (bodyPart.type) {
            case ATTACK:
              this._attackPower.attack = ATTACK_POWER;
              break;
            case RANGED_ATTACK:
              this._attackPower.ranged = RANGED_ATTACK_POWER;
              break;
            case HEAL:
              this._attackPower.heal = HEAL_POWER;
              break;
          }
        })
      );
    }
  }
  getNextRole() {
  }
}

module.exports = AlertController;
