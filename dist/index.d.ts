import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare interface Props {
    value?: string;
    width?: number;
    height?: number;
    margin?: number;
    imgclass?: string;
    myclass?: string;
    downloadButton?: string;
    buttonName?: string;
    qrOptions?: any;
    imageOptions?: any;
    dotsOptions?: any;
    backgroundOptions?: any;
    cornersSquareOptions?: any;
    cornersDotOptions?: any;
    fileExt?: string;
    image?: string;
    download?: boolean;
    downloadOptions?: any;
}

export declare const QRCodeVue3: DefineComponent<Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props> & Readonly<{}>, {
download: boolean;
imageOptions: any;
qrOptions: any;
width: number;
height: number;
margin: number;
image: string;
dotsOptions: any;
cornersSquareOptions: any;
cornersDotOptions: any;
backgroundOptions: any;
value: string;
imgclass: string;
myclass: string;
downloadButton: string;
buttonName: string;
fileExt: string;
downloadOptions: any;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export { }
