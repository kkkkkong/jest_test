const mytest = require("../src/first");
const specialPackage=[[],["特殊行李四","特殊行李三","特殊行李二","特殊行李一","特殊行李五","特殊行李六","特殊行李七","特殊行李八","特殊行李九"],
["特殊行李一","特殊行李二","特殊行李三","特殊行李三","特殊行李三","特殊行李四","特殊行李四","特殊行李四","特殊行李五","特殊行李六","特殊行李六","特殊行李七","特殊行李七","特殊行李八","特殊行李九","特殊行李九","特殊行李九"],
["特殊行李七"],["特殊行李八"]];
const specialPackageWeight=[[],[30,20,20,30,20,30,20,30,20],[10,20,20,25,35,20,25,35,30,20,25,20,25,3,5,20,25],[35],[35]];

const long=[[80,80,30],[55,66],[],[80,80],[20,20,100,100,20],[20,20],[120],[20],[10]];
const width=[[60,60,30],[55,40],[],[60,60],[20,20,60,60,20],[20,20],[120],[20],[10]];
const heigth=[[40,40,30],[30,20],[],[40,40],[20,20,40,40,20],[20,20],[120],[20],[10]];
const weight=[[23,12,25],[29,36],[],[16,25],[25,30,20,30,15],[15,5],[20],[50],[10]];



describe("国际乘客正常行李测试",() =>{
    test('额外行李', () => {
        const test = new mytest();
        expect(mytest.getTestDate("经济舱","普通乘客","区域二",specialPackage[0],long[0],width[0],heigth[0],weight[0],specialPackageWeight[0])).toBe(2760);
    })
    test('额外行李', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","区域一",specialPackage[0],long[0],width[0],heigth[0],weight[0],specialPackageWeight[0])).toBe(4340);
    })
    test('测试特殊行李的所有路径', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","区域五",specialPackage[2],long[2],width[2],heigth[2],weight[2],specialPackageWeight[2])).toBe(46510);
    })
    test('乘客五', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","区域一",specialPackage[0],long[4],width[4],heigth[4],weight[4],specialPackageWeight[0])).toBe(8340);
    })
    test('乘客六', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","区域二",specialPackage[0],long[4],width[4],heigth[4],weight[4],specialPackageWeight[0])).toBe(3250);
    })
    test('乘客七', () => {
        expect(mytest.getTestDate("头等舱","普通乘客","区域三",specialPackage[0],long[4],width[4],heigth[4],weight[4],specialPackageWeight[0])).toBe(2110);
    })
    test('乘客八', () => {
        expect(mytest.getTestDate("头等舱","普通乘客","区域四",specialPackage[0],long[4],width[4],heigth[4],weight[4],specialPackageWeight[0])).toBe(2630);
    })

})
describe("国际乘客异常行李测试", () => {
    test('国外超长', () => {
        expect(mytest.getTestDate("头等舱","普通乘客","区域四",specialPackage[0],long[6],width[6],heigth[6],weight[6],specialPackageWeight[0])).toBe("行李超长");
    })
    test('国外超重', () => {
        expect(mytest.getTestDate("头等舱","普通乘客","区域四",specialPackage[0],long[7],width[7],heigth[7],weight[7],specialPackageWeight[0])).toBe("行李超重");
    })
    test('特殊行李七超尺寸', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","区域五",specialPackage[3],long[2],width[2],heigth[2],weight[2],specialPackageWeight[3])).toBe("超尺寸");
    })
    test('特殊行李八超尺寸', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","区域五",specialPackage[4],long[2],width[2],heigth[2],weight[2],specialPackageWeight[4])).toBe("超尺寸");
    })
})
describe("国内乘客正常行李测试", () => {

    test('乘客四', () => {
        expect(mytest.getTestDate("头等舱","普通乘客","国内",specialPackage[0],long[3],width[3],heigth[3],weight[3],specialPackageWeight[0])).toBe(15);
    })
    test('乘客二', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],long[3],width[3],heigth[3],weight[3],specialPackageWeight[0])).toBe(315);
    })
    test('乘客三', () => {
        expect(mytest.getTestDate("公务舱","普通乘客","国内",specialPackage[0],long[3],width[3],heigth[3],weight[3],specialPackageWeight[0])).toBe(165);
    })

    test('乘客一', () => {
        expect(mytest.getTestDate("经济舱","带婴儿乘客","国内",specialPackage[0],long[5],width[5],heigth[5],weight[5],specialPackageWeight[0])).toBe(150);
    })
    // test('国内超重', () => {
    //     expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],long[7],width[7],heigth[7],weight[7],specialPackageWeight[0])).toBe("超重");
    // })

    test('国内免费', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],long[8],width[8],heigth[8],weight[8],specialPackageWeight[0])).toBe(0);
    })
    test('国内免费', () => {
        expect(mytest.getTestDate("公务舱","普通乘客","国内",specialPackage[0],long[8],width[8],heigth[8],weight[8],specialPackageWeight[0])).toBe(0);
    })
    test('国内免费', () => {
        expect(mytest.getTestDate("头等舱","普通乘客","国内",specialPackage[0],long[8],width[8],heigth[8],weight[8],specialPackageWeight[0])).toBe(0);
    })
    test('国内免费', () => {
        expect(mytest.getTestDate("公务舱","带婴儿乘客","国内",specialPackage[0],long[8],width[8],heigth[8],weight[8],specialPackageWeight[0])).toBe(0);
    })
})
describe("国内乘客异常行李测试", () => {
    test('国内超长', () => {
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],long[6],width[6],heigth[6],weight[6],specialPackageWeight[0])).toBe("超长");
    })
})

