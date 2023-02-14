export const items = [
    {id: 1, price: 169.93, description: "Heavy Duty Wool Knife"},
    {id: 2, price: 66.17, description: "Fantastic Marble Shoes"},
    {id: 3, price: 934.64, description: "Synergistic Rubber Gloves"},
    {id: 4, price: 60.40, description: "Lightweight Aluminum Clock", toPrice: 98.32},
    {id: 5, price: 18.91, description: "Gorgeous Paper Clock", toPrice: 262.45, highlight: "Sale"},
    {id: 6, price: 7.97, description: "Practical Bronze Bench", isOnSale: true, salePrice: 251.00, highlight: "-97%"},
    {id: 7, price: 426.03, description: "Intelligent Wooden Shirt", isOnSale: false},
    {id: 8, price: 941.23, description: "Rustic Iron Hat", isOnSale: false},
    {id: 9, price: 915.18, description: "Lightweight Iron Watch", isOnSale: false},
    {id: 10, price: 18.91, description: "Mediocre Marble Bench", isOnSale: true, salePrice: 983.99, highlight: "-98%"},
    {id: 11, price: 857.64, description: "Practical Linen Knife", isOnSale: false},
    {id: 12, price: 305.49, description: "Fantastic Plastic Clock", isOnSale: false},
    {id: 13, price: 368.84, description: "Gorgeous Bronze Knife", isOnSale: false},
    {id: 14, price: 899.41, description: "Rustic Marble Car", isOnSale: false},
    {id: 15, price: 751.04, description: "Awesome Leather Shoes", isOnSale: false},
    {id: 16, price: 262.45, description: "Small Bronze Chair", isOnSale: false},
]

// Cart contains all items with id & list of ietems
export const cart: any = {};
export const cartItemsCount: any = {};
export const users: any = {};
export const userIdNameMap: any = {};

export const findItem = (itemId: any) => {
    const list = items.filter(item => item.id == itemId);
    if(list.length == 0 ) return null;
    return list[0];
}

export const getItemsInCartForUser = (userId: any) => {
    const listItems = (cart[userId] || new Set([]));
    const finalMap = {} as any;
    Array.from(listItems)
        .map((itemId: any) => findItem(itemId))
        .filter((item: any) => item != null)
        .forEach((item: any) => {
            const fi = finalMap[item.id] ;
            if(!fi){
                item.quantity = 0;
                finalMap[item.id] = item;
                
            };
            finalMap[item.id].quantity += 1;
        });
    return Object.values(finalMap);
}