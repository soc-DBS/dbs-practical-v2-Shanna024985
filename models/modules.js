const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.create = function create(code, name, credit) {
    return prisma.module.create({
        data: {
            creditUnit: parseInt(credit),
            modName: name,
            modCode: code
        }
    }).then(function (module) {
        //TODO: Return module
        return module
    }).catch(function (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                console.log("There is a unique constraint violation, a new user cannot be created with this email");
            }
        }
        throw error;
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
    return prisma.module.update({
        where: {
            modCode: code,
        }, data: {
            creditUnit: parseInt(credit)
        }
    }).then(function (module) {
        return module
    }).catch(function (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022") {
                console.log("Module is not found in this table");
            }
        }
    })
}