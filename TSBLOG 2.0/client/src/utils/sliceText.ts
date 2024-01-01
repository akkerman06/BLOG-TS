

export const sliceText = (count:number, text: string) => {
    return text.length > count ? `${text.slice(0, count)}...` : text
}