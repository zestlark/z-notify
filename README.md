# z-notify Library

**z-notify** is a lightweight JavaScript library for creating customizable and stylish notifications with optional audio cues. Easily integrate notifications into your web application for user feedback or important updates.

## Installation

1. Include the `z-notify.js` file in your project.
2. Ensure you have a copy of the audio files (`bell.mp3`, `beep.mp3`, `drop.mp3`) in your project directory.

## Getting Started

Include the library:
```HTML
<script src="https://zestlark.github.io/z-notify/index.js"></script>
```

```javascript
// Initialize z-notify with optional configuration
const notifyConfig = {
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
    timeout: 2000,
    sound: 'path/to/your/audio/file.mp3'
  }
};

const notification = new Notification(notifyConfig);

// Example usage
notification.notify('Welcome Back!', 'User', 'path/to/your/image.png');
