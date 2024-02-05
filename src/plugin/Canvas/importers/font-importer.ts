import { Props } from '../../../model/Canvas/Screen';

/**
 * Gain a Font name from the related properties of Fields 
 * @date 03/12/2023 - 07:06:45
 *
 * @export
 * @param {Props[]} props - properties of Fields
 * @returns {string} returns a Font name
 */
export function getFontName(props: Props[]): string {
    var name = "";
    props.forEach(prop => {
        if (prop.key == "Font") {
            const value = prop.value;

            if(value.includes(".Font")) {
                name = value;
                return  name;
            }
            if (value.includes(".")) {
                name = value.split(".")[1].replace("'", "").replace("'", "");
            }
            else {
                if(value.includes("=")) name = value.split("=")[1].replace("'", "").replace('"', '').replace('"', '');
                else name = value.replace('"','').replace('"','');
            }
        }
    });
    return name;
}