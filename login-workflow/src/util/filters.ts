export function makeEverythingUnique(array: any[], uniqueProp: string): any[] {
    const testArray = [];
    const uniqueArray = array.filter((item) => {
        if (!testArray.includes(item[uniqueProp])) {
            testArray.push(item[uniqueProp]);
            return item;
        }
    });

    return uniqueArray;
}
