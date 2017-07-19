const BaseData = require('./base/base.data');
const User = require('../models/user');
const hashPass = require('../helpers/hashing');


class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    register(data) {
        return super.findOne({ username: data.username })
            .then((existingUser) => {
                if (existingUser) {
                    const err = [{ msg: 'Username already exists.' }];
                    throw err;
                }
                 return super.findOne({ email: data.email });
            })
            .then((existingUser) => {
                if (existingUser) {
                   const err = [{ msg: 'This email is already in use.' }];
                    throw err;
                }
                return hashPass.create(data.password);
            })
            .then((hash) => {
                const user = {
                    username: data.username,
                    password: hash,
                    email: data.email,
                };
                return super.create(user);
            });
    }

    checkPassword(username, password) {
        this.collection.find({
            username,
        })
            .then((user) => {
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }
                return true;
            });
    }
}

module.exports = UsersData;
