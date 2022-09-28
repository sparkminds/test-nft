var ba64 = require("ba64");
const createImage = (datas: any) => {
    console.log('hello bro ');
    datas.forEach((data: any) => {
        const source = data.source.split("/")[0]
        const level = data.source.split("/")[1]
        console.log('source, level', source, level);
        switch (source) {
            case level === 'common':
                console.log('in common');
                ba64.writeImageSync(`C:/Users/ADMIN/Documents/input_images/${source}/${level}/${Math.random()}`, data.base64)
                break;
        }
    })

}

export { createImage };