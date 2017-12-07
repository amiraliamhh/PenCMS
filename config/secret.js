module.exports = {
    database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/pencms',
    secret  : process.env.SECRET || 'AFOIAHF39F93H483FH32IHA0AF8H2F',
    port    : process.env.PORT || '4567'
}