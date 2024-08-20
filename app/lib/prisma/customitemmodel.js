const { PrismaClient } = require("@prisma/client");

const customModel = new PrismaClient().$extends({
    name: 'Custom Model',
    model: {
        items: {
            async newItem({uid, name, description, quantity, category_id, imgpath}) {
                return customModel.items.create({
                    data: {
                        name,
                        description,
                        quantity,
                        category_id,
                        imgpath,
                        audit: {
                            create: {
                                action: 'create',
                                quantity_before: 0,
                                quantity_after: quantity,
                                user_id: uid
                            }
                        }
                    }
                })
            },
            async addQty({uid, id, amount, before}) {
                return customModel.items.update({
                    where: { id },
                    data: {
                        quantity: before + amount,
                        audit: {
                            create: {
                                action: 'add',
                                quantity_before: before,
                                quantity_after: before + amount,
                                user_id: uid
                            }
                        }
                    }
                })
            },
            async subQty({uid, id, amount, before}) {
                return customModel.items.update({
                    where: { id },
                    data: {
                        quantity: before - amount,
                        audit: {
                            create: {
                                action: 'substract',
                                quantity_before: before,
                                quantity_after: before - amount,
                                user_id: uid
                            }
                        }
                    }
                })
            },
            async setQty({uid, id, amount, before}) {
                return customModel.items.update({
                    where: { id },
                    data: {
                        quantity: amount,
                        audit: {
                            create: {
                                action: 'setQuantity',
                                quantity_before: before,
                                quantity_after: amount,
                                user_id: uid
                            }
                        }
                    }
                })
            }
        }
    }
})

export {customModel}