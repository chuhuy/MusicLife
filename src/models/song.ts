export interface Song {
    id: number,
    title: string,
    artist: string,
    image_url: string,
    isPlaying?: boolean,
    url: string,
    album?: string,
    genre?: any,
}
