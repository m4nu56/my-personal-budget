export function findCategoryByLabel(label, lstCategories) {
    if (!label) {
        return null;
    }
    return lstCategories.find(
        c => c.values.filter(l => label.includes(l)).length > 0
    );
}
