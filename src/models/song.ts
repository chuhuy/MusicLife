export interface Song {
    music_id: number,
    title: string,
    artists: string,
    image_url: string,
    isPlaying?: boolean,
    url: string,
    album?: string,
    genre?: any,
    lyric?: string
}
