export default function filter(value, list, options){
    let newList = [];
    value = value.toLowerCase();
    list.forEach((val)=> {
        let flag = false;
        if(value.length > 0)
            if((val['reviewerName'] && val['reviewerName'].toLowerCase().includes(value)) || (val['summary'] && val['summary'].toLowerCase().includes(value)) || (val['reviewText'] && val['reviewText'].toLowerCase().includes(value)))
            flag = true;
        if(options['good'] === true && val['helpful'].length > 0 && val['helpful'][0] === val['helpful'][1])
            flag = true;
        if(options['bad'] === true && val['helpful'].length > 0 && val['helpful'][0] !== val['helpful'][1])
           flag = true;
        if(flag === true)
            newList.push(val);
    });

    if(options['highlight']['color'] !== "" ){
        let toFilterArray = (value === "" && !options['good'] && !options['bad']) ? list : newList;
        toFilterArray.forEach((val)=>{
            if(parseInt(val['overall']) == options['highlight']['rating']){
                val['highLightColor'] = options['highlight']['color'];
            }
        });
        return toFilterArray;
    } else
        return newList;
}