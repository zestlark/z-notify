class zMedia {
  constructor({ audioTone = 'audio/bell.mp3' } = {}) {
    this.audioTone = audioTone;
    this.audioMsg;
  }

  play() {
    if (navigator.userActivation.isActive) {
      this.audioMsg.currentTime = 0;
      this.audioMsg.play();
    }
  }

  setAudio(url) {
    this.audioMsg = new Audio(url)
  }
}

const zm = new zMedia();

class Notification {
  constructor({ x = 'center', y = 'top', borderRadius = '100px', background = '#000', color = '#fff', styles = {}, options = {} } = {}) {
    this.x = x;
    this.y = y;
    this.borderRadius = borderRadius;
    this.background = background;
    this.color = color;
    this.styles = {
      default: {
        background: background,
        color: color,
      },
      danger: {
        background: styles.danger?.background || '#ff000044',
        color: styles.danger?.color || 'white',
      },
      success: {
        background: styles.success?.background || '#00ff0044',
        color: styles.success?.color || 'white',
      },
    };
    this.options = {
      timeout: options?.timeout || 3000,
      sound: options?.sound || 'https://zestlark.github.io/z-notify/audio/bell.mp3'
    };

    this.containerid;
    this.NotifyHistory = []
    zm.setAudio(this.options.sound)
    this.init();
  }

  notify(paragraph = 'Notification not Set', title = null, imageurl = null) {

    let date = new Date().toLocaleString();

    this.NotifyHistory.push({ paragraph, title, imageurl, 'time_date': date })

    var notification = document.getElementById(this.containerid);
    var notificationWrapper = document.createElement('div');
    notificationWrapper.className = 'z-notify-wrapper';

    if (imageurl) {
      var notificationIcon = document.createElement('div');
      notificationIcon.className = 'z-notify-icon';
      var iconImage = document.createElement('img');
      iconImage.src = imageurl;
      iconImage.alt = '';
      notificationIcon.appendChild(iconImage);
      notificationWrapper.appendChild(notificationIcon);
    }

    var notificationText = document.createElement('div');
    notificationText.className = 'z-notify-text';

    var textHeading = document.createElement('h1');
    textHeading.innerHTML = title + ` <span>${date}</span>`;

    var textParagraph = document.createElement('p');
    textParagraph.innerHTML = paragraph;

    if (title) notificationText.appendChild(textHeading);
    notificationText.appendChild(textParagraph);

    notificationWrapper.appendChild(notificationText);

    notification.appendChild(notificationWrapper);

    zm.play();

    notificationWrapper.addEventListener('animationend', () => {
      setTimeout(() => {
        notificationWrapper.parentNode.removeChild(notificationWrapper);
      }, this.options.timeout)
    });
  }

  danger(paragraph = 'Notification not Set', title = null, imageurl = null) {
    this.notify(paragraph, title, imageurl)
    this.setStyle('danger')
  }

  success(paragraph = 'Notification not Set', title = null, imageurl = null) {
    this.notify(paragraph, title, imageurl)
    this.setStyle('success')
  }

  setStyle(style) {
    let notificationwrapper = document.getElementById(this.containerid).getElementsByClassName('z-notify-wrapper')
    if (!notificationwrapper || notificationwrapper.length === 0) {
      console.error('Container element not found.');
      return;
    }

    if (this.styles[style]) {
      notificationwrapper[notificationwrapper.length - 1].style.background = this.styles[style].background;
      notificationwrapper[notificationwrapper.length - 1].style.color = this.styles[style].color;
    }
  }

  history() {
    return this.NotifyHistory;
  }

  destroy() {
    var notification = document.getElementById(this.containerid);
    if (notification) {
      notification.parentNode.removeChild(notification);
      this.NotifyHistory = [];
    }

    return null;
  }

  init() {
    if (this.x == 'start' || this.x == 'left') {
      this.x = 'start';
    } else if (this.x == 'right' || this.x == 'end') {
      this.x = 'end';
    }

    this.y = (this.y === 'bottom') ? 'bottom' : 'top';

    let randomNotifyName = 'z-notify' + Math.floor((Math.random() * 1000) + 1);
    this.containerid = randomNotifyName;

    var dynamicStyles = `
                  #${this.containerid}.z-notify * {
                      margin: 0;
                      border: 0;
                      padding: 0;
                      font-family: sans-serif;
                  }

                  #${this.containerid}.z-notify {
                      position: fixed;
                      z-index: auto;
                      ${this.y === 'bottom' ? 'bottom: 0;' : 'top:0;'}
                      left: 0;
                      width: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: ${this.x};
                      gap: 5px;
                      pointer-events: none;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper {
                      width: 350px;
                      padding: 10px 10px;
                      background: ${this.background};
                      border-radius: ${this.borderRadius};
                      color: ${this.color};
                      box-shadow: 0 0 10px rgba(0, 0, 0, .3);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      gap: 10px;
                      margin:10px 10px 0px 10px;
                      backdrop-filter: blur(6px);
                      -webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	                    animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper .z-notify-text{
                    width: 100%;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper .z-notify-text h1 {
                      font-size: 13px;
                      font-weight: normal;
                      margin-bottom: 3px;
                      opacity: 70%;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper .z-notify-text p {
                      font-size: 13px;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper .z-notify-text h1 span {
                      font-size: 12px;
                      opacity: 70%;
                      margin-left: 5px;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper .z-notify-icon {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                  }

                  #${this.containerid}.z-notify .z-notify-wrapper .z-notify-icon img {
                      width: 40px;
                      height: 40px;
                  }

                  @-webkit-keyframes slide-in-top {
                    0% {
                      -webkit-transform: translateY(-1000px);
                              transform: translateY(-1000px);
                      opacity: 0;
                    }
                    100% {
                      -webkit-transform: translateY(0);
                              transform: translateY(0);
                      opacity: 1;
                    }
                  }
                  @keyframes slide-in-top {
                    0% {
                      -webkit-transform: translateY(-1000px);
                              transform: translateY(-1000px);
                      opacity: 0;
                    }
                    100% {
                      -webkit-transform: translateY(0);
                              transform: translateY(0);
                      opacity: 1;
                    }
                  }
              `;



    var notification = document.createElement('div');
    notification.id = this.containerid;
    notification.classList.add('z-notify');
    document.body.appendChild(notification);

    var styleElement = document.createElement('style');
    styleElement.innerHTML = dynamicStyles;
    document.head.appendChild(styleElement);

    // setInterval(() => {
    //   let zContainer = document.getElementById(this.containerid);
    //   if (zContainer.getElementsByClassName('z-notify-wrapper').length > 0) {
    //     zContainer.style.dislay = 'none'
    //   } else {
    //     zContainer.style.dislay = 'flex'
    //   }
    //   console.log(zContainer);
    // }, 300)
  }

}

let notifyinit = {
  x: 'end',
  y: 'top',
  borderRadius: '5px',
  color: 'black',
  background: 'white',
  styles: {
    danger: {
      background: '#ff000044',
      color: 'white'
    },
    success: {
      background: '#00ff0044',
      color: 'black'
    }
  },
  options: {
    timeout: 2000
  }
}

const nf = new Notification(notifyinit);
//nf.notify('Welcome Back Sir', 'Zestlark', 'https://img.icons8.com/?size=48&id=16713&format=png')

// const nf1 = new Notification({ x: 'left', y: 'bottom' });
// nf1.notify('Welcome Back Sirrrrrrrrrrrr', 'Zestlark', 'https://img.icons8.com/?size=48&id=16713&format=png')
// nf1.danger('deepak',)
// nf1.success('', 'test')