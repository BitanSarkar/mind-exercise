export const days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const cumMonth = [0,+3,+3,-1,+1,-3,-1,+2,-2,0,+3,-2];
export const randomInRange = (min, max) => {
    [min, max] = (min>max)?[max,min]:[min,max];
    return min+Math.floor((max-min)*Math.random());
}
export const doubleDig = (x) => {
    if(typeof(x)==="number"){
        if(x < 10 && x>=0)
            return "0"+x;
        return x+"";
    }
}
export const isLeapYear = (x) => {
    if(x%400===0)return true;
    if(x%100===0)return false;
    return x%4===0;
}
export const noOfLeap = (x) => {
    return Math.floor(x/4)+Math.floor(x/400)-Math.floor(x/100);
}
export const dateCalc = ({date, month, year}) => {
    return days[((year-1)%7 + noOfLeap(year-1)%7 + months[month-1] + date + ((isLeapYear(year) && month>2) ? 1 : 0))%7];
}