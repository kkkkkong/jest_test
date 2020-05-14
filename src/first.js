const mytest = function () {
    var x=1;
}

var long=new Array();
var width=new Array();
var heigth=new Array();
var weight=new Array();
var specialPackageWeight=new Array();
var packageType=new Array();
var packageNum=1;
var cockpitType;
var travellerType;
var flightType;
var result=0;
var price=1000;

mytest.getTestDate=function(cockpit,traveller,flight,packageTypes,l,wid,hei,wei,specialPackageWeights){
    // function getTestDate(cockpit,traveller,flight){
        if(cockpit==""||traveller==""||flight==""){
            return "输入类型错误";
        }
        for(var i=0;i<l.length;i++){
            // if(isNaN(l[i])||isNaN(wid[i])||isNaN(hei[i])||isNaN(wei[i])){
            //     return "非法输入";
            // }
            if(l[i]<0||wid[i]<0||hei[i]<0||wei[i]<0){
                return "尺寸不能为负数";
            }
            if(l[i]==0||wid[i]==0||hei[i]==0||wei[i]==0){
                return "尺寸不能为零";
            }

        }
        
        result=0;
        cockpitType=cockpit;
        travellerType=traveller;
        flightType=flight;
        packageType=packageTypes;
        specialPackageWeight=specialPackageWeights;
        long=l;width=wid;heigth=hei;weight=wei;
        packageNum=long.length;
        return judge();
}
function judgeExtra(a,b,c,d){
    if(packageNum==d+1){
        result+=a;
    }
    else if(packageNum==d+2){
        result+=b;
    }
    else if(packageNum>d+2){
        result+=(packageNum-d-2)*c;
    }
}
function extraBaggage(freePackageNum){
    if(flightType=="区域一"){
        judgeExtra(1400,2000,3000,freePackageNum);
    }
    else if(flightType=="区域二"){
        judgeExtra(1100,1100,1590,freePackageNum);
    }
    else if(flightType=="区域三"){
        judgeExtra(1170,1170,1590,freePackageNum);
    }
    else if(flightType=="区域四"){
        judgeExtra(1380,1380,1590,freePackageNum);
    }
    else{
        judgeExtra(830,1100,1590,freePackageNum);
    }
}
function foreignOverWeightCal(weight,length,a,b,c){
    if(weight<28&&length<=158){
        result+=a;
    }
    else if(weight>28&&length<=158){
        result+=b;
    }
    else if(weight<=23&&length>158){
        result+=b;
    }
    else{
        result==c;
    }
}
function chinaOverWeightcal(weightNow,weight){
    result+=0.015*price*(weightNow-weight);
}
function overWeight(weight,length){
    if(flightType=="区域一"){
        foreignOverWeightCal(weight,length,380,980,1400);
    }
    else if(flightType=="区域二"){
        foreignOverWeightCal(weight,length,280,690,1100);
    }
    else if(flightType=="区域三"){
        foreignOverWeightCal(weight,length,520,520,520);
    }
    else if(flightType=="区域四"){
        foreignOverWeightCal(weight,length,690,1040,2050);
    }
    else{
        foreignOverWeightCal(weight,length,210,520,830);
    }
}

