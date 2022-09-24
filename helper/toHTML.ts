const toHTML = (string:string) => new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]
    


export default toHTML;