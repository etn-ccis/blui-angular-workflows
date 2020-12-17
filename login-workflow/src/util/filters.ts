export function makeEverythingUnique(array: any[], uniqueProp: string): any[] {
    let testArray = [];
    let uniqueArray = array.filter((item) => {
        if (!testArray.includes(item[uniqueProp])) {
            testArray.push(item[uniqueProp]);
            return item;
        }
    });

    return uniqueArray;
}
