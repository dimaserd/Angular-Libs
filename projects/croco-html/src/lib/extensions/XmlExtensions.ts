export class XmlExtensions{
    public static formatXml(xml:string, tab:string = '\t'):string { // tab = optional indent value, default is tab (\t)
        var formatted = '', indent= '';
        tab = tab || '\t';
        xml.split(/>\s*</).forEach(function(node) {
            if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
            formatted += indent + '<' + node + '>\r\n';
            if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
        });
        return formatted.substring(1, formatted.length-3);
    }

    public static tagsToLower(xml: string): string{
        xml = this.replaceTagToLower(xml, "Body");
        xml = this.replaceTagToLower(xml, "Image");
        xml = this.replaceTagToLower(xml, "Text");

        return xml;
    }

    static replaceTagToLower(xml: string, tag: string) : string{
        return xml
            .replace(new RegExp(`<${tag}`, 'g'), `<${tag.toLowerCase()}`)
            .replace(new RegExp(`</${tag}>`, 'g'), `</${tag.toLowerCase()}>`);
    }
}