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
    const password = exec(`bash ./scripts/password.bash ${model.longUid}`)
                        .stdout
                        .replace('\n', '');

    return Object.assign({}, model, { password });
  },

  patch(model) {
    let bin = model.bin;
    bin = AmiiboBin.writeLocks(bin);
    bin = AmiiboBin.writePassword(bin, model.password);
    bin = AmiiboBin.writeUid(bin, model.longUid);
    return Object.assign({}, model, { bin });
  }
}
