export interface LoginUser<T = any> {
    username?: string;
    refresh_token: string;
    access_token: string
    display_name?: string;
    image_url?: string;
    default_avatar?: string;
}