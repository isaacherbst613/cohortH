import Address from "./address";

export default interface Person{
    firstName: string;
    lastName: string;
    age: number;
    address?: Address;
}