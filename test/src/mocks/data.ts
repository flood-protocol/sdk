import { Item, Order } from "~flood-sdk/types/order.js";

const nonce = 0n;
const deadline = 18446744073709551615n;
const offerer = "0x7c2788c63f035abd20802c5a88e3db827ec90f41"
const zone = "0xf100d014213240ebb1c905d22993b4007ce7f686";

const ARB = "0x912ce59144191c1204e64559fe8253a0e49e6548";
const WETH = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";

const item: Item = {
    token: ARB,
    amount: 1000000000000000000n 
  }
 
 const consideration: Item[] = [{
     token: WETH,
     amount: 0n
 }] 
 
    
 export const mockOrder: Order = {
     offerer,
     zone,
     offer: [{
            token: item.token,
            amount: item.amount
     }],
     consideration: consideration,
     deadline,
     nonce
 }
 