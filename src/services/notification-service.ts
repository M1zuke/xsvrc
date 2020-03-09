const logo = require('../images/logo512.png');
const bing = require('../sounds/bing.mp3');

export function sendNotification(title: string, text: string, onclick: (this: Notification, e: Event) => void): Notification {
  const notification = new Notification(title, {
    body: text,
    icon: logo,
    data: 'test',
  });
  notification.onclick = onclick;
  playNotificationSound();
  return notification;
}

function playNotificationSound(): void {
  const audio: HTMLAudioElement = new Audio(bing);
  audio.play();
}
