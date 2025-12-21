import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
    console.log('Usage: node hashGenerator.js <password>');
    process.exit(1);
}

const saltRounds = 10;
bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Password:', password);
    console.log('Hash:', hash);
});
