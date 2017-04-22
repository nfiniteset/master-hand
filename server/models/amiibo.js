const exec = require('sync-exec');
const AmiiboBin = require('./amiibo-bin');

const DEFAULTS = {
  shortUid: undefined,
  longUid: undefined,
  password: undefined,
  bin: undefined,
};

module.exports = {
  init(model = {}) {
    return this.state = Object.assign({}, DEFAULTS, model);
  },

  getPassword(model) {
    const password = exec(`bash ./scripts/password.bash ${model.shortUid}`)
                        .stdout
                        .replace('\n', '');
    return Object.assign({}, model, { password });
  },

  patch(model) {
    let bin = AmiiboBin.writeStatic(model.bin);
    bin = AmiiboBin.writePassword(model.bin, model.password);
    bin = AmiiboBin.writeUid(model.bin, model.shortUid, model.longUid);
    return Object.assign({}, model, { bin });
  }
}
