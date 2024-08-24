import { beforeMain } from "@popperjs/core";

const { PrismaClient } = require("@prisma/client");

const customModel = new PrismaClient().$extends({
    name: 'Custom Model',
    model: {
        items: {
            async newItem({ uid, name, description, quantity, category_id, imgpath }) {
                const created = await customModel.items.create({
                    data: {
                        name,
                        description,
                        quantity,
                        category_id,
                        imgpath,
                    }
                })
                console.log(created);
                await customModel.audit.create({
                    data: {
                        type: 'item',
                        entity_id: created.id,
                        user_id: uid,
                        action: 'create',
                        after: created.quantity,
                        timestamp: created.created_at
                    }
                })
                return created
            },
            async upItem({ uid, id, name, description, category_id, quantity, imgpath, before }) {
                const changed = await customModel.items.update({
                    where: { id },
                    data: {
                        name, description, category_id, quantity, imgpath
                    }
                })
                console.log(before);
                if (before.name != name) {
                    console.log('name');
                    await customModel.audit.create({
                        data: {
                            type: 'item',
                            entity_id: id,
                            user_id: uid,
                            action: 'update',
                            before: before.name,
                            after: name,
                            timestamp: changed.updated_at
                        }
                    })
                }
                if (before.description != description) {
                    console.log('description');
                    await customModel.audit.create({
                        data: {
                            type: 'item',
                            entity_id: id,
                            user_id: uid,
                            action: 'update',
                            before: before.description,
                            after: description,
                            timestamp: changed.updated_at
                        }
                    })
                }
                if (parseInt(before.quantity) != quantity) {
                    console.log('quantity');
                    await customModel.audit.create({
                        data: {
                            type: 'item',
                            entity_id: id,
                            user_id: uid,
                            action: 'update',
                            before: before.quantity,
                            after: quantity,
                            timestamp: changed.updated_at
                        }
                    })
                }
                if (parseInt(before.category_id) != category_id) {
                    console.log('category');
                    await customModel.audit.create({
                        data: {
                            type: 'item',
                            entity_id: id,
                            user_id: uid,
                            action: 'update',
                            before: before.category_id,
                            after: category_id,
                            timestamp: changed.updated_at
                        }
                    })
                }
                if (before.imgpath != imgpath) {
                    console.log('img');
                    await customModel.audit.create({
                        data: {
                            type: 'item',
                            entity_id: id,
                            user_id: uid,
                            action: 'update',
                            before: before.imgpath,
                            after: imgpath,
                            timestamp: changed.updated_at
                        }
                    })
                }
                return changed
            },
            async addQty({ uid, id, amount, before }) {
                const changed = await customModel.items.update({
                    where: { id },
                    data: {
                        quantity: before + amount,
                    }
                })
                await customModel.audit.create({
                    data: {
                        type: 'item',
                        entity_id: id,
                        user_id: uid,
                        action: 'update',
                        before: before,
                        after: changed.quantity,
                        timestamp: changed.updated_at
                    }
                })
                return changed
            },
            async subQty({ uid, id, amount, before }) {
                const changed = await customModel.items.update({
                    where: { id },
                    data: {
                        quantity: before - amount
                    }
                })
                await customModel.audit.create({
                    data: {
                        type: 'item',
                        entity_id: id,
                        user_id: uid,
                        action: 'update',
                        before: before,
                        after: changed.quantity,
                        timestamp: changed.updated_at
                    }
                })
                return changed
            },
            async setQty({ uid, id, amount, before }) {
                const changed = await customModel.items.update({
                    where: { id },
                    data: {
                        quantity: amount,
                    }
                })
                await customModel.audit.create({
                    data: {
                        type: 'item',
                        entity_id: id,
                        user_id: uid,
                        action: 'update',
                        before: before,
                        after: changed.quantity,
                        timestamp: changed.updated_at
                    }
                })
                return changed
            },
            async remove({ uid, id, before }) {
                const changed = await customModel.items.delete({
                    where: { id }
                })
                await customModel.audit.create({
                    data: {
                        type: 'item',
                        entity_id: id,
                        user_id: uid,
                        action: 'delete',
                        before: before,
                        timestamp: changed.updated_at
                    }
                })
                return changed
            }
        },
        categories: {
            async newCat({ uid, name, description }) {
                const created = await customModel.categories.create({
                    data: {
                        name,
                        description
                    }
                })
                await customModel.audit.create({
                    data: {
                        type: 'category',
                        entity_id: created.id,
                        user_id: uid,
                        action: 'create',
                        before: `name: ${name} -- description: ${description}`,
                        timestamp: created.created_at
                    }
                })
                return created
            },
            async upCat({ uid, id, name, description, before }) {
                const updated = await customModel.categories.update({
                    where: { id },
                    data: {
                        name,
                        description
                    }
                })
                await customModel.audit.create({
                    data: {
                        type: 'category',
                        entity_id: id,
                        user_id: uid,
                        action: 'update',
                        before: `name: ${before.name} -- description: ${before.description}`,
                        after: `name: ${updated.name} -- description: ${updated.description}`,
                        timestamp: updated.created_at
                    }
                })
                return updated
            },
            async remove({ uid, id }) {
                const updated = await customModel.categories.update({
                    where: { id }
                })
                await customModel.audit.create({
                    data: {
                        type: 'category',
                        entity_id: id,
                        user_id: uid,
                        action: 'delete',
                        before: `name: ${updated.name} -- description: ${updated.description}`,
                        timestamp: updated.created_at
                    }
                })
                return updated
            },
        }
    }
})

export { customModel }