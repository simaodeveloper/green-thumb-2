export default {
  ANDROID() {
    return navigator.userAgent.match(/Android/i);
  },
  BLACKBERRY() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  IOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  OPERA() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  WINDOWS() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  ANY() {
    return (
      this.ANDROID() ||
      this.BLACKBERRY() ||
      this.IOS() ||
      this.OPERA() ||
      this.WINDOWS()
    );
  },
};
