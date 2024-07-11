import bcrypt from 'bcryptjs';

const Users = [
    {
        name: "admin",
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
]

export default Users;
