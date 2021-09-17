import {LOCAL_STORAGE_USER} from "./StringConstants";

export const camelToSpace = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const createCategoryTree = (categoryList) => {
    const catTree = []
    categoryList.filter(cat => cat.depth === 0)
        .forEach(cat0 => {

            cat0['children'] = []
            catTree.push(cat0)
            categoryList.filter(cat => cat.depth === 1 && cat.parentCategoryId === cat0.categoryId)
                .forEach(cat1 => {

                    cat1['children'] = []
                    cat0['children'].push(cat1)
                    categoryList.filter(cat => cat.depth === 2 && cat.parentCategoryId === cat1.categoryId)
                        .forEach(cat2 => {

                            cat2['children'] = []
                            cat1['children'].push(cat2)
                            categoryList.filter(cat => cat.depth === 3 && cat.parentCategoryId === cat2.categoryId)
                                .forEach(cat3 => {

                                    cat3['children'] = []
                                    cat2['children'].push(cat3)
                                })
                        })
                })
        })
    return catTree
}

export const getUser = () => {
    return localStorage.getItem(LOCAL_STORAGE_USER)
}