describe("新添加测试，白盒", () => {
    test("超重超尺", ()=>{
        expect(mytest.getTestDate("经济舱","带婴儿乘客","国内",specialPackage[0],[100],[60],[50],[35],specialPackageWeight[0])).toBe("超长");
    })
    test("婴儿超重", ()=>{
        expect(mytest.getTestDate("头等舱","带婴儿乘客","国内",specialPackage[0],[100],[60],[40],[15],specialPackageWeight[0])).toBe(75);
    })
    test("付费", ()=>{
        expect(mytest.getTestDate("头等舱","普通乘客","国内",specialPackage[0],[100,100,100],[60,60,60],[40,40,40],[20,20,20],specialPackageWeight[0])).toBe(300);
    })
    test("区域一", ()=>{
        expect(mytest.getTestDate("头等舱","普通乘客","区域一",specialPackage[0],[100],[60],[40],[1.5],specialPackageWeight[0])).toBe(980);
    })
    test("超重超尺", ()=>{
        expect(mytest.getTestDate("头等舱","带婴儿乘客","国内",specialPackage[0],[100],[60],[50],[35],specialPackageWeight[0])).toBe("超长");
    })
    test("超重", ()=>{
        expect(mytest.getTestDate("经济舱","带婴儿乘客","国内",specialPackage[0],[70],[50],[30],[25],specialPackageWeight[0])).toBe(225);
    })
    test("超重", ()=>{
        expect(mytest.getTestDate("经济舱","带婴儿乘客","国内",specialPackage[0],[70],[50],[30],[30],specialPackageWeight[0])).toBe(300);
    })

    test("超重超尺", ()=>{
        expect(mytest.getTestDate("经济舱","带婴儿乘客","国内",specialPackage[0],[100],[60],[40],[20],specialPackageWeight[0])).toBe(150);
    })
    test("超重超尺", ()=>{
        expect(mytest.getTestDate("经济舱","带婴儿乘客","区域一",specialPackage[0],[100],[60],[40],[20],specialPackageWeight[0])).toBe(980);
    })
    test("付费", ()=>{
        expect(mytest.getTestDate("头等舱","普通乘客","区域一",specialPackage[0],[100,100,100],[60,60,60],[40,40,40],[22,30,30],specialPackageWeight[0])).toBe(2380);
    })
    test("付费", ()=>{
        expect(mytest.getTestDate("头等舱","普通乘客","区域一",specialPackage[0],[100,100,100,100],[60,60,60,60],[40,40,40,40],[22,30,30,30],specialPackageWeight[0])).toBe(2980);
    })
    test("付费", ()=>{
        expect(mytest.getTestDate("头等舱","普通乘客","区域一",specialPackage[0],[100,100,100,100,100],[60,60,60,60,60],[40,40,40,40,40],[22,25,30,22,25],specialPackageWeight[0])).toBe(4960);
    })

    test("超重超尺", ()=>{
        expect(mytest.getTestDate("经济舱","带婴儿乘客","国内",specialPackage[0],[70],[50],[30],[25],specialPackageWeight[0])).toBe(225);
    })
})

describe("黑盒测试", () => {
    test("舱位空值", ()=>{
        expect(mytest.getTestDate("","普通乘客","国内",specialPackage[0],long[6],width[6],heigth[6],weight[6],specialPackageWeight[0])).toBe("输入类型错误");
    })
    test("乘客类型空值", ()=>{
        expect(mytest.getTestDate("经济舱","","国内",specialPackage[0],long[6],width[6],heigth[6],weight[6],specialPackageWeight[0])).toBe("输入类型错误");
    })
    test("航班类型空值", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","",specialPackage[0],long[6],width[6],heigth[6],weight[6],specialPackageWeight[0])).toBe("输入类型错误");
    })
    test("尺寸为负数", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[-10],[10],[10],[10],specialPackageWeight[0])).toBe("尺寸不能为负数");
    })
    test("尺寸为负数", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[-10],[10],[10],specialPackageWeight[0])).toBe("尺寸不能为负数");
    })
    test("尺寸为负数", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[10],[-10],[10],specialPackageWeight[0])).toBe("尺寸不能为负数");
    })
    test("尺寸为负数", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[10],[10],[-10],specialPackageWeight[0])).toBe("尺寸不能为负数");
    })
    test("尺寸为零", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[0],[10],[10],[10],specialPackageWeight[0])).toBe("尺寸不能为零");
    })
    test("尺寸为零", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[0],[10],[10],specialPackageWeight[0])).toBe("尺寸不能为零");
    })
    test("尺寸为零", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[10],[0],[10],specialPackageWeight[0])).toBe("尺寸不能为零");
    })
    test("尺寸为零", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[10],[10],[0],specialPackageWeight[0])).toBe("尺寸不能为零");
    })
    // test("特殊行李尺寸为零", ()=>{
    //     expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[10],[10],[10],[-10])).toBe("尺寸不能为零");
    // })
    // test("非法输入", ()=>{
    //     expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],['khg'],[10],[10],["kg"],specialPackageWeight[0])).toBe("尺寸不能为零");
    // })
    test("超长", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[120],[10],[10],[10],specialPackageWeight[0])).toBe("超长");
    })
    test("超宽", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[80],[10],[10],specialPackageWeight[0])).toBe("超长");
    })
    test("超高", ()=>{
        expect(mytest.getTestDate("经济舱","普通乘客","国内",specialPackage[0],[10],[10],[60],[10],specialPackageWeight[0])).toBe("超长");
    })
})
