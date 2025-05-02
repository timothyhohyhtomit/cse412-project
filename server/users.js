class User {
    constructor(id, name, email, password, balance) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }
    // change balance
    changeBalance(amount) {
        // insufficient funds
        if (this.balance + amount < 0) {
            return false;
        }
        // change balance
        this.balance += amount;
        return true;
    }
}

// hardcoded user data
export const users = {
    1: new User(1, "User1", "user1@gmail.com", "user1", 1000),
    2: new User(2, "User2", "user2@gmail.com", "user2", 1000),
    3: new User(3, "User3", "user3@gmail.com", "user3", 1000)
};