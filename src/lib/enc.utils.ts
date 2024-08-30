export function convertUtf8ToBase64( str: string ) {
    return btoa(encodeURIComponent( str ))
}
export function convertBase64ToUtf8( str: string ) {
    return decodeURIComponent(atob( str ))
}
