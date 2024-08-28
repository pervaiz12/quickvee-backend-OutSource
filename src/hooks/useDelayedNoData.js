import {useState, useEffect} from "react";

const useDelayedNodata = (data, delay = 500)=>{
    const [showNoData, setShowNoData] = useState(false);

    useEffect(()=>{
        if(Array.isArray(data) && data.length === 0){
            const timer = setTimeout(()=>{
                setShowNoData(true)
            },delay);
            return () => clearTimeout(timer);
        }else{
            setShowNoData(false);
        }
    },[])
    return showNoData;
}

export default useDelayedNodata;