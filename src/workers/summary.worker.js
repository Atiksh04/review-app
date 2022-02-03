export default function filter(list){
    let arr = [1,2,3,4,5], lineData=[];
    let ratingObj = {};
    arr.forEach((v)=>{
        ratingObj[v] = list.filter((val)=> parseInt(val['overall']) === v).length;
    });

    let uniqueReviwers = list.map(v => v['reviewerName']).filter((val, index, array) => array.indexOf(val) === index);

    return {"rating": ratingObj, "uniqueReviewers": uniqueReviwers};
}