const DEFAULTS = {
  shortUid: undefined,
  longUid: undefined,
  password: undefined,
  bin: undefined,
};

module.exports = {
  init(model = {}) {
    return this.state = Object.assign({}, DEFAULTS, model);
  }
}
