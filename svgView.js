class SVGView {
  constructor() {
    this.settingsSVG = null;
  }

  getSettingsSVG() {
    this.settingsSVG = document.createElement('img');
    this.settingsSVG.src = './settings.svg';
    this.settingsSVG.id = 'settings-svg';
    this.settingsSVG.loading = 'lazy';
    this.settingsSVG.classList.add('settings-svg');
    return this.settingsSVG;
  }
}

export default new SVGView();
