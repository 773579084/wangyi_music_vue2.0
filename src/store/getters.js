const getters = {
    // playerSong
    songName: state => state.playerSong.name,
    songAuthor: state => state.playerSong.artist,
    songImg: state => state.playerSong.pic
}

export default getters
