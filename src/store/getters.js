const getters = {
  // playerSong
  songName: state => state.playerSong.musicDetail.name,
  songAuthor: state => state.playerSong.musicDetail.artist,
  songImg: state => state.playerSong.musicDetail.pic,
  songUrl: state => state.playerSong.musicPlyerUrl,
  isAudio: state => state.playerSong.isAudio,
  // user
  userId: state => state.user.userDetail.userId,
  token: state => state.user.token
}

export default getters
