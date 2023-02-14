import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { users, items, cart, userIdNameMap, findItem, getItemsInCartForUser } from "./database"
 
const app = express();
app.use(bodyParser.json());
app.use(cors());

let userIndex = 0;
app.post("/signin", (request: Request, response: Response) => {
    const {username, password} = request.body as any;
    const user = users[username];
    if(!user)
        return response.status(404).json({error: "User not found!"});
    if(user.username != username || user.password != password)
        return response.status(404).json({error: "Invalid username / password!"});
    return response.status(200).json(user);    
})

app.post("/signup", (request: Request, response: Response) => {
    const {username, password} = request.body as any;
    const user = users[username];
    if(user)
        return response.status(200).json(user);
    const newUser = {id: ++userIndex, username, password};
    userIdNameMap[newUser.id] = username;
    users[username] = newUser;
    return response.status(200).json(newUser);    
    
})

// List all items
app.get("/items", (request: Request, response: Response) => {
    response.status(200).json(items);
});

app.get("/cart/:userId", (req: Request, res: Response) => {
    const userId = req.params?.userId;
    console.log(`Requesting user for cart ${userId}`);
    const cartItems = getItemsInCartForUser(userId);
    res.status(200).json(cartItems);
})

app.post("/users/:userId/cart/:itemId", (req: Request, res: Response) => {
    console.log("Post user for useriD ");
    const userId = req.params?.userId;
    const itemId = req.params?.itemId;
    const cartItems = cart[userId];

    if(!cartItems)
        cart[userId] = new Array([]);

    // If already exists, then increase quantity
    cart[userId].push(itemId);

    console.log(`Requesting user for add item in cart: ${userId} :: ${cart[userId].size}`);
    const cartList = getItemsInCartForUser(userId);
    return res.status(200).json(cartList);
})

app.delete("/users/:userId/cart/:itemId", (req: Request, res:  Response) => {
    const userId = req.params?.userId;
    const itemId = req.params?.itemId;
    const cartItems = cart[userId] as any[];
    for(let i=0; i < cartItems.length; i++){
        if(cartItems[i] == itemId){
            cartItems.splice(i, 1)
            cart[userId] = cartItems;
            break;
        }
    }

    return res.status(200).json({message: "Item has been deleted successfully"});
})

app.listen(3000, () => {
    console.log("Stared app on port : 3000");
})