export interface Song {
    id: number,
    name: string,
    artist: string,
    image_url: string,
    isPlaying?: boolean,
    url: string,
    album?: string,
    genre?: any,
}
