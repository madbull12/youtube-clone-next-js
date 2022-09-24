const truncate = (text:string) => {
    if(text?.length > 1000) return text.slice(0,1000) + "..."
}

export default truncate;
