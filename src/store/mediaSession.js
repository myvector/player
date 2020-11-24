export default class MediaSession {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.media = this.rootStore.mediaSession;

    this.handler = () => false;
    this.session = () => false;

    if (this.media !== undefined) {
      this.session = () => {
        this.media.metadata = new MediaMetadata({
          title: this.rootStore.track.track.title,
          artist: this.rootStore.track.track.band,
          album: '',
          artwork: [
            {
              sizes: '512x512',
              src: this.rootStore.track.cover.cover1,
              type: 'image/jpeg',
            },
          ],
        });
      };
      this.handler = (next, prev) => {
        this.media.setActionHandler('previoustrack', () => {
          prev('prev');
        });
        this.media.setActionHandler('nexttrack', () => {
          next('next');
        });
      };
    }
  }
  mediaSession = () => {
    return this.session();
  };

  handlerAction = (next, prev) => {
    this.handler(next, prev);
  };
}
