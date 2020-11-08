export interface Song {
    id: string,
    title: string,
    artist: string,
    image_url: string,
    isPlaying?: boolean,
    url: string,
    album?: string,
    genre?: any,
}