function chinaFlight(){

    var weights=0;
    for(var j=0;j<packageNum;j++){
        if(long[j]>100||width[j]>60||heigth[j]>40){
            // alert("超长");
            return "超长";
        }
        weights+=weight[j];
    }
    // 国内
    if(travellerType=="带婴儿乘客"){
        if(weights>10){
            // 计算
            chinaOverWeightcal(weights,10);
        }
        else{
            // 免费托运,并且可携带婴儿车
            var test=0;
            test++;
        }
    }
    else{
        if(cockpitType=="头等舱"){
            if(weights>40){
                //cal
                chinaOverWeightcal(weights,40);
            }
            else{
                // 免费托运
                var test=0;
                test++;
            }
        }
        else if(cockpitType=="公务舱"){
            if(weights>30){
                //cal
                chinaOverWeightcal(weights,30);
            }
            else{
                // 免费托运
                var test=0;
                test++;
            }
        }
        else{
            if(weights>20){
                //cal
                chinaOverWeightcal(weights,20);
            }
            else{
                // 免费托运
                var test=0;
                test++;
            }
        }
    }
}
function foreignFlight(){
    var freePackageNum=0;
    for(var j=0;j<packageNum;j++){
        // 判断是否超长
        var length=long[j]+width[j]+heigth[j];
        if(length>203){
            // alert("行李超长");
            return "行李超长";
        }
        else if(length>158){
            // 需计算费用
            overWeight(weight[j],length);
        }

        if(weight[j]>32){
            // alert("行李超重，需分成两件处理");
            return "行李超重";
        }
        else if(cockpitType=="头等舱"){
            // 免费运输两件
            freePackageNum=2;
        }
        // 经济舱
        else{
            // 需计算费用
            if(flightType=="区域一"){
                freePackageNum=1;
                if(weight[j]>23){
                    overWeight(weight[j],length);
                }
                else{
                    // 免费一件
                    var test=0;
                    test++;
                }
            }
            else{
                freePackageNum=2;
                if(weight[j]>23){
                    overWeight(weight[j],length);
                }
                else{
                    // 免费两件
                    var test=0;
                    test++;
                }
            }
        }
    }
    // 计算额外行李收费
    extraBaggage(freePackageNum);
    // var mark=result;
    // result=0;
    // return mark;
    return result;

}
function specialPackage(){
    for(var i=0;i<specialPackageWeight.length;i++){
        if(packageType[i]=="特殊行李一"){
            // 免费
            var test=0;
            test++;
        }
        else if(packageType[i]=="特殊行李二"){
            //添加到正常行李中，并且不计算长宽高条件
            var len=long.length;
            long[len]=1;width[len]=1,heigth[len]=1;weight[len]=specialPackageWeight[i];
            packageNum++;
        }
        else if(packageType[i]=="特殊行李三"){
            if(specialPackageWeight[i]<=23){
                result+=2600;
            }
            else if(specialPackageWeight[i]<=32){
                result+=3900;
            }
            else{
                result+=5200;
            }
        }
        else if(packageType[i]=="特殊行李四"){
            if(specialPackageWeight[i]<=23){
                result+=1300;
            }
            else if(specialPackageWeight[i]<=32){
                result+=2600;
            }
            else{
                result+=3900;
            }
        }
        else if(packageType[i]=="特殊行李五"){
            //添加到正常行李中，并且不计算长宽高条件
            var len=long.length;
            long[len]=1;width[len]=1,heigth[len]=1;weight[len]=specialPackageWeight[i];
            packageNum++;
        }
        else if(packageType[i]=="特殊行李六"){
            if(specialPackageWeight[i]<=23){
                result+=490;
            }
            // 小于32
            else{
                result+=3900;
            }
        }
        else if(packageType[i]=="特殊行李七"){
            if(specialPackageWeight[i]<=23){
                result+=1300;
            }
            else if(specialPackageWeight[i]<=32){
                result+=2600;
            }
            else{
                // alert("超尺寸");
                return "超尺寸";
            }
        }
        else if(packageType[i]=="特殊行李八"){
            if(specialPackageWeight[i]<=23){
                result+=1300;
            }
            else{
                // alert("超尺寸");
                return "超尺寸";
            }
        }
        else{
            if(specialPackageWeight[i]<=8){
                result+=3900;
            }
            else if(specialPackageWeight[i]<=23){
                result+=5200;
            }
            else{
                result+=7800;
            }
        }
    }
    // var mark=result;
    // result=0;
    // return mark;
    return result;
}
//判断是否行李超长 超宽
function judge(){
    
    if(specialPackageWeight.length!=0){
        var receive=specialPackage();
        if(typeof(receive)=="string"){
            return receive;
        }
    }
    if(flightType=="国内"){
        var receive=chinaFlight();
        if(typeof(receive)=="string"){
            return receive;
        }
    }
    else{
        return foreignFlight();
    }
    // alert("最终收费"+result+"元");
    // var mark=result;
    // result=0;
    // return mark;
    return result;
}
module.exports = mytest;