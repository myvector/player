const ERROR = 'ERROR';
const MESSAGE_SAVE_PLAYLIST = 'MESSAGE_SAVE_PLAYLIST';
const MESSAGE_SAVE_EQUALIZER = 'MESSAGE_SAVE_EQUALIZER';
const MESSAGE_SAVE_FAVORITE_TRACK = 'MESSAGE_SAVE_FAVORITE_TRACK';
const MESSAGE_TRACK_HAVE = 'MESSAGE_TRACK_HAVE';
const NOT_SAVE = 'NOT_SAVE';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
const DELETE_EQUALIZER = 'DELETE_EQUALIZER';
const DELETE_TRACK = 'DELETE_TRACK';

const getMessageText = (type) => {
  switch (type) {
    case ERROR:
      return 'Что то пошло не так, попробуйте еще раз';
    case MESSAGE_SAVE_PLAYLIST:
      return 'Плейлист сохранен';
    case MESSAGE_SAVE_EQUALIZER:
      return 'Настройки эквалайзера сохранены';
    case MESSAGE_SAVE_FAVORITE_TRACK:
      return 'Трек добавлен в любимые';
    case MESSAGE_TRACK_HAVE:
      return 'Этот трек уже есть в списке';
    case NOT_SAVE:
      return 'Данные не сохранились';
    case DELETE_TRACK:
      return 'Трек удален';
    case DELETE_PLAYLIST:
      return 'Плейлист удален';
    case DELETE_EQUALIZER:
      return 'Настройки еквалайзера удалены';
    default:
      return 'Что то пошло не так...';
  }
};

export {
  ERROR,
  MESSAGE_SAVE_PLAYLIST,
  MESSAGE_SAVE_EQUALIZER,
  MESSAGE_SAVE_FAVORITE_TRACK,
  MESSAGE_TRACK_HAVE,
  NOT_SAVE,
  DELETE_TRACK,
  DELETE_PLAYLIST,
  DELETE_EQUALIZER,
  getMessageText,
};